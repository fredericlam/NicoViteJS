import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// import Application from './Application.vue'
import router from "./router";
import axios from 'axios'

createApp(App).use(router).mount('#app')
