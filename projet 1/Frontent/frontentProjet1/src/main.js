import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(store)
app.use(router)

// Vérification initiale de l'authentification
store.dispatch('checkAuth').finally(() => {
    app.mount('#app')
})