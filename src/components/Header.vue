<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const loggedOut = ref(false)

// Odjava korisnika - prikaži poruku i preusmjeri na početnu
const logout = async () => {
  await authStore.logout()
  loggedOut.value = true
  setTimeout(() => {
    loggedOut.value = false
    router.push('/')
  }, 1500)
}
</script>

<template>
  <header class="header">
    <RouterLink to="/home" class="logo">CarCompare</RouterLink>

    <nav class="nav">
      <RouterLink to="/browse" class="nav-link">Browse</RouterLink>
      <RouterLink to="/compare" class="nav-link">Compare</RouterLink>
    </nav>

    <div v-if="authStore.user" class="user-area">
      <span class="user-email">{{ authStore.user.email }}</span>
      <button class="auth-btn logout-btn" @click="logout">Odjava</button>
    </div>
    <RouterLink v-else to="/signup" class="auth-btn">Sign up / Login</RouterLink>
  </header>

  <div v-if="loggedOut" class="logout-msg">
    Uspješno ste se odjavili!
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px 0 8px;
  height: 64px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: navy;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: navy;
  text-decoration: none;
  font-size: 1rem;
}

.nav-link.router-link-active {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  font-weight: 700;
}

.auth-btn {
  background: navy;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  font-size: 0.95rem;
  border-radius: 4px;
}

.user-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-email {
  font-size: 0.9rem;
  color: #374151;
}

.logout-btn {
  border: none;
  cursor: pointer;
}

.logout-msg {
  text-align: center;
  color: red;
  font-weight: 600;
  padding: 12px;
}
</style>
