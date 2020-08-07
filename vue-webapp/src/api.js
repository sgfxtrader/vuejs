import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: process.env.API_ENDPOINT,
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getAccessLogs () {
    return this.execute('get', '/access-logs')
  },
  getAccessLog (id) {
    return this.execute('get', `/access-logs/${id}`)
  },
  createAccessLog (data) {
    return this.execute('post', '/access-log', data)
  },
  deleteAccessLogs () {
    return this.execute('delete', '/access-logs')
  }
}
