import Koa from 'koa';
import joi from 'joi';

type Validator<T> = (ctx: Koa.ParameterizedContext) => Promise<T>;

export function createValidator<T>(schema: joi.ObjectSchema<T>): Validator<T> {
  return async (ctx: Koa.ParameterizedContext) => {
    try {
      return await schema.validateAsync({
        params: ctx.params,
        query: ctx.request.query,
        body: ctx.request.body,
      })
    } catch (err: any) {
      ctx.throw(400, err.message);
    }
  }
}
