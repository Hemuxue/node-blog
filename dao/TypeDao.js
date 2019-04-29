const dbutil = require("./DBUtil.js")

const insertType = (params, success) => {
  const insertSql = "insert into type (`type`, `ctime`, `utime`) values (?, ?, ?)"
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
const queryTypeByPages = (params,success) => {
  const querySql = "select *  from type limit ?,? ";
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

const queryTypeCount = (success) => {
  const querySql = "select count(1) as total from type ";
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

const queryAllType = (success) => {
  const querySql = "select * from type";
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

const deleteTypeById = (id, success) => {
  const deleteSql = "delete from type where id = ?";
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

module.exports.insertType = insertType
module.exports.queryAllType = queryAllType
module.exports.queryTypeByPages = queryTypeByPages
module.exports.deleteTypeById = deleteTypeById
module.exports.queryTypeCount = queryTypeCount

