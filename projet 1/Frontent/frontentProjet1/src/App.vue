<template>
  <div id="app">

    <nav class="navigation" v-if="!$route.meta.hideNav">
      <div class="nav-left">
        <router-link to="/" class="logo">MonApp</router-link>
      </div>
      <div class="nav-right">
        <template v-if="user">
          <span class="user-info">Bienvenue, {{ user.email }}</span>
          <button @click="logout" class="logout-btn">Déconnexion</button>
        </template>
        <template v-else>
          <router-link to="/login" class="nav-link">Connexion</router-link>
          <router-link to="/register" class="nav-link">Inscription</router-link>
        </template>
      </div>
    </nav>

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    async logout() {
      try {
        const response = await fetch('http://localhost:3000/api/auth/logout', {
          method: 'GET',
          credentials: 'include' // Essentiel pour les cookies
        });

        if (!response.ok) throw new Error('Logout failed');

        // Effacer le state local
        this.$store.commit('clearUser');

        // Forcer un rechargement complet pour nettoyer toute donnée résiduelle
        window.location.href = '/login';

      } catch (err) {
        console.error('Logout error:', err);
        // En cas d'échec, forcer quand même la déconnexion locale
        this.$store.commit('clearUser');
        window.location.href = '/login';
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Inter', sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background-color: #f4f6f9;
  min-height: 100vh;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b983;
  text-decoration: none;
}

.nav-right, .nav-left {
  display: flex;
  align-items: center;
}

.nav-link, .logout-btn {
  margin-left: 1rem;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.nav-link:hover, .logout-btn:hover {
  background-color: #e0f0ea;
}

.user-info {
  font-weight: 500;
  color: #555;
}

.content {
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}
</style>
