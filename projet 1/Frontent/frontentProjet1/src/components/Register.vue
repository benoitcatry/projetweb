<template>
  <div class="auth-container">
    <h2>Inscription</h2>
    <form @submit.prevent="register">
      <label>Email</label>
      <input v-model="email" type="email" required />

      <label>Mot de passe</label>
      <input v-model="password" type="password" required />

      <button type="submit">S'inscrire</button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      success: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          }),
          credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
          this.success = data.message;
          this.$store.commit('setUser', data.user);
          this.$router.push('/')
        } else {
          this.error = data.message;
        }
      } catch (err) {
        this.error = 'Erreur lors de l\'inscription';
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.auth-container {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to bottom right, #fdfbfb, #ebedee);
  max-width: 360px;
  margin: 80px auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
}

h2 {
  color: #222;
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
  border-color: #28a745;
  outline: none;
}

button {
  background-color: #28a745;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #1e7e34;
}

.error {
  color: #dc3545;
  margin-top: 1rem;
  font-weight: bold;
}

.success {
  color: #28a745;
  margin-top: 1rem;
  font-weight: bold;
}
</style>