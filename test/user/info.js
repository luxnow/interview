const test = require('ava')
const api = require('./_api.js')

const username = `user-${Date.now()}`
let headers = ''
test.before(async (t) => {
  await api.post('/api/user-signup', { username })
  const { data } = await api.post('/api/user-login', { username })
  headers = {
    Authentication: `Bearer ${data.token}`,
  }
})

test(`info with ${username}`, async (t) => {
  const { data } = await api.post('/api/user-info', {}, { headers })
  t.is(data.msg, 'data validate')
})
