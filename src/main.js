import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/reset.css';

// Các cài đặt khác nếu cần

const app = createApp(App);
app.use(router);
app.use(Antd);
app.mount("#app");
