
const commentDao = require('../dao/CommentDao');
const TypeTagBlogMappingDao = require('../dao/TypeTagBlogMappingDao')
const { writeResult } = require('../util/RespUtil')
const { utf8 } = require('../util/requestHeaderConfig')
const { getNow } = require('../util/TimeUtil')
const url = require('url')
const path = new Map();

const addComment = (request, response) => {
  const params = url.parse(request.url, true).query;
  
  function format(obj){
    for(const prop in obj) {
      obj[prop] = obj[prop].trim()
    }
  }
  format(params)
  console.log(params);
  const insertArr = [+params.bid, +params.parent, +params.replyId , params.replyName, params.userName, params.email, params.comments, getNow(), getNow()];
  commentDao.insertComment(insertArr, (result) => {
    response.writeHead(200,utf8);
    response.write(writeResult(200,'success','评论成功', {id:result.insertId}))
    response.end();
  })
}

const queryCommentsByBlogId = (request, response) => {
  var params = url.parse(request.url, true).query;
  commentDao.queryCommentsByBlogId(parseInt(params.bid), function(result) {
    response.writeHead(200,utf8);
    response.write(writeResult(200, "success", "查询成功", result));
    response.end();
  });
}

const queryCommentsCountByBlogId = (request, response) => {
  var params = url.parse(request.url, true).query;
  commentDao.queryCommentCountByBlogId(parseInt(params.bid), function (result) {
    response.writeHead(200,utf8);
    response.write(writeResult(200, "success", "查询成功", {count: result[0].count} ));
    response.end();
  });
}

const queryNewComments = (request, response) => {
  commentDao.queryNewComments(5, function (result) {
    response.writeHead(200);
    response.write(writeResult(200, "success", "评论成功", result));
    response.end();
  });
}

path.set("/addComment", addComment);
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);
path.set("/queryNewComments", queryNewComments);

module.exports.path = path;




