const test = require('ava')
const api = require('./_api.js')

const username = `user-${Date.now()}`

test.serial(`sign up with ${username}`, async (t) => {
  const { data } = await api.post('/api/user-signup', { username })
  t.is(typeof data.token, 'string')
})

test.serial(`should failed while sign up with ${username}`, async (t) => {
  const { data } = await api.post('/api/user-signup', { username })
  t.is(typeof data.token, 'undefined')
})
