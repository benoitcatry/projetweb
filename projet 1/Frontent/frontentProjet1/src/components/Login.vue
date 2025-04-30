<template>
  <div class="auth-container">
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <label>Email</label>
      <input v-model="email" type="email" required />

      <label>Mot de passe</label>
      <input v-model="password" type="password" required />

      <button type="submit">Se connecter</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        this.error = '';
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password }),
          credentials: 'include'
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Échec de la connexion');
        }

        const data = await response.json();
        this.$store.commit('setUser', data.user);
        this.$router.push('/');
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.auth-container {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to bottom right, #f0f4f8, #d9e8ff);
  max-width: 360px;
  margin: 80px auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
}

h2 {
  color: #333;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  text-align: left;
  font-weight: 500;
  color: #444;
}

input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: #dc3545;
  margin-top: 1rem;
  font-weight: bold;
}
</style>