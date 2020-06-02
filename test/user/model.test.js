/**
 * @description user model test
 * @author xmw
 */

const { User } = require('../../src/db/model')

test('User 模型的各个属性，符合预期', () => {
  // build会构建一个内存的User实例，但不会提交到数据库中
  const user = User.build({
    username: 'zhangsan',
    password: '123',
    nickName: 'xmm',
    picture: '/sss.png',
    city: '北京'
  })
  expect(user.username).toBe('zhangsan')
  expect(user.password).toBe('123')
  expect(user.nickName).toBe('xmm')
  expect(user.gender).toBe(3)
  expect(user.picture).toBe('/sss.png')
  expect(user.city).toBe('北京')
})