import { createApp } from "vue";
import Toast, { POSITION } from "vue-toastification";
import App from "./App.vue";
import router from "./router";

import "animate.css";
import "@/assets/css/tailwind.css";
import "@/assets/css/font.css";
import "vue-toastification/dist/index.css";

createApp(App)
  .use(router)
  .use(Toast, { position: POSITION.BOTTOM_RIGHT })
  .mount("#app");
