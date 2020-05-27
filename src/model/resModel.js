/**
 * @description res 的数据模型
 */

class BaseModel {
  constructor({ errno, data, message }) {
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
    this.errno = errno
  }
}

class SuccessModal extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data
    })
  }
}

class ErrorModel extends BaseModel {
  constructor({ errno, message }) {
    super({
      errno,
      message
    })
  }
}

module.exports = {
  SuccessModal,
  ErrorModel
}