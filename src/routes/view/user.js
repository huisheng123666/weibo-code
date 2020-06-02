/**
 * @description user view 路由
 * @author xmw
 */

const router = require('koa-router')()

/**
 * 获取登陆信息
 * @param {Object}ctx
 * @return {Object}
 */
function getLoginInfo(ctx) {
  const data = {
    isLogin: false
  }

  const userInfo = ctx.session.userInfo

  if (userInfo) {
    data.isLogin = true
    data.userName = userInfo.username
  }

  return data
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', {})
})

module.exports = router