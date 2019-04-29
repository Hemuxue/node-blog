const dbutil = require("./DBUtil.js")

function queryUserByPhone(phone, success) {
  const querySql = "select * from user where phone = ?";
  const params = [phone];

  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, params , (error, result) => {
    if (error === null) {
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

const insertUser = (nick_name, phone, password, email, ctime, utime, success) => {
  const insertSql = "insert into user (`nick_name`, `phone`, `password`, `email`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)"
  const params = [nick_name, phone, password, email, ctime, ctime];
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

const  queryUserCount = (success) => {
  const querySql = "select count(1) as count from user;"
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

const queryAllUser = (success) => {
  const querySql = "select * from user";
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

const updateUser = (params, success) => {
  const updateSql = " update user set nick_name = ?,phone = ?,password = ?, email = ?,utime = ? where id = ? ";
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(updateSql, params, (error, result) => {
    if (error === null) {
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

const deleteUserById = (id, success) => {
  const deleteSql = "delete from user where id = ?";
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

const  queryUserById = (id, success) => {
  const querySql = "select * from user where id = ?";
  const params = [id];

  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, params , (error, result) => {
    if (error === null) {
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}


module.exports.queryUserByPhone = queryUserByPhone;
module.exports.insertUser = insertUser;
module.exports.queryUserCount = queryUserCount;
module.exports.queryAllUser = queryAllUser;
module.exports.updateUser = updateUser
module.exports.deleteUserById = deleteUserById