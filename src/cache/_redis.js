/**
 * @description 连接redis的方法 get set
 * @author xmw
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
  console.error(err)
})

redisClient.on('connect', () => {
  console.log('redis connect suss!')
})

/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeOut 秒
 */
function set(key, val, timeOut = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }

  redisClient.set(key, val)
  redisClient.expire(key, timeOut)
}

/**
 * redis get
 * @param {string} key
 * @return Promise
 */
function get(key) {
  return  new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) {
        resolve(null)
      }

      try {
        resolve(JSON.parse(val))
      } catch (e) {
        resolve(val)
      }
    })
  })
}

function del(key) {
  redisClient.del(key)
}

module.exports = {
  set,
  get,
  del
}