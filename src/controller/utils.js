/**
 * @description utils controller
 * @author xmw
 */
const { ErrorModel, SuccessModal } = require('../model/resModel')
const { uploadFileSizeFailInfo } = require('../model/errorInfo')
const fse = require('fs-extra')
const path = require('path')

const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 文件最大体积 1M
const MIX_SIZE = 1024 * 1024 * 1024

/**
 * 保存文件
 * @param {string}name
 * @param {string}type
 * @param {number}size
 * @param {string}filePath
 * @return {Promise<Object>}
 */
async function saveFile({ name, type, size, filePath }) {
  if (size > MIX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  const fileName = Date.now() + '.' + name
  const distFIlePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFIlePath)
  return new SuccessModal({
    url: `/${fileName}`
  })
}

module.exports = {
  saveFile
}