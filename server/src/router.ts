

import { Context } from 'koa';
import * as Router from 'koa-router';

const router = new Router();

//登录
router.post("/api/login", (ctx: Context) => {

    ctx.body = {
        sucess: true,
    }
})

//检查用户是否重名
router.get("/api/checkName", (ctx: Context) => {
    ctx.body = {
        sucess: false
    }
})

//注册
router.post("/api/register", (ctx: Context) => {
    ctx.body = {
        success: true
    }
})


//注册
router.post("/api/updateInfo", (ctx: Context) => {
    ctx.body = {
        success: true
    }
})

export default router;