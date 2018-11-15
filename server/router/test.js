const router = require("koa-router")();

router.post('/a',async (ctx, next) => {
    console.log(ctx);
    ctx.body = 'hello test'
})

export default router;
