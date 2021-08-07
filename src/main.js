import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import InstantSearch from "vue-instantsearch";
// App.js

// Include only the reset
import "instantsearch.css/themes/reset.css";
// or include the full Satellite theme
// import 'instantsearch.css/themes/satellite.css';

Vue.use(InstantSearch);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
