
const writeResult = (code, status, msg ,data) => {
  return JSON.stringify({
    code: code,
    status: status,
    msg: msg,
    data: data
  })
}

module.exports.writeResult = writeResult