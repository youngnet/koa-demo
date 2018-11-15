const koa = require('koa');
const path = require("path");
const mysql = require("mysql");
console.log('<-  log ->  path', path.join(__dirname,'../../react-demo'));


import router from './router';
const app = new koa();

const connection = mysql.createConnection({
  host     : '127.0.0.1',   // 数据库地址
  user     : 'root',    // 数据库用户
  password : 'centosmysql',   // 数据库密码
  database : 'demo'  // 选中数据库
})


let data = null; 
// 执行sql脚本对数据库进行读写 

async ()=>{
  data = await getData();
  console.log(data,'---data---')
  app.use(router.routes());

  app.listen(2333, () => {
    console.log('koa is listening on 2333');
  });
}



function getData(){
  return new Promise((resolve,reject) => {
    connection.query('SELECT * from userinfo',  (error, results, fields) => {
      if (error) throw error
      // connected!        
      // 结束会话
      resolve(results);
   });
   connection.end();
  })
}