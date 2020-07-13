import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "user" */ '../views/Login.vue')
const Register = () =>
  import(/* webpackChunkName: "user" */ '../views/Register.vue')
const User = () => import(/* webpackChunkName: "user" */ '../views/User.vue')
const UserEdit = () =>
  import(/* webpackChunkName: "user" */ '../views/UserEdit.vue')
const Follow = () =>
  import(/* webpackChunkName: "user" */ '../views/Follow.vue')
const Common = () =>
  import(/* webpackChunkName: "user" */ '../views/Common.vue')
const Star = () => import(/* webpackChunkName: "user" */ '../views/Star.vue')
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
const Details = () =>
  import(/* webpackChunkName: "post" */ '../views/Details.vue')
const Column = () =>
  import(/* webpackChunkName: "post" */ '../views/Column.vue')
const Search = () =>
  import(/* webpackChunkName: "post" */ '../views/Search.vue')

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' },
    { path: '/useredit', component: UserEdit, name: 'useredit' },
    { path: '/follow', component: Follow, name: 'follow' },
    { path: '/common', component: Common, name: 'common' },
    { path: '/star', component: Star, name: 'star' },
    { path: '/details/:id', component: Details, name: 'details' },
    { path: '/column', component: Column, name: 'column' },
    { path: '/search', component: Search, name: 'search' }
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
