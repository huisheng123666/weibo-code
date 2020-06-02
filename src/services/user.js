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

/**
 * 创建用户
 * @param {string} userName
 * @param {string} password
 * @param {number} gender
 * @param {string} nickName
 * @return {Promise<Object>}
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    username: userName,
    password,
    nickName: nickName || userName,
    gender
  })
  return result.dataValues
}

async function deleteUser(username) {
  const result = await User.destroy({
    where: {
      username
    }
  })
  // result 删除的行数
  return result > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser
}