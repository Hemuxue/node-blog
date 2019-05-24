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

const queryAllBlog = (success) => {
	const querySql = "select * from blog;";
	const connection = dbutil.createConnection();
	connection.connect();
	connection.query(querySql,(error, result) => {
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

const queryBlogByType =  (type, success) => {
	const querySql = "select id, ctime, title  from blog where type = ?";
	const connection = dbutil.createConnection();
	connection.connect();
	connection.query(querySql, type , (error, result) => {
		if (error === null) {
			success(result);
		} else {
			console.log(error);
		}
	})
	connection.end();
}

const queryBlogByTag =  (tag, success) => {
	const querySql = "select id, ctime, title  from blog where tags = ?";
	const connection = dbutil.createConnection();
	connection.connect();
	connection.query(querySql, tag , (error, result) => {
		if (error === null) {
			success(result);
		} else {
			console.log(error);
		}
	})
	connection.end();
}

function queryViewCtime(success) {
	const querySql = "select views,ctime from blog;";
	const connection = dbutil.createConnection();
	connection.connect();
	connection.query(querySql, function (error, result) {
			if (error == null) {
					success(result);
			} else {
					console.log(error);
			}
	});
	connection.end();
}

function addViews(id, success) {
	var querySql = "update blog set views = views + 1 where id = ?;";
	var params = [id];

	var connection = dbutil.createConnection();
	connection.connect();
	connection.query(querySql, params, function (error, result) {
			if (error == null) {
					success(result);
			} else {
					console.log(error);
			}
	});
	connection.end();
}

module.exports.insertBlog = insertBlog
module.exports.queryBlogByPages = queryBlogByPages
module.exports.queryBlogCount = queryBlogCount
module.exports.deleteBlogById = deleteBlogById
module.exports.queryBlogById = queryBlogById
module.exports.queryBlogByType = queryBlogByType
module.exports.queryBlogByTag = queryBlogByTag
module.exports.addViews = addViews
module.exports.queryViewCtime = queryViewCtime
module.exports.queryAllBlog = queryAllBlog

