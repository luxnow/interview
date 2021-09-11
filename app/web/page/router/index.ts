import Vue from 'vue';

import VueRouter from 'vue-router';
import Login from '../view/login/index.vue';

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: '',
    routes: [
      {
        path: '/',
        component: Login
      },
      {
        path: '/register',
        component: () => import('../view/register/index.vue')
      },
      {
        path: '/edit/:id',
        component: () => import('../view/edit/index.vue')
      },
      {
        path: '*', component: () => import('../view/notfound/index.vue')
      }
    ]
  });
}
