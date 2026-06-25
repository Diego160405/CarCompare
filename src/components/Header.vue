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

  <!-- šalje na home page -->
  <header class="flex items-center justify-between px-8 h-16 bg-white border-b border-gray-200">
    <RouterLink to="/home" class="logo">
      CarCompare
    </RouterLink>

    <nav class="flex gap-8">

      <!-- šalje na browse page -->
      <RouterLink to="/browse" class="nav-link">
        Browse
      </RouterLink>

      <!-- šalje na compare page -->
      <RouterLink to="/compare" class="nav-link">
        Compare
      </RouterLink>
    </nav>

    <!-- odjavljuje nas ako smo ulogirani -->
    <div v-if="authStore.user" class="flex items-center gap-3">
      <span class="text-sm text-gray-700">
        {{ authStore.user.email }}
      </span>
      <button class="auth-btn border-none cursor-pointer" @click="logout">
        Odjava
      </button>
    </div>

    <!-- ako nismo šalje na login page -->
    <RouterLink v-else to="/login" class="auth-btn">
      Sign up / Login
    </RouterLink>
  </header>

  <!-- ispisuje poruku ako je odjava uspješna -->
  <div v-if="loggedOut" class="text-center text-red-600 font-semibold py-3">
    Uspješno ste se odjavili!
  </div>
</template>

<style scoped>
.logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: navy;
  text-decoration: none;
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
</style>
