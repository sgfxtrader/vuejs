<template>
  <div class="container-fluid mt-4 white-font table-responsive-md w-75">
    <b-alert :show="this.loading" variant="info">Loading...</b-alert>
    <h2>Access Logs</h2>
    <p>Only authenticated users should see this page. Your IP Geolocation information will be logged everytime you visit this page.</p>
    <div v-if="!this.error" >
      <table class="table table-hover table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">IP Address</th>
            <th scope="col">ISP</th>
            <th scope="col">Country Code</th>
            <th scope="col">Country</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(log, index) in this.accessLogs" :key="log.id">
            <td>{{ index + 1 }}</td>
            <td>{{ log.ipAddress }}</td>
            <td>{{ log.isp }}</td>
            <td>{{ log.countryCode }}</td>
            <td>{{ log.country }}</td>
            <td>{{ log.lat }}</td>
            <td>{{ log.lon }}</td>
            <td>{{ new Date(log.timestamp).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
      <div class="text-right mt-2">
        <b-btn type="submit" variant="danger" v-on:click="clearAllLogs">Clear All Logs</b-btn>
      </div>
    </div>
    <div v-else>
      <b-alert :show="this.error" variant="danger">Unable to get data from MongoDB. Please check server logs!</b-alert>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '@/api'

export default {
  data () {
    return {
      loading: false,
      error: false,
      accessLogs: [],
      model: {}
    }
  },
  async mounted () {
    this.createAuditLog()
  },
  methods: {
    async createAuditLog () {
      try {
        const response = await axios.get('http://ip-api.com/json')
        const data = response.data
        if (data) {
          // insert record into logs collection
          const timestampNow = new Date().getTime()
          const logObj = {
            ipAddress: data.query,
            isp: data.isp,
            country: data.country,
            countryCode: data.countryCode,
            lat: data.lat,
            lon: data.lon,
            timestamp: timestampNow
          }
          if (logObj) {
            this.loading = true
            await api.createAccessLog(logObj)
            await this.refreshAccessLogs()
            this.loading = false
            this.error = false
          }
        }
      } catch (err) {
        this.error = true
        console.error(err)
      }
    },
    async clearAllLogs () {
      this.loading = true
      await api.deleteAccessLogs()
      await this.refreshAccessLogs()
      this.loading = false
    },
    async refreshAccessLogs () {
      this.loading = true
      this.accessLogs = await api.getAccessLogs()
      this.error = this.accessLogs == null
      this.loading = false
    }
  }
}
</script>