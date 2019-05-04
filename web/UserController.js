const userDao = require('../dao/UserDao');
const url = require('url');
const { getNow } = require('../util/TimeUtil')
const { writeResult } = require('../util/RespUtil')
const { utf8 } = require('../util/requestHeaderConfig')

const path = new Map();
const login = (request, response) => {
	request.on('data', (data) => {
		const tempData = JSON.parse(data.toString());
		userDao.queryUserByPhone(tempData.phone, (result) => {
			let code ,status, message, data = {};
			if(result && result[0] && result[0].password) {
				if (result[0].password === tempData.password) {
					code = 200,
					status = 'success'
					message = '登录成功'
					for(const props in result[0]){
						if( props !== 'password') {
							data[props] = result[0][props]
						}
					}
				}	else {
					code = 200 ,
					status = 'erroe'
					message = '密码错误'
					data = {}
				}
			}
			response.cookie('id','123')
			response.writeHead(200,utf8);
			response.write(writeResult(code,status, message, data));
			response.end();

		})
	})
}

const register = (request, response) => {
	request.on('data', (data) => {
		const tempData = JSON.parse(data.toString())
		userDao.insertUser(
			tempData.nick_name,
			tempData.phone,
			tempData.password,
			tempData.email,
			getNow(), getNow(),
			(result) => {
				response.writeHead(200,utf8);
				response.write(writeResult(200, 'success',"注册成功", {}));
				response.end();
			})
	})
}

const userCount = (request, response) => {
	userDao.queryUserCount((result) => {
		if(result && result[0] && result[0].count){
			response.writeHead(200,utf8);
			response.write(writeResult(200,'success', "操作成功", {count:result[0].count}));
			response.end();
		}else {
			response.writeHead(200,utf8);
			response.write(writeResult(200,'success', "获取失败", {}));
			response.end();
		}
	})
}

const getUser = (request, response) => {
	userDao.queryAllUser( (result) => {
		let code ,status, message, data = [];
			if(result) {
				code = 200,
				status = 'success'
				message = '操作成功'
				result.map((ele, i) => {
					let tempObj = {}
					for(const prop in ele) {
						if(prop !== 'password')
						tempObj[prop] = ele[prop];
					}
					data.push(tempObj)
				})
				
			}
			response.writeHead(200,utf8);
			response.write(writeResult(code,status, message, data));
			response.end();
	})
}

const deleteUser = (request, response) => {
	request.on('data', (data) => {
		data = JSON.parse(data.toString())
		userDao.deleteUserById(data.id , (result) => {
			response.writeHead(200,utf8);
			response.write(writeResult(200,'success', '删除成功', {}));
			response.end();
		})
	})
	
}

const updateUser = (request, response) => {
	request.on('data', (data) => {
		const tempData = JSON.parse(data.toString())
		const params = [tempData.nick_name, tempData.phone, tempData.password,tempData.email,getNow(), tempData.id ]
		userDao.updateUser(params, (result) => {
				response.writeHead(200,utf8);
				response.write(writeResult(200, 'success',"修改成功", {}));
				response.end();
			})
	})
}


path.set("/login", login)
path.set("/register", register)
path.set("/userCount", userCount)
path.set("/getUser", getUser)
path.set("/deleteUser", deleteUser)
path.set("/updateUser",updateUser)
module.exports.path = path
