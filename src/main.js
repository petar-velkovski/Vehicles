import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vehicles from "./data/vehicles.json"

Vue.config.productionTip = false

let app = new Vue({
  router,
  vuetify,
  data: {
      vehicles: Vehicles
  },
  render: h => h(App)
}).$mount('#app')
