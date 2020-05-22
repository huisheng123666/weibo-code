/**
 * @description sequelize实例
 * @author xmw
*/

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF

const conf = {
  host,
  dialect: 'mysql'
}

// test不要打印日志
if (isTest) {
  conf.logging = () => {}
}

// 线上环境，使用连接池
if (isProd) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000 // 如果一个链接池10s之内没有被使用，则释放
  }
}


const seq = new Sequelize(database, user, password, conf)

module.exports = seq