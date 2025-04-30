<template>
  <div v-if="user">
    <h2>Tableau de bord</h2>
    <p>Bienvenue, {{ user.email }}!</p>
    <button @click="logout">Déconnexion</button>
  </div>
  <div v-else-if="error">
    <p>Erreur de chargement : {{ error }}</p>
  </div>
  <div v-else>
    <p>Chargement en cours...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      loading: false
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  async created() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      this.loading = true;
      this.error = null;

      try {
        if (this.user) return;

        const response = await fetch('http://localhost:3000/api/auth/user', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(response.status === 401 ? 'Non autorisé' : 'Erreur serveur');
        }

        const data = await response.json();
        this.$store.commit('setUser', data.user);
      } catch (err) {
        this.error = err.message;
        this.$store.commit('clearUser');
        this.$router.push('/login');
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout');
        // Redirection forcée vers l'accueil avec rechargement
        window.location.href = '/';
      } catch (err) {
        console.error('Erreur de déconnexion:', err);
        window.location.href = '/';
      }
    }
  }
};
</script>