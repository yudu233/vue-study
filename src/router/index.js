import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import {
  Message
} from 'element-ui';
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    component: Home,
    redirect: "/admin/welcome",
    children: [{
      path: "/admin/welcome",
      component: Welcome
    }, {
      path: '/admin/users',
      component: Users
    }]
  },


]

const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  //如果是登录，直接放行
  if (to.path === '/login') return next()
  //如果是其他页面，先判断token值，没有token则强制跳转到登录页
  const token = window.sessionStorage.getItem('token')
  if (!token) {
    Message.error('请登录！')
    return next('/login')
  }
  next()
})

export default router
