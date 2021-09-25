const axios = require('axios')
const api = axios.create({
  baseURL: 'https://luxnow-test-lymanlai2020-luxnow-test.vercel.app',
  timeout: 10000,
})

module.exports = api
