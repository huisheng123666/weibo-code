/**
 * @description error 404 路由
 * @author xmw
 */

const router = require('koa-router')()

router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router