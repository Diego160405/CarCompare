<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

// Registracija korisnika i preusmjeravanje na početnu stranicu ako nema greške
const signup = async () => {
  await authStore.register(email.value, password.value)
  if (!authStore.error) {
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 w-full max-w-lg px-10 py-12">

      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">
          Sign up
        </h1>
        <p class="text-slate-500 text-base">
          Create a CarCompare account
        </p>
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
        <label class="block text-xs font-bold tracking-widest text-slate-700 uppercase mb-2">
          Password
        </label>
        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
          class="w-full border border-slate-300 rounded-xl px-4 py-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 text-base"/>
        <p class="text-slate-400 text-xs mt-1">
          Min. 6 characters
        </p>
      </div>

      <!-- poziva funkciju signup -->
      <button
        @click="signup"
        class="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base rounded-xl py-4 transition-colors">
        Sign up
      </button>

      <!-- šalje na login page ako imamo korisnički račun -->
      <div class="border-t border-slate-200 mt-8 pt-6 text-center">
        <span class="text-slate-500 text-sm">
          Already have an account?
        </span>
        <RouterLink to="/login" class="text-blue-500 text-sm hover:underline font-medium">
          Login
        </RouterLink>
      </div>
    </div>
  </div>
</template>
