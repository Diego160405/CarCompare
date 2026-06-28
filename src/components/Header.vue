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
    <RouterLink to="/home" class="text-xl font-bold no-underline" style="color: navy;">
      CarCompare
    </RouterLink>

    <nav class="flex gap-8">

      <!-- šalje na browse page -->
      <RouterLink to="/browse" class="no-underline text-base router-link" style="color: navy;">
        Browse
      </RouterLink>

      <!-- šalje na compare page -->
      <RouterLink to="/compare" class="no-underline text-base router-link" style="color: navy;">
        Compare
      </RouterLink>
    </nav>

    <!-- profilna slika s dropdownom -->
    <div v-if="authStore.user" class="relative mr-0.5">
      <img
        src="/ProfileIcon.jpg"
        alt="Profile"
        style="width:52px;height:52px;"
        class="rounded-full object-cover cursor-pointer"
        @click="dropdownOpen = !dropdownOpen"/>

      <!-- ako smo ulogirani odjavljuje nas -->
      <div v-if="dropdownOpen" class="absolute left-1/2 -translate-x-1/2 top-full bg-white border border-gray-200 rounded-xl shadow-md min-w-30 z-50">
        <button
          class="w-full px-4 py-2.5 bg-transparent border-none text-left cursor-pointer text-sm text-red-500 hover:bg-gray-50 rounded-xl"
          @click="logout">
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
      <RouterLink to="/login" class="text-white no-underline px-3.5 py-1.5 text-sm rounded" style="background: navy;">
        Sign up / Login
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>

.router-link.router-link-active {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  font-weight: 700;
}

</style>
