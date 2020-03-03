import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/Signin.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/.',
    name: 'home',
    component: Home
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'signin'
        })
      }

      next()
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


// router.beforeEach((to, from, next) => {
//       if (!store.getters['auth/authenticated'] && to.path !== '/signin') {
//         next('/signin')
//       }
//       else {
//         next()
//       }
//     }
// )

export default router
