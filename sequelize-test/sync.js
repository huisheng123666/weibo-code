const seq = require('./seq')

require('./model')

seq.authenticate().then(() => {
  console.log('db ok')
}).catch(() => {
  console.log('db err')
})

seq.sync({ force: true }).then(() => {
  console.log('db sync ok')
  process.exit()
})