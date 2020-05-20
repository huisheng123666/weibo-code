/**
 * @description sequelize实例
 * @author xmw
*/

const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

// 线上环境，使用连接池
// conf.pool = {
//   max: 5,
//   min: 0,
//   idle: 10000 // 如果一个链接池10s之内没有被使用，则释放
// }


const seq = new Sequelize('koa_weibo_db', 'root', '817102', conf)

module.exports = seq