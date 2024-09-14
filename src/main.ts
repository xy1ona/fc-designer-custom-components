import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import FcDesigner from '@form-create/designer';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// 创建 Vue 应用
const app = createApp(App);

// 使用 Element Plus 和 FcDesigner
app.use(ElementPlus);
app.use(FcDesigner);
app.use(FcDesigner.formCreate);


// 挂载应用
app.mount('#app');
