const router = require('koa-router')();
import test from './test';
const fs = require('fs');
const path = require('path');
const baseUrl = path.join(__dirname, '../../../react-demo/build');

router.redirect('/', '/home');

router.get('/home', async (ctx, next) => {
	let data = fs.readFileSync(`${baseUrl}/index.html`, 'utf8');
	ctx.type = 'text/html';
	ctx.body = data;
});

router.get('/favicon.ico', async (ctx, next) => {
	ctx.body = fs.readFileSync(`${baseUrl}/favicon.ico`);
});

router.get('/static/*', async (ctx, next) => {
	let reg = /(\.bmp|\.gif|\.jpe?g|\.png)$/;
	let data = fs.readFileSync(`${baseUrl}${ctx.request.url}`);
	if (/\.js$/.test(ctx.request.url)) {
		ctx.type = 'text/javascript';
	}
	if (/\.css$/.test(ctx.request.url)) {
		ctx.type = 'text/css';
	}
	if (/(\.bmp|\.gif|\.jpe?g|\.png)$/.test(ctx.request.url)) {
		let imgType = ctx.request.url.match(reg)[0].replace('.', '');
		ctx.type = `image/${imgType}`;
	}
	ctx.body = data;
});

router.use('/test', test.routes());

export default router;
