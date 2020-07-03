import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' }
  ]
})
const pages = ['/user', '/useredit']
router.beforeEach(function(to, from, next) {
  console.log(to)
  const token = localStorage.getItem('token')
  if (pages.includes(to.path)) {
    if (!token) {
      router.push('/login')
      return
    }
  }
  next()
})
export default router
