/**
 * @description 用户数据模型
 * @author xmw
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

const User = seq.define('user', {
  username: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false
  },
  nickName: {
    type: STRING,
    allowNull: false
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别（1 男，2 ，3 保密）'
  },
  picture: {
    type: STRING,
    comment: '头像'
  },
  city: {
    type: STRING
  }
})

module.exports = User