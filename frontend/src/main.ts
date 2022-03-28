import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";

createApp(App).use(ElementPlus).use(store, key).use(router).mount("#app");
