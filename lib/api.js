const axios = require('axios')
const TOO_MANY_REQUESTS_HTTP_STATUS_CODE = 429

const api = axios.create({
  baseURL: 'https://challenge.crossmint.io/api',
  headers: {
    'Content-Type': 'application/json'
  },
  retry: 2,
  retryDelay: 4000,
  transformRequest: [function (data) {
    if (typeof data === 'string') { // body already parsed - only in retry request
      return data
    }
    data.candidateId = process.env.CANDIDATE_ID || '7b7efdda-9b51-4445-bde8-645ff444a738'
    return JSON.stringify(data)
  }]
})

api.interceptors.response.use(undefined, (err) => {
  const { config, request } = err

  if (!config || !config.retry) {
    return Promise.reject(err)
  }

  if (request.res.statusCode !== TOO_MANY_REQUESTS_HTTP_STATUS_CODE) {
    return Promise.reject(err)
  }

  config.retry -= 1

  const delayRetryRequest = new Promise((resolve) => {
    setTimeout(() => {
      console.log('retry the request', config.url)
      resolve()
    }, config.retryDelay || 1000)
  })

  return delayRetryRequest.then(() => axios(config))
})

module.exports = api
