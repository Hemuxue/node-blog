const dbutil = require("./DBUtil.js")

const insertComment = (params,success) => {
  const insertSql = "insert into comments (`blog_id`, `parent`,`reply_id`, `reply_name`, `user_name`, `email`, `comments`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(insertSql, params, function (error, result) {
      if (error == null) {
          success(result);
      } else {
          console.log(error);
      }
  });
  connection.end();
}

const queryCommentsByBlogId = (blogId, success) => {
  const querySql = "select * from comments where blog_id = ?;";
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, blogId, function (error, result) {
      if (error == null) {
          success(result);
      } else {
          console.log(error);
      }
  });
  connection.end();
}

const queryCommentCountByBlogId = (blogId, success) => {
  const querySql = "select count(1) as count from comments where blog_id = ?;";
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, blogId, function (error, result) {
      if (error == null) {
          success(result);
      } else {
          console.log(error);
      }
  });
  connection.end();
}

const queryNewComments = (size, success) => {
  const querySql = "select * from comments order by id desc limit ?;";
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, size, function (error, result) {
      if (error == null) {
          success(result);
      } else {
          console.log(error);
      }
  });
  connection.end();
}

module.exports.insertComment = insertComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryCommentCountByBlogId = queryCommentCountByBlogId;
module.exports.queryNewComments = queryNewComments;

