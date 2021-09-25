const test = require('ava')
const api = require('./_api.js')

const username = `user-${Date.now()}`
const username2 = `${username}-exist`
const username3 = `${username}-not-exist`

let headers = ''
test.before(async (t) => {
  await api.post('/api/user-signup', { username })
  await api.post('/api/user-signup', { username: username2 })
  const { data } = await api.post('/api/user-login', { username })
  headers = {
    Authentication: `Bearer ${data.token}`,
  }
})

test(`should failed while update with ${username2}`, async (t) => {
  const { data } = await api.post('/api/user-update', { username: username2 }, { headers })
  t.is(data.err, 'the username exist')
})

test(`update with ${username3}`, async (t) => {
  const { data } = await api.post('/api/user-update', { username: username3 }, { headers })
  t.is(typeof data.token, 'string')
})
