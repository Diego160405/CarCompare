<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const loggedOut = ref(false)
const dropdownOpen = ref(false)

// Odjava korisnika - prikaži poruku i preusmjeri na početnu
const logout = async () => {
  dropdownOpen.value = false
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

    <!-- profilna slika s dropdownom -->
    <div v-if="authStore.user" class="relative mr-0.5">
      <img
        src="/ProfileIcon.jpg"
        alt="Profile"
        class="avatar"
        @click="dropdownOpen = !dropdownOpen"/>

      <!-- ako smo ulogirani odjavljuje nas -->
      <div v-if="dropdownOpen" class="dropdown">
        <button @click="logout">
          Log out
        </button>
      </div>
    </div>

    <div v-else class="flex items-center gap-3">

      <!-- ispisuje poruku ako je odjava uspješna -->
      <span v-if="loggedOut" class="text-sm text-red-600 font-semibold">
        Logged out successfully!
      </span>

      <!-- ako nismo ulogirani šalje na login page -->
      <RouterLink to="/login" class="auth-btn">
        Sign up / Login
      </RouterLink>
    </div>
  </header>
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
  padding: 7px 14px;
  font-size: 0.85rem;
  border-radius: 4px;
}

.avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  background: white;
  border: 1px solid lightgray;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  min-width: 120px;
  z-index: 100;
}

.dropdown button {
  width: 100%;
  padding: 10px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  color: red;
}

.dropdown button:hover {
  background: whitesmoke;
  border-radius: 8px;
}
</style>
