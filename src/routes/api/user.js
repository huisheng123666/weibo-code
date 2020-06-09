/**
 * @description user api 路由
 * @author xmw
 */

const router = require('koa-router')()
const { isExist, register, login, deleteCurrentUser, changeInfo, changePassword, logout } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/login-checks')
const { isTest } = require('../../utils/env')

router.prefix('/api/user')

router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({ userName, password, gender })
})

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await isExist(userName)
  ctx.body = await login(ctx, userName, password)
})

router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    const { username } = ctx.session.userInfo
    ctx.body = await deleteCurrentUser(username)
  }
})

router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { username } = ctx.session.userInfo
  ctx.body = await changePassword({userName: username, password, newPassword})
})

router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = logout(ctx)
})

module.exports = router