const dbutil = require("./DBUtil.js")

const insertTags = (params, success) => {
  const insertSql = "insert into tags (`tag`, `ctime`, `utime`) values (?, ?, ?)"
  const connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (error, result) => {
      if (error == null) {
          success(result);
      } else {
          console.log(error);
      }
    });
    connection.end();
}
//分页查询
const queryTagByPages = (params,success) => {
  const querySql = "select *  from tags limit ?,? ";
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql,params, (error, result) => {
    if (error === null) {
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

const queryTagCount = (success) => {
  const querySql = "select count(1) as total from tags ";
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, (error, result) => {
    if (error === null) {
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

const queryAllTag = (success) => {
  const querySql = "select * from tags";
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, (error, result) => {
    if (error === null) {
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

const deleteTagById = (id, success) => {
  const deleteSql = "delete from tags where id = ?";
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

module.exports.insertTags = insertTags
module.exports.queryAllTag = queryAllTag
module.exports.queryTagByPages = queryTagByPages
module.exports.deleteTagById = deleteTagById
module.exports.queryTagCount = queryTagCount

