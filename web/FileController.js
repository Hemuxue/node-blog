const fileListDao = require('../dao/FileListDao');
const { writeResult } = require('../util/RespUtil')
const { utf8 } = require('../util/requestHeaderConfig')
const url = require('url')
const fs = require('fs');
const path = new Map();



const upload = (request, response) => {
  const file_name = request.files[0].originalname;
  const file_size = request.files[0].size;
  const file_path = request.files[0].path
  fileListDao.insertFileList(file_name, file_size, file_path, request.cookies.id , (result) => {
    const data = {
      path: file_path,
      name: file_name
    }
    response.writeHead(200,utf8);
    response.write(writeResult(200,'success', "操作成功", data));
    response.end();
  })
} 
const getPic = (request, response) => { 
  const params = url.parse(request.url, true).query;
  try {
    const data = fs.readFileSync('./' + params.path);
    response.writeHead(200);
    response.write(data);
    response.end();
  } catch (e ) {
    response.writeHead(404);
    response.end();
  }
  
  
}
path.set('/upload', upload)
path.set('/getPic', getPic)

module.exports.path = path;