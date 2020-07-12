import Vue from 'vue'
import App from './App.vue'

// 导入样式文件
import './styles/iconfont.less'
import './styles/common.less'
// 导入rem插件
import 'amfe-flexible'
// 导入时间插件
import moment from 'moment'
// 导入全局组件
import NewsLogo from './components/NewsLogo.vue'
import NewsNav from './components/NewsNav.vue'
import NewsPost from './components/NewsPost.vue'
import NewsComment from './components/NewsComment.vue'

// 导入路由配置文件
import router from './router'
// 按需导入vant
import {
  Button,
  NavBar,
  Form,
  Field,
  Toast,
  Dialog,
  CellGroup,
  Cell,
  RadioGroup,
  Radio,
  Uploader,
  List,
  Tab,
  Tabs,
  PullRefresh
} from 'vant'
// 导入axios
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
// axios请求和响应拦截器
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
axios.interceptors.response.use(res => {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    Toast.fail(message + '请先登录！')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    router.push('/login')
  }
  return res
})

// 注册全局组件
Vue.component('news-logo', NewsLogo)
Vue.component('news-nav', NewsNav)
Vue.component('news-post', NewsPost)
Vue.component('news-comment', NewsComment)
// 初始化vant组件
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)

// 处理图片地址
Vue.prototype.$url = function(url) {
  if (url) {
    if (url.startsWith('http')) {
      return url
    } else {
      return axios.defaults.baseURL + url
    }
  }
}
// 全局过滤器-时间处理
Vue.filter('time', function(input, str = 'YYYY-MM-DD') {
  return moment(input).format(str)
})
moment.locale('zh-CN')
Vue.filter('fromNow', function(input) {
  return moment(input).fromNow()
})
// 创建bus总线
const bus = new Vue()
Vue.prototype.$bus = bus
new Vue({
  render: c => c(App),
  router
}).$mount('#app')
