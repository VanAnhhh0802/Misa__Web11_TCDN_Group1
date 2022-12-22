import { createApp } from 'vue'
import App from './App.vue'
import './css/style.css'
import MScombobox from './components/base/MScombobox/MScombobox.vue'


const app = createApp(App)
app.component('ms-combobox',MScombobox)
app.mount('#app')
