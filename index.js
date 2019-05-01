let Express = require("express");
let globalConfig = require("./config")
let loader = require("./loader")
const cookie = require('cookie-parser')
let multer = require('multer');

const upload = multer({dest: './file/'})
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
app.get('/getAllTags', loader.get('/getAllTags'))

//type 表接口
app.post('/createType', loader.get('/createType'))
app.post('/deleteType', loader.get('/deleteType'))
app.post('/getType', loader.get('/getType'))
app.get('/getAllType', loader.get('/getAllType'))
//file_list 表接口
app.get('/getPic', loader.get('/getPic'))
app.post('/upload', upload.any(), loader.get('/upload'))

//blog 表接口

app.post('/createBlog' ,loader.get('/createBlog'))
app.get('/getBlogList', loader.get('/getBlogList'))
app.get('/deleteBlog', loader.get('/deleteBlog'))
app.listen(globalConfig.port, function() {
    console.log("服务器已启动");
});