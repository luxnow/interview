// test/app/service/user.test.ts
import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/user.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  const username = 'test' + Date.now;

  it('register()', async () => {
    const result = await ctx.service.user.register(username);
    assert(result );
  });

  it('login()', async () => {
    const result = await ctx.service.user.login(username);
    assert(result > 0);
  });

  it('update()', async () => {
    const result = await ctx.service.user.edit(1, username);
    assert(!result );
  });
});