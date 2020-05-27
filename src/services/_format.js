/**
 * @description 数据格式化
 */

/**
 *
 * @param {Object} obj
 * @return {Object}
 * @private
 */

const { DEFAULT_PICTURE } = require('../conf/constant')

function _formatUserPicture(obj) {
  if (!obj.picture) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用户信息
 * @param {Array<Object> | Object} list 用户列表或者单个用户对象
 */
function formatUser (list) {
  if (!list) return list

  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }

  return _formatUserPicture(list)
}

module.exports = {
  formatUser
}