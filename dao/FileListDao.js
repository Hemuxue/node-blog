const dbutil = require("./DBUtil.js")

const insertFileList = (file_name, file_size, file_path, user_id, success) => {
  const insertSql = "insert into file_list (`file_name`, `file_size`, `file_path`, `user_id`) values (?, ?, ?, ?)"
  const params = [file_name, file_size, file_path, user_id];
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

module.exports.insertFileList = insertFileList