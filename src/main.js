import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "animate.css";
import "@/assets/css/tailwind.css";
import "@/assets/css/font.css";

createApp(App).use(router).mount("#app");
