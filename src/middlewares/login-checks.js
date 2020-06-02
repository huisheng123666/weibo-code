const { ErrorModel } = require('../model/resModel')
const { loginCheckFailInfo } = require('../model/errorInfo')

/**
 * 登陆验证
 * @param {Object}ctx
 * @param {function}next
 * @return {Promise<void>}
 */
async function loginCheck(ctx, next) {
  if (ctx.session.userInfo) {
    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登陆验证
 * @param {Object}ctx
 * @param {function}next
 * @return {Promise<void>}
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect
}