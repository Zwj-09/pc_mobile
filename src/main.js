import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "./assets/reset.css";

import "amfe-flexible";

// function autoResponse(width = 750) {
//   const target = document.documentElement || document.body;
//   target.style.fontSize = `${target.clientWidth / 70}px`;
// }

// autoResponse();

// window.addEventListener("resize", autoResponse);

const app = createApp(App);

app.use(store).use(router).use(ElementPlus).mount("#app");
