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
	let data = fs.readFileSync(`${baseUrl}${ctx.request.url}`, 'utf8');
	if (/\.js$/.test(ctx.request.url)) {
		ctx.type = 'text/javascript';
	}
	if (/\.css$/.test(ctx.request.url)) {
		ctx.type = 'text/css';
	}
	ctx.body = data;
});

router.use('/test', test.routes());

export default router;
