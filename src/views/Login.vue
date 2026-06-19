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
  <div class="page">
    <div class="card">
      <h1>Prijava</h1>
      <p class="subtitle">Dobrodošli nazad!</p>

      <div v-if="loggedIn" class="text-lime-400 font-semibold rounded-md px-4 py-2 mb-3">
        Uspješno ste se prijavili!
      </div>

      <div v-if="loggedOut" class="text-red-500 font-semibold rounded-md px-4 py-2 mb-3">
        Uspješno ste se odjavili!
      </div>

      <div v-if="authStore.error" class="error-msg text-red-500">
        {{ authStore.error }}
      </div>

      <div class="form-group">
        <input v-model="email" type="email" placeholder="Email adresa" />
        <input v-model="password" type="password" placeholder="Lozinka" />
        <button class="btn btn-primary" @click="login">Prijavi se</button>
      </div>

      <div class="divider">Nemaš račun?</div>
      <RouterLink to="/signup">
        <button class="btn btn-ghost" style="width:100%">Registriraj se</button>
      </RouterLink>
    </div>
  </div>
</template>