import { createVuetify } from 'vuetify'
import { VApp, VAppBar, VBtn, VCard, VIcon } from 'vuetify/components' // Example componentsimport * as directives from 'vuetify/directives'
import { Ripple } from 'vuetify/directives' // Example directives

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        treeShake: true,
        components: {
            VApp,
            VAppBar,
            VBtn,
            VCard,
            VIcon,
        },
        directives: {
            Ripple,
        },
    })
    nuxtApp.vueApp.use(vuetify)
})