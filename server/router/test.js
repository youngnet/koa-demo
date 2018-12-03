const router = require("koa-router")();

router.post('/a',async (ctx, next) => {
    ctx.body = 'test'
})

export default router;
