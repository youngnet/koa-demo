const router = require("koa-router")();
import test from './test';
const fs = require('fs');
const path = require('path');

router.use((ctx, next) => {
    next();
})
router.get('/home',async (ctx, next) => {
    let data = fs.readFileSync('/Users/admin/young-web/stock-pro/react-demo/build/index.html','utf8');
    ctx.body = data;
})

router.get('/static/*',async (ctx,next) => {
    ctx.body = fs.readFileSync(`/Users/admin/young-web/stock-pro/react-demo/build${ctx.request.url}`,'utf8');
})
router.use('/test',test.routes());

export default router;