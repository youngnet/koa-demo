const koa = require('koa');
const path = require("path")
console.log('<-  log ->  path', path.join(__dirname,'../../react-demo'));


import router from './router';
const app = new koa();

app.use(router.routes());

app.listen(2333, () => {
	console.log('koa is listening on 2333');
});
