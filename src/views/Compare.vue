<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

// ako smo ulogirani vraća 4 slota, ako nismo vraća 2
const slotCount = computed(() => authStore.user ? 4 : 2)

</script>


<template>
  <div class="pt-16 px-6 lg:px-16 bg-slate-50 min-h-screen">

    <!-- dodavanje naslova, tekst ovisi o statusu logina -->
    <div class="max-w-2xl mb-12">
      <h1 class="text-4xl font-bold text-slate-900 mb-4">
        Technical Comparison Tool
      </h1>
      <p class="text-slate-500 text-lg leading-relaxed">
        Analyze and compare up to {{ authStore.user ? 'four' : 'two' }} vehicles side-by-side with high-precision technical specifications and performance data.
      </p>
    </div>

    <!-- dodavanje slotova za compare -->
    <div class="flex flex-wrap justify-center gap-8">
      <!-- određujemo koliko će slotova biti -->
      <div
        v-for="i in slotCount"
        :key="i"
        class="w-72 h-80 bg-white border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center cursor-pointer hover:border-blue-600 hover:shadow-lg transition-all group">
        <span class="text-6xl text-slate-300 group-hover:text-blue-600 transition-colors select-none">
          +
        </span>
      </div>
    </div>
    
    <!-- ekstra gumb ispod slotova kao podsjetnik u slućaju da nismo ulogirani -->
    <p v-if="!authStore.user" class="mt-8 text-slate-500 text-sm flex justify-center">
      <router-link to="/login" class="text-blue-600 hover:underline">
        Log in
      </router-link>
        to compare up to 4 vehicles
    </p>
  </div>
</template>
