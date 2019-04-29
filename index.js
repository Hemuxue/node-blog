let Express = require("express");
let globalConfig = require("./config")
let loader = require("./loader")
const cookie = require('cookie-parser')

const app = new Express();
app.use(cookie())
//user 表接口
app.post('/login', loader.get('/login'))
app.post('/register', loader.get('/register'))
app.get('/userCount', loader.get('/userCount'))
app.get('/getUser', loader.get('/getUser'))
app.post('/deleteUser', loader.get('/deleteUser'))
app.post('/updateUser', loader.get('/updateUser'))

//tags 表接口
app.post('/createTag', loader.get('/createTag'))
app.post('/deleteTag', loader.get('/deleteTag'))
app.post('/getTags', loader.get('/getTags'))

//type 表接口
app.post('/createType', loader.get('/createType'))
app.post('/deleteType', loader.get('/deleteType'))
app.post('/getType', loader.get('/getType'))

app.listen(globalConfig.port, function() {
    console.log("服务器已启动");
});