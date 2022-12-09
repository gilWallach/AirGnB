import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js'
Chart.register(DoughnutController, ArcElement, Tooltip)
import { CaretBottom } from '@element-plus/icons-vue'

import './assets/styles/main.scss'
import './assets/styles/setup/_typography.scss'
import rootCmp from './root-cmp.vue'

const app = createApp(rootCmp)

app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
