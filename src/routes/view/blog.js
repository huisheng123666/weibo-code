/**
 * @description 微博 view 路由
 * @author xmw
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/login-checks')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    blogData: {
      blogList: []
    }
  })
})

module.exports = router