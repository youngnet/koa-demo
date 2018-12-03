const koa = require('koa');
const path = require("path");
const mysql = require("mysql");
const koaSession = require("koa-session");
const cors = require("koa-cors");

import router from './router';
const app = new koa();
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

// const connection = mysql.createConnection({
//   host     : '127.0.0.1',   // 数据库地址
//   user     : 'root',    // 数据库用户
//   password : 'centosmysql',   // 数据库密码
//   database : 'demo'  // 选中数据库
// })


let data = null; 
// 执行sql脚本对数据库进行读写 
app.use(cors({
  origin: (res) => {
    return 'http://localhost:2000'
  }
}));
app.use(koaSession(CONFIG, app));
(async ()=>{
  // data = await getData();
  // console.log(data,'---data---')
  app.use((ctx,next)=>{
    // ctx.request.data = data;
    next();
  })
  app.use(router.routes());

  app.listen(2333, () => {
    console.log('koa is listening on 2333');
  });
})()



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
