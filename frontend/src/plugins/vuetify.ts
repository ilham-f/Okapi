import "vuetify/styles"
import { createVuetify } from "vuetify"
import { aliases, mdi } from "vuetify/iconsets/mdi"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

// Optional: pakai Material Design Icons
import "@mdi/font/css/materialdesignicons.css"

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi }
  },
  theme: {
    defaultTheme: "light"
  }
})
