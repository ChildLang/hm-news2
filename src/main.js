import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'amfe-flexible'

import './styles/common.less'
import './styles/iconfont.less'

import NewsLogo from './components/NewsLogo.vue'
import NewsNav from './components/NewsNav.vue'

import moment from 'moment'
import { Button, NavBar, Form, Field, Toast } from 'vant'

import axios from 'axios'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
axios.interceptors.response.use(function(res) {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    Toast.fail(message)
    router.push('/login')
    localStorage.removeItem('id')
    localStorage.removeItem('idtoken')
  }
  return res
})
Vue.filter('time', function(input) {
  return moment(input).format('YYYY-MM-DD')
})
Vue.component('news-logo', NewsLogo)
Vue.component('news-nav', NewsNav)

Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)

new Vue({
  render: c => c(App),
  router
}).$mount('#app')
