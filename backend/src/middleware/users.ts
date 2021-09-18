import Route from '@koa/router';
import users, { User } from '../models/users';
import { DuplicatedError, InvalidKeyError } from '../utils/errors';

export type RetrieveUserState = {
  userId: string;
  user?: User;
}

export type UpdateUserState = {
  userId: string;
  userInfo: Partial<User>;
  user?: User;
}

export type CreateUserState = {
  userInfo: User;
  user?: User;
}

export type VerifyUserState = {
  nickname: string;
  user: User;
}

export const verifyUser: Route.Middleware<VerifyUserState> = async (ctx, next) => {
  ctx.state.user = await users.findOneByNickname(ctx.state.nickname);

  if (!ctx.state.user) {
    return ctx.throw(404, 'Not Found!');
  }

  return next()
}

export const retrieveUser: Route.Middleware<RetrieveUserState> = async (ctx, next) => {
  ctx.state.user = await users.findOne(ctx.state.userId);

  return next()
}

export const updateUser: Route.Middleware<UpdateUserState> = async (ctx, next) => {
  ctx.state.user = await users.update(ctx.state.userId, ctx.state.userInfo)
    .catch((err) => {
      if (DuplicatedError.instanceOf(err)) {
        return ctx.throw(409, err.message);
      }

      if (InvalidKeyError.instanceOf(err)) {
        return ctx.throw(400, err.message);
      }

      throw err;
    });

  return next()
}

export const createUser: Route.Middleware<CreateUserState> = async (ctx, next) => {
  ctx.state.user = await users.insert(ctx.state.userInfo)
    .catch((err) => {
      if (DuplicatedError.instanceOf(err)) {
        return ctx.throw(409, err.message);
      }

      if (InvalidKeyError.instanceOf(err)) {
        return ctx.throw(400, err.message);
      }

      throw err;
    });

  return next()
}
