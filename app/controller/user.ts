import { Controller } from 'egg';
import { Body, Put, Post } from 'egg-router-util';

export default class UserController extends Controller {
    @Post('/api/user/login')
    public async login(@Body('userName') userName: string) {
        this.ctx.body = await this.ctx.service.user.login(userName);
    }

    @Post('/api/user/register')
    public async register(@Body('userName') userName: string) {
        this.ctx.body = await this.ctx.service.user.register(userName);
    }

    @Put('/api/user/edit')
    public async edit(@Body('id') id: number, @Body('userName') userName: string) {
        this.ctx.body = await this.ctx.service.user.edit(id, userName);
    }
}