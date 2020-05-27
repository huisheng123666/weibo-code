/**
 * @description 加密方法
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * md5 加密
 * @param {string} content 明文
 */
function md5(content) {
  const md5 = crypto.createHash('md5')
  // 16进制
  return md5.update(content).digest('hex')
}

/**
 *
 * @param {string} content 明文
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return md5(str)
}

module.exports = doCrypto