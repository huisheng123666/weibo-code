/**
 * @description user controller
 * @author xmw
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModal, ErrorModel } = require('../model/resModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
} = require('../model/errorInfo')
const crypto = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param {string} userName
 * @return {Promise<Object>}
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName, null)
  if (userInfo) {
    return new SuccessModal(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * @description 注册
 * @param {string} userName
 * @param {string} password
 * @param {number} gender (1.男，2.女，3.保密)
 * @return {Promise<Object>}
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName, password)
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  } else {
    try {
      await createUser({
        userName,
        password: crypto(password),
        gender
      })
      return new SuccessModal()
    } catch (err) {
      console.error(err.message, err.stack)
      return new ErrorModel(registerFailInfo)
    }
  }
}

/**
 *
 * @param {Object}ctx
 * @param {string}username
 * @param {string}password
 * @return {Promise<Object>}
 */
async function login(ctx, username, password) {
  const userInfo = await getUserInfo(username, crypto(password))
  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }
  if (!ctx.session.userInfo) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModal()
}

module.exports = {
  isExist,
  register,
  login
}