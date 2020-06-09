/**
 * @description user api test
 * @author xmw
 */

const server = require('../server')

const username = `u_${Date.now()}`
const password = `p_${Date.now()}`

const testUser = {
  userName: username,
  password,
  nickName: username,
  gender: 1
}

let COOKIE = ''

test('注册一个用户，应该成功', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).toBe(0)
})

test('查询注册的用户名，应该存在', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({userName: testUser.userName})
  expect(res.body.errno).toBe(0)
})

test('重复注册，应该失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).not.toBe(0)
})

test('json schema 检测，非法的格式，注册应该失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send({
      userName: '123', // 用户名不是字母开头
      password: 'a',
      gender: 'mail'
    })
  expect(res.body.errno).not.toBe(0)
})

test('登陆，应该成功', async () => {
  const res = await server
    .post('/api/user/login')
    .send({
      userName: testUser.userName, // 用户名不是字母开头
      password: testUser.password
    })
  expect(res.body.errno).toBe(0)
  COOKIE = res.headers['set-cookie'].join(';')
})

test('修改基本信息应该成功', async () => {
  const res = await server
    .patch('/api/user/changeInfo')
    .set('cookie', COOKIE)
    .send({
      nickName: '测试昵称',
      city: '测试城市',
      picture: '/test.png'
    })
  expect(res.body.errno).toBe(0)
})

test('修改密码应该成功', async () => {
  const res = await server
    .patch('/api/user/changePassword')
    .set('cookie', COOKIE)
    .send({
      password,
      newPassword: `P_${Date.now()}`
    })
  expect(res.body.errno).toBe(0)
})


test('删除用户，应该成功', async () => {
  const res = await server
    .post('/api/user/delete')
    .set('cookie', COOKIE)
    .send({
      username: testUser.userName // 用户名不是字母开头
    })
  expect(res.body.errno).toBe(0)
})

test('退出登录应该成功', async () => {
  const res = await server
    .post('/api/user/logout')
    .set('cookie', COOKIE)
    .send()
  expect(res.body.errno).toBe(0)
})

test('删除之后，查询注册的用户名，应该不存在', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({userName: testUser.userName})
  expect(res.body.errno).not.toBe(0)
})
