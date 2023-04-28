import { createApp } from 'vue'
import App from './App.vue'
import GMap from './components/GMap.vue'

createApp(App).component('GMap', GMap).mount('#app')
