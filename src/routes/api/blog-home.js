/**
 * @description 首页api
 * @author xmw
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/login-checks')
const { create } = require('../../controller/blog-home')

router.prefix('/api/blog')

router.post('/create', loginCheck, async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({userId, content, image})
})

module.exports = router