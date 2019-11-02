import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/IndexPage'
import NotFound from '@/components/NotFoundPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
