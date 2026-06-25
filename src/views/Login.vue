<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter, useRoute } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const loggedIn = ref(false)
// Provjerava je li korisnik stigao s odjave kako bi prikazao poruku
const loggedOut = ref(route.query.loggedOut === 'true')

// Prijava korisnika - sakrije poruku odjave i preusmjeri na početnu ako nema greške
const login = async () => {
  await authStore.login(email.value, password.value)
  if (!authStore.error) {
    loggedOut.value = false
    loggedIn.value = true
    setTimeout(() => router.push('/'), 1500)
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 w-full max-w-lg px-10 py-12">

      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">Log in</h1>
        <p class="text-slate-500 text-base">Welcome back to CarCompare</p>
      </div>

      <!-- poruka nakon prijave -->
      <div v-if="loggedIn" class="text-green-600 font-semibold text-sm mb-4">
        Logged in successfully!
      </div>
      <!-- prikazuje kada korisnik dođe s odjave odjave -->
      <div v-if="loggedOut" class="text-slate-500 font-semibold text-sm mb-4">
        Logged out successfully!
      </div>

      <!-- ispise postojeći error, npr. krivi password -->
      <div v-if="authStore.error" class="text-red-500 text-sm mb-4">
        {{ authStore.error }}
      </div>

      <!-- dio za unos emaila -->
      <div class="mb-5">
        <label class="block text-xs font-bold tracking-widest text-slate-700 uppercase mb-2">
          Email Address
        </label>
        <input
          v-model="email"
          type="email"
          placeholder="email@address.com"
          class="w-full border border-slate-300 rounded-xl px-4 py-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 text-base"/>
      </div>

      <!-- dio za unos lozinke -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <label class="block text-xs font-bold tracking-widest text-slate-700 uppercase">
            Password
          </label>
        </div>
        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
          class="w-full border border-slate-300 rounded-xl px-4 py-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 text-base"/>
      </div>

      <!-- poziva funkciju login -->
      <button
        @click="login"
        class="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base rounded-xl py-4 transition-colors">
        Log in
      </button>

      <!-- ako nemamo račun šalje na signup page-->
      <div class="border-t border-slate-200 mt-8 pt-6 text-center">
        <span class="text-slate-500 text-sm">Don't have an account?</span>
        <RouterLink to="/signup" class="text-blue-500 text-sm hover:underline font-medium">
          Sign up
        </RouterLink>
      </div>
    </div>
  </div>
</template>
