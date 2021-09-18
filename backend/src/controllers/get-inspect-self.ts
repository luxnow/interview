import Router from '@koa/router';
import * as auths from '../middleware/auths';
import { State } from '../middleware/types'

export default function (router: Router<State>): void {
  router.get(
    '/inspect',
    auths.authenticate,
    async (ctx, next) => {
      await next()
      ctx.body = {
        user: ctx.state.user,
        scopes: ctx.state.scopes,
      }
    }
  );
}
