/**
 * @description 存储配置
 * @author xmw
 */

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '817102',
  port: 3306,
  database: 'koa_weibo_db',
  dialect: 'mysql'
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}