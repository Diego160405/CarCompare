<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

</script>

<template>

  <div>
    <div 
      class="relative w-full h-192 bg-cover bg-center flex items-center font-sans text-white pl-[8%]"
      style="background-image: url('/HomeBackground.jpeg');"
    >
      <div class="absolute inset-0 bg-linear-to-r from-[#061222]/95 via-[#061222]/65 to-transparent z-1"></div>

      <div class="relative z-10 max-w-155 px-5">
        // dodavanje naslova, podnaslova i opisa
        <p class="text-[#4facfe] text-xs font-semibold tracking-widest mb-4">CAR COMPARISON PLATFORM</p>
        
        <h1 class="text-5xl font-medium leading-tight tracking-tight mb-6">Clear and Simple<br />Car Compare.</h1>
        
        <p class="text-sm text-gray-400 leading-relaxed mb-9">
          Navigate and compare technical specifications of various vehicles in one place. Get accurate and objective data to help you find the perfect car.
        </p>
        <div class="flex gap-4">
          // gumb koji vodi na compare 
          <router-link 
            to="/compare" 
            class="px-7 py-3.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center gap-2 group"
          >
            Start Comparing
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
