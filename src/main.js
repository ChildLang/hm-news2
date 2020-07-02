import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'amfe-flexible'

import './styles/common.less'
import './styles/iconfont.less'

import NewsLogo from './components/NewsLogo.vue'

import { Button, NavBar, Form, Field, Toast } from 'vant'

import axios from 'axios'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'

Vue.component('news-logo', NewsLogo)

Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)

new Vue({
  render: c => c(App),
  router
}).$mount('#app')
