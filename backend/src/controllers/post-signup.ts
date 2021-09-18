import Router from '@koa/router';
import joi from 'joi';
import * as auths from '../middleware/auths';
import * as users from '../middleware/users';
import { createValidator } from '../middleware/validate';
import { State } from '../middleware/types'

export default function (router: Router<State>): void {
  const validate = createValidator(
    joi.object().keys({
      body: joi.object().keys({
        nickname: joi.string().alphanum().max(32).required()
      })
    })
      .unknown()
  );

  router.post(
    '/signup',
    async (ctx, next) => {
      const { body } = await validate(ctx);
      ctx.state.userInfo = body;

      await next()

      ctx.body = {
        user: ctx.state.user,
        scopes: ctx.state.scopes,
        accessToken: ctx.state.accessToken,
      }
    },
    users.createUser,
    auths.token,
  );
}
