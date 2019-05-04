const typeDao = require('../dao/TypeDao');
const url = require('url');
const { getNow } = require('../util/TimeUtil')
const { writeResult } = require('../util/RespUtil')
const { utf8 } = require('../util/requestHeaderConfig')

const path = new Map();

const createType = (request, response) => {
  request.on('data', (data) => {
    data = JSON.parse(data.toString())
    const params = [data.type, getNow(), getNow()];
    typeDao.insertType(params, (result) => {
      response.writeHead(200,utf8);
			response.write(writeResult(200,'success', "操作成功", {}));
			response.end();
    })
  })
}

const deleteType =  (request, response) => {
  request.on('data', (data) => {
    data = JSON.parse(data.toString())
    typeDao.deleteTypeById(+data.id,(res) => {
      if(res) {
        response.writeHead(200,utf8);
        response.write(writeResult(200,'success', "删除成功", {}));
        response.end();
      }
    })
  })
 
}

const getType = (request, response) => {
  request.on('data',(data) => {
    data = JSON.parse(data.toString())
    const page = parseInt(data.page),
          pageSize = parseInt(data.pageSize)
    const params = [ (page - 1) * pageSize, pageSize]
    typeDao.queryTypeByPages(params, (result) => {
      let code ,status, message, data = {}, arr = [];
      if( result) {
        arr = result;
        data.data = arr
        typeDao.queryTypeCount( (res) => {
          data.total = res[0].total
          data.pageSize = pageSize
          data.page = page
          code = 200
          status = 'success'
          message = '操作成功'
          response.writeHead(200, utf8);
          response.write(writeResult(code,status, message, data));
          response.end();
        })
      }
    })
  })
}

const getAllType = (request, response) => {
  typeDao.queryAllType((result) => {
    if(result) {
      response.writeHead(200, utf8);
      response.write(writeResult(200,'success', '获取成功', result));
      response.end();
    }
  })
}

const getTypeCount = (request, response) => {
  typeDao.queryTypeCount( (res) => {
    const data = {}
    data.total = res[0].total
    response.writeHead(200, utf8);
    response.write(writeResult(200,'success', '操作成功', data));
    response.end();
  })
}

path.set('/createType', createType)
path.set('/deleteType', deleteType)
path.set('/getType', getType)
path.set('/getAllType', getAllType)
path.set('/getTypeCount',getTypeCount)
module.exports.path = path
