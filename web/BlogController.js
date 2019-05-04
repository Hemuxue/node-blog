const blogDao = require('../dao/BlogDao');
const TypeTagBlogMappingDao = require('../dao/TypeTagBlogMappingDao')
const { writeResult } = require('../util/RespUtil')
const { utf8 } = require('../util/requestHeaderConfig')
const { getNow } = require('../util/TimeUtil')
const url = require('url')
const path = new Map();

const createBlog = (request, response) => {
  
  request.on("data", function (data) {
    data = JSON.parse(data.toString())
    const params = [data.title, data.content, data.tag, data.type, 0, getNow(), getNow()]
      blogDao.insertBlog(params, function (result) {
        response.writeHead(200,utf8);
        response.write(writeResult(200,"success", "添加成功", null));
        response.end();
        const MappingParams = [data.type_id, data.tag_id, result.insertId, getNow(), getNow()];
        TypeTagBlogMappingDao.insertTagBlogMapping(MappingParams, () => {
          
        })
      });
  });
}

const getBlogList = (request, response) => { 
  
  const params = url.parse(request.url, true).query
  const tempArr = [ (+params.page - 1) * params.pageSize, +params.pageSize]
  blogDao.queryBlogByPages(tempArr, (result) => {
    if(result) {
      blogDao.queryBlogCount((res) =>{
        if(res) {
          const total = res[0].total
          const data = {
            data:result,
            total: total,
            page:+params.page,
            pageSize:+params.pageSize
          }
          response.writeHead(200,utf8);
          response.write(writeResult(200,"success", "添加成功", data));
          response.end();
        }
      })
    }
  })
}
const getBlogCount = (request, response) => {
  blogDao.queryBlogCount( (result) => {
    if(result){
      const data = {};
      data.total = result[0].total
      response.writeHead(200,utf8);
      response.write(writeResult(200,"success", "添加成功", data));
      response.end();
    }
    
  })
}
const deleteBlog =  (request, response) => {
  const params = url.parse(request.url , true).query
  blogDao.deleteBlogById(+params.id,(res) => {
    if(res) {
      response.writeHead(200,utf8);
      response.write(writeResult(200,'success', "删除成功", {}));
      response.end();
    }
  })
}
const getBlogDetail = (request, response) => {
  const params = url.parse(request.url , true).query
  blogDao.queryBlogById(params.id, (result) => {
    if(result) {
      const data = result[0]
      response.writeHead(200,utf8);
      response.write(writeResult(200,'success', "操作成功", data));
      response.end();
    }
  })
}
path.set('/createBlog', createBlog)
path.set('/getBlogList', getBlogList)
path.set('/getBlogCount', getBlogCount)
path.set('/deleteBlog', deleteBlog)
path.set('/getBlogDetail', getBlogDetail)
module.exports.path = path