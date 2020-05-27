/**
 * @description user controller
 * @author xmw
 */

const { getUserInfo } = require('../services/user')
const { SuccessModal, ErrorModel } = require('../model/resModel')
const { registerUsernameNotExistInfo } = require('../model/errorInfo')

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
    return new ErrorModel(registerUsernameNotExistInfo)
  }
}

module.exports = {
  isExist
}