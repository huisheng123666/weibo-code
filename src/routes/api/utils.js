/**
 * @description utils api路由
 * @author xmw
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/login-checks')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file']
  if (!file) return
  const { size, path, name, type} = file
  ctx.body = await saveFile({name, size, type, filePath: path})
})

module.exports = router