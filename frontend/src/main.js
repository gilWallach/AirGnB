import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import HistogramSlider from 'vue-histogram-slider';
// import 'vue-histogram-slider/dist/histogram-slider.css';
 
// Vue.component(HistogramSlider.name, HistogramSlider);

import './assets/styles/main.scss'
import './assets/styles/setup/_typography.scss'
import rootCmp from './root-cmp.vue'

const app = createApp(rootCmp)

app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')