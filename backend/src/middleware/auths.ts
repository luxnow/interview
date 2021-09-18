import Route from '@koa/router';
import { v4 as uuid } from 'uuid';
import users, { User } from '../models/users';

export type AuthenticateState = { scopes?: string[]; user?: User; }
export type TokenState = { user: User; scopes?: string[]; accessToken: string }

const tokenMap = new Map<string, { expiresAt: number, scopes: string[], userId: string }>()

export const authenticate: Route.Middleware<AuthenticateState> = async (ctx, next) => {
  const { authorization: accessToken } = ctx.request.headers;

  if (!accessToken || typeof accessToken !== 'string') {
    return ctx.throw(401, 'Not Authorized');
  }

  const token = tokenMap.get(accessToken)

  if (!token) {
    return ctx.throw(401, 'Not Authorized');
  }

  if (token.expiresAt < Date.now()) {
    return ctx.throw(401, 'Not Authorized');
  }

  ctx.state.user = await users.findOne(token.userId);

  if (!ctx.state.user) {
    return ctx.throw(403, 'Permission Forbbidden!');
  }

  ctx.state.scopes = token.scopes;

  return next();
}

export const token: Route.Middleware<TokenState> = async (ctx, next) => {
  const accessToken = uuid().replace(/-/g, '');
  const scopes = ['*'];

  tokenMap.set(accessToken, {
    expiresAt: Date.now() + 10 * 60 * 1000,
    scopes,
    userId: ctx.state.user._id,
  })

  ctx.state.scopes = scopes;
  ctx.state.accessToken = accessToken;

  return next();
}
