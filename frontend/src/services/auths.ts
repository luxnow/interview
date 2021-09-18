import { Handler } from '../utils/handler'
import * as apis from './api'

export type TokenContext = {
  accessToken?: string ;
};

export type AuthenticateContext = TokenContext & {
  nickname: string;
};

class NotAuthorizedError extends Error {
  code = '401';
}

export const signup: Handler<AuthenticateContext> = async (ctx, next) => {
  const { accessToken } = await apis.postSignup({ nickname: ctx.nickname });

  ctx.accessToken = accessToken;
  return next();
}

export const authenticate: Handler<AuthenticateContext> = async (ctx, next) => {
  const { accessToken } = await apis.postToken({ nickname: ctx.nickname });

  ctx.accessToken = accessToken;
  return next();
}

export const inspect: Handler<TokenContext> = async (ctx, next) => {
  const accessToken = localStorage.getItem('account.accessToken');

  if (!accessToken) {
    return next(new NotAuthorizedError('Not Authorized!'));
  }

  await apis.getInspect(accessToken);

  ctx.accessToken = accessToken;

  return next();
}

export const signout: Handler<TokenContext> = async (ctx, next) => {
  return next(new NotAuthorizedError('Signout!'));
}


