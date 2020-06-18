/**
 * @description 首页controller
 * @author xmw
 */
const { createBlog } = require('../services/blog')
const { SuccessModal, ErrorModel } = require('../model/resModel')
const { createBlogFailInfo } = require('../model/errorInfo')
const xss = require('xss')

async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })
    return new SuccessModal(blog)
  } catch (e) {
    console.error(e.message, e.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}