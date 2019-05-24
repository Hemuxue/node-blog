const tagsDao = require('../dao/TagsDao');
const mappingDao = require('../dao/TypeTagBlogMappingDao')
const blogDao = require('../dao/BlogDao');
const url = require('url');
const { getNow } = require('../util/TimeUtil')
const { writeResult } = require('../util/RespUtil')
const { utf8 } = require('../util/requestHeaderConfig')

const path = new Map();

const createTags = (request, response) => {
  request.on('data', (data) => {
    data = JSON.parse(data.toString())
    const params = [data.tag, getNow(), getNow()];
    tagsDao.insertTags(params, (result) => {
      response.writeHead(200,utf8);
			response.write(writeResult(200,'success', "操作成功", {}));
			response.end();
    })
  })
}

const deleteTag =  (request, response) => {
  request.on('data', (data) => {
    data = JSON.parse(data.toString())
    tagsDao.deleteTagById(+data.id,(res) => {
      if(res) {
        response.writeHead(200,utf8);
        response.write(writeResult(200,'success', "删除成功", {}));
        response.end();
      }
    })
  })
 
}

const getTags = (request, response) => {
  request.on('data',(data) => {
    data = JSON.parse(data.toString())
    const page = parseInt(data.page),
          pageSize = parseInt(data.pageSize)
    const params = [ (page - 1) * pageSize, pageSize]
    tagsDao.queryTagByPages(params, (result) => {
      let code ,status, message, data = {}, arr = [];
      if( result) {
        mappingDao.queryTagGroupByTagId((mapRes) => {
          if(mapRes) {
            arr = result;
            arr.forEach(ele => {
              ele.number = 0;
              mapRes.forEach(e=> {
                if(ele.id === e.tag_id) {
                  ele.number += +e.total
                }
              })
            })
            data.data = arr
            tagsDao.queryTagCount( (res) => {
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
        
      }
    })
  })
}

const getAllTags = (request, response) => {
  tagsDao.queryAllTag((result) => {
    if(result) {
      response.writeHead(200, utf8);
      response.write(writeResult(200,'success', '获取成功', result));
      response.end();
    }
  })
}

const getTagCount = (request, response) => {
  tagsDao.queryTagCount( (res) => {
    const data = {}
    data.total = res[0].total
    response.writeHead(200, utf8);
    response.write(writeResult(200,'success', '操作成功', data));
    response.end();
  })
}

const getTagStatistics = (request, response) => {
  mappingDao.queryTagGroupByTagId( (mapRes) => {
    if(mapRes) {
      tagsDao.queryAllTag((tagRes) =>{ 
        if(tagRes) {
          blogDao.queryAllBlog( (blogRes) => {
            if(blogRes) {
              mapRes.forEach((ele, index) => {
                ele.count = 0;
                tagRes.forEach((e, i) => {
                  if(ele.tag_id === e.id) {
                    ele.name = e.tag
                  }
                })
                blogRes.forEach( (e, i) => {
                  if(ele.name === e.tags){
                    ele.count += +e.views 
                  }
                })
              })
          
              response.writeHead(200, utf8);
              response.write(writeResult(200,'success', '操作成功', mapRes));
              response.end();
            }
          })
          
        }
      })
    }
    
  })
}


path.set('/createTag', createTags)
path.set('/deleteTag', deleteTag)
path.set('/getTags', getTags)
path.set('/getAllTags',getAllTags)
path.set('/getTagCount',getTagCount)
path.set('/getTagStatistics',getTagStatistics)
module.exports.path = path
