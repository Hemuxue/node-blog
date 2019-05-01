const dbutil = require("./DBUtil.js")

const insertTagBlogMapping = (params, success) => {
  const insertSql = "insert into type_tags_blog_mapping (`type_id`,`tag_id`, `blog_id`, `ctime`, `utime`) values (?, ?, ?, ?,?)";

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

module.exports.insertTagBlogMapping = insertTagBlogMapping