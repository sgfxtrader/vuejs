import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import AccessLogs from '@/components/AccessLogs'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: process.env.OKTA_ISSUER,
  client_id: process.env.OKTA_CLIENT_ID,
  redirect_uri: process.env.OKTA_REDIRECT_URI,
  scope: 'openid profile email',
  pkce: false,
  cookies: {
    secure: false
  }
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/access-logs',
      name: 'Access Logs',
      component: AccessLogs,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
