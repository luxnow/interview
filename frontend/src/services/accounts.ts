import { Handler } from '../utils/handler'
import { TokenContext } from './auths'
import * as apis from './api'

export type AcountContext = TokenContext & {
  nickname: string;
};

export const updateSelf: Handler<AcountContext> = async (ctx, next) => {
  await apis.putUpdateSelf(ctx.accessToken || '', { nickname: ctx.nickname })
  return next()
}

