import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Grid from '../views/Grid.vue'
import VehicleForm from '../views/VehicleForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
    path: '/form',
    name: 'Form',
    component: VehicleForm
  },
  {
    path: '/form/:id',
    name: 'Form',
    component: VehicleForm
  },
  {
    path: '/grid',
    name: 'Grid',
    component: Grid
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
