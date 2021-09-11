import { Context, Service } from 'egg';
// import { User } from '../model/user';

export default class TokenService extends Service {
  constructor(ctx: Context) {
    super(ctx);
  }
  async apply(id) {
    const {ctx} = this;
    return ctx.app.jwt.sign({
      data: {
        user: id
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 4)
    }, ctx.app.config.jwt.secret);
  }

  async verify(token) {
    const {ctx} = this;
    return ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
  }
}