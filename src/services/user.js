/**
 * @description user service
 */

const { User } = require('../db/model')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName
 * @param {string} password
 * @return {Promise<void>}
 */
async function getUserInfo(userName, password) {
  const whereOpt = {
    username: userName
  }

  if (password) {
    Object.assign(whereOpt, { password })
  }

  const result = await User.findOne({
    attributes: ['id', 'username', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if (result === null) {
    return result
  }

  const formatRes = formatUser(result.dataValues)

  return formatRes
}

module.exports = {
  getUserInfo
}