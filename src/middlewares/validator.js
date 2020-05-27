const { ErrorModel } = require('../model/resModel')
const { jsonSchemaFileInfo } = require('../model/errorInfo')

/**
 * 生成 json schema验证中间键
 * @param {function} userValidate
 */
function genValidator (validateFn) {
  return async function validator(ctx, next) {
    const data = ctx.request.body
    const err = validateFn(data)
    if (err) {
      return ctx.body = new ErrorModel(jsonSchemaFileInfo)
    }
    await next()
  }
}

module.exports = {
  genValidator
}