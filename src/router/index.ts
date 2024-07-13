import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Layout from '../components/HelloWorld.vue'

const routes: Array<RouteRecordRaw> = [
   {
      //路由初始指向
      path: '/',
      redirect: 'logo',
   },
   {
      //路由初始指向
      path: '/logo',
      name: 'logo',
      component: () => import('../views/logo.vue'),
   },
   {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue'),
   },
   {
      path: '/otherLogin',
      name: 'otherLogin',
      component: () => import('../views/login/otherLogin.vue'),
   },
   {
      path: '/manage',
      name: 'manage',
      component: () => import('@/views/manage/index.vue'),
   },
   {
      path: '/main',
      name: 'main',
      component: () => import('../views/layout/index.vue'),
      children: [
         {
            path: '/main',
            // redirect: 'HelloWorld',
            component: () => import('@/views/home/index.vue'),
         },
         {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home/index.vue'),
         },
         {
            path: '/camouflageAlgorithm',
            name: 'camouflageAlgorithm',
            component: () => import('@/views/camouflageAlgorithm/index.vue'),
         },
         {
            path: '/deceptionAlgorithm',
            name: 'deceptionAlgorithm',
            component: () => import('@/views/deceptionAlgorithm/index.vue'),
         },
         {
            path: '/defoggingAlgorithm',
            name: 'defoggingAlgorithm',
            component: () => import('@/views/defoggingAlgorithm/index.vue'),
         },
         {
            path: '/globalPlanning',
            name: 'globalPlanning',
            component: () => import('@/views/globalPlanning/index.vue'),
         },
         {
            path: '/localPlanning',
            name: 'localPlanning',
            component: () => import('@/views/localPlanning/index.vue'),
         },

      ]
   }
]

const router = createRouter({
   history: createWebHistory(),
   routes
})

export default router
