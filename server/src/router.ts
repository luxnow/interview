

import { Context } from 'koa';
import * as Router from 'koa-router';

const router = new Router();

//登录
router.post("/login", (ctx: Context) => {
    
})

//检查用户是否重名
router.post("/checkName", (ctx: Context) => {

})

//注册
router.post("register", (ctx: Context) => {

})


export default router;