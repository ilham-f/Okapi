import { createApp, h, provide } from "vue";
import App from "./App.vue";
import { apolloClient, DefaultApolloClient } from "./apollo";
import router from "./router/index";
import vuetify from "./plugins/vuetify"; 

const app = createApp({
  setup() {
    // Provide Apollo Client ke seluruh aplikasi
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router);
app.use(vuetify);
app.mount("#app");
