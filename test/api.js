const test = require('ava')
const axios = require('axios')
const now = Date.now()

const api = axios.create({
  baseURL: isDev ? 'http://localhost:3000' : ''
  timeout: 10000,
})


test('sign up', (t) => {
  t.pass()
})

test('login', (t) => {
  t.pass()
})

test('update', (t) => {
  t.pass()
})
