import { assert } from 'chai';
import faker from 'faker';
import * as helpers from '../helpers';
import { User } from '../../src/models/users'

describe('test signup', () => {
  const context: {
    nickname: string;
    account: {
      user?: User;
      accessToken?: string;
    }
  } = {
    nickname: faker.random.alphaNumeric(22),
    account: {}
  }

  describe('with valid nickname', () => {
    let statusCode: number;
    let payload: string;

    before('call signup api', async () => {
      ({ payload, statusCode } = await helpers.http({
        url: '/api/signup',
        method: 'post',
        payload: {
          nickname: context.nickname
        }
      }))

      context.account = JSON.parse(payload);
    })

    it('should return correct user', () => {
      assert.equal(statusCode, 200);
      assert.exists(payload);

      assert.exists(context.account);
      assert.exists(context.account?.user?._id);
      assert.nestedPropertyVal(context, 'account.user.nickname', context.nickname);
    })

    it('should return correct access token', async () => {
      assert.exists(context.account?.accessToken);

      const { payload, statusCode } = await helpers.http({
        url: '/api/inspect',
        method: 'get',
        headers: {
          authorization: context.account?.accessToken || '',
        }
      })

      assert.equal(statusCode, 200);
      assert.exists(payload);

      const { user } = JSON.parse(payload);
      assert.deepEqual(user, context.account.user);
    })
  })

  describe('with duplicated nickname', () => {
    let statusCode: number;
    let payload: string;

    before('call signup api', async () => {
      ({ payload, statusCode } = await helpers.http({
        url: '/api/signup',
        method: 'post',
        payload: {
          nickname: context.nickname
        }
      }))
    })

    it('should return 409', () => {
      assert.equal(statusCode, 409);
    })
  })
})
