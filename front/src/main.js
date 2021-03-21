import Vue from 'vue'
import App from './App.vue'
import VueGoogleCharts from 'vue-google-charts'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(VueGoogleCharts)
Vue.use(element)

new Vue({
  render: h => h(App),
}).$mount('#app')
