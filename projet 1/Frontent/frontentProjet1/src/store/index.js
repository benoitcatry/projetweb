import { createStore } from 'vuex'

const store = createStore({
    state: {
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        clearUser(state) {
            state.user = null;
            if (localStorage.getItem('vuex')) {
                localStorage.removeItem('vuex');
            }
        }
    },
    actions: {
        async checkAuth({ commit }) {
            try {
                const response = await fetch('http://localhost:3000/api/auth/check', {
                    credentials: 'include'
                });

                if (response.status === 401) {
                    commit('clearUser');
                    return false;
                }

                const data = await response.json();
                commit('setUser', data.user);
                return true;

            } catch (err) {
                commit('clearUser');
                return false;
            }
        },
        async logout({ commit }) {
            try {
                const response = await fetch('http://localhost:3000/api/auth/logout', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) throw new Error('Logout failed');

                commit('clearUser');
                return true;
            } catch (err) {
                console.error('Logout error:', err);
                return false;
            }
        }
    }
})

export default store