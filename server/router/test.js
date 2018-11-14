const router = require("koa-router")();

router.post('/a',async (ctx, next) => {
    ctx.body = 'hello test'
})

export default router;