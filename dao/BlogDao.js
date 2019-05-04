const dbutil = require("./DBUtil.js")

function insertBlog(params, success) {
	const insertSql = "insert into blog (`title`, `content`, `tags`, `type`, `views`, `ctime`, `utime`) values (?, ?, ?, ? ,?, ?, ?)";
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

const queryBlogByPages = (params, success) => {
	const querySql = "select *  from blog order by id desc limit ?,?";
	const connection = dbutil.createConnection();
	connection.connect();
	connection.query(querySql, params, (error, result) => {
		if (error === null) {
			success(result);
		} else {
			console.log(error);
		}
	})
	connection.end();
}

const queryBlogCount = ( success) => {
	const querySql = "select count(1) as total  from blog";
	const connection = dbutil.createConnection();
	connection.connect();
	connection.query(querySql , (error, result) => {
		if (error === null) {
			success(result);
		} else {
			console.log(error);
		}
	})
	connection.end();
}

const deleteBlogById = (id, success) => {
  const deleteSql = "delete from blog where id = ?";
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(deleteSql, id, (error, result) => {
    if (error === null) {
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}
const queryBlogById =  (id, success) => {
	const querySql = "select *  from blog where id = ?";
	const connection = dbutil.createConnection();
	connection.connect();
	connection.query(querySql, id , (error, result) => {
		if (error === null) {
			success(result);
		} else {
			console.log(error);
		}
	})
	connection.end();
}

module.exports.insertBlog = insertBlog
module.exports.queryBlogByPages = queryBlogByPages
module.exports.queryBlogCount = queryBlogCount
module.exports.deleteBlogById = deleteBlogById
module.exports.queryBlogById = queryBlogById