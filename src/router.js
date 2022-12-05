import { createRouter, createWebHashHistory } from 'vue-router'

import chat from './views/chat.vue'
import stayApp from './views/stay-app.vue'
import staySearch from './views/stay-search.vue'
import stayDetails from './views/stay-details.vue'
import stayEdit from './views/stay-edit.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import orderConfirm from './views/order-confirm.vue'

const routes = [
  {
    path: '/',
    name: 'stay-app',
    component: stayApp
  },
  {
    path: '/s',
    name: 'stay-search',
    component: staySearch
  },
  {
    path: '/stay/:id',
    name: 'stay-details',
    component: stayDetails
  },
  {
    path: '/stay/edit/:id?',
    name: 'stay-edit',
    component: stayEdit
  },
  {
    path: '/order-confirm',
    name: 'order-confirm',
    component: orderConfirm
  },
  {
    path: '/review',
    name: 'review',
    component: reviewApp
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  }
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

