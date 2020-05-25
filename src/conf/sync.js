/**
 * @description sequelize 同步数据库
 * @author xmw
 */

const seq = require('./seq')

// 测试连接
seq.authenticate().then(() => {
  console.log('db ok')
}).catch(() => {
  console.log('db err')
})

// 执行同步,(同步数据库模型数据)
seq.sync({ force: true }).then(() => {
  console.log('db sync ok')
  process.exit()
})