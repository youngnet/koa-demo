const router = require("koa-router")();
import test from './test';

router.use((ctx, next) => {
    next();
})
router.use('/test',test.routes());

export default router;