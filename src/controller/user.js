/**
 * @description user controller
 * @author xmw
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModal, ErrorModel } = require('../model/resModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  changeInfoFailInfo,
  deleteUserFailInfo,
  changePasswordFailInfo
} = require('../model/errorInfo')
const { set, get, del } = require('../cache/_redis')
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
  const userInfo = await getUserInfo(userName, '')
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  }
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

/**
 * 登陆
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
  const sid = await get(username)
  if (sid) del(sid)
  if (!ctx.session.userInfo) {
    ctx.session.userInfo = userInfo
    set(username, `weibo:sess:${ctx.sessionId}`)
  }
  return new SuccessModal()
}

/**
 * 删除用户
 * @param {string} username
 */
async function deleteCurrentUser(username) {
  const result = await deleteUser(username)
  if (result) {
    return new SuccessModal()
  }
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改用户信息
 * @param {Object}ctx
 * @param {string}nickName
 * @param {string}city
 * @param {string}picture
 * @return {Promise<Object>}
 */
async function changeInfo(ctx, {nickName, city, picture}) {
  const { username } = ctx.session.userInfo
  if (!nickName) {
    nickName = username
  }
  const result = await updateUser({newNickName: nickName, newPicture: picture, newCity: city}, {userName: username})
  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModal()
  }
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密码
 * @param userName
 * @param password
 * @param newPassword
 * @return {Promise<Object>}
 */
async function changePassword({ userName, password, newPassword }) {
  if (!password) {
    return new ErrorModel(changePasswordFailInfo)
  }
  const result = await updateUser({ newPassword: crypto(newPassword) }, { userName, password: crypto(password) })
  if (result) {
    return new SuccessModal()
  }
  return new ErrorModel(changePasswordFailInfo)
}

function logout(ctx) {
  ctx.session = null
  return new SuccessModal()
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurrentUser,
  changeInfo,
  changePassword,
  logout
}