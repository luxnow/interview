const test = require('ava')
const api = require('./_api.js')

const username = `user-${Date.now()}`

test.before(async (t) => {
  await api.post('/api/user-signup', { username })
})

test(`login with ${username}`, async (t) => {
  const { data } = await api.post('/api/user-login', { username })
  t.is(typeof data.token, 'string')
})
