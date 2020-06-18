/**
 * @description 微博数据模型
 * @author xmw
 */

const seq = require('../seq')
const { STRING, TEXT, INTEGER } = require('../types')

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})

module.exports = Blog