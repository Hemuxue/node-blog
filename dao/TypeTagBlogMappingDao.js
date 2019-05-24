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

const queryTagGroupByTagId = (success) => {
	const insertSql = "select tag_id, count(1) as total from type_tags_blog_mapping group by tag_id;";

	const connection = dbutil.createConnection();
	connection.connect();
	connection.query(insertSql, function (error, result) {
		if (error == null) {
			success(result);
		} else {
			console.log(error);
		}
	});
	connection.end();
}

const queryTypeGroupByTypeId = (success) => {
	const insertSql = "select type_id, count(1) as total from type_tags_blog_mapping group by type_id;";

	const connection = dbutil.createConnection();
	connection.connect();
	connection.query(insertSql, function (error, result) {
		if (error == null) {
			success(result);
		} else {
			console.log(error);
		}
	});
	connection.end();
}


module.exports.insertTagBlogMapping = insertTagBlogMapping
module.exports.queryTagGroupByTagId = queryTagGroupByTagId
module.exports.queryTypeGroupByTypeId = queryTypeGroupByTypeId