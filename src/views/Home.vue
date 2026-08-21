<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useCompareStore } from '@/stores/compareStore'

const authStore = useAuthStore()
const compareStore = useCompareStore()

// Dohvat top 4 auta po compareu
const trendingCars = computed(() => compareStore.mostComparedCars || [])

// Dohvaćanje slika
const getCarImage = (car) => {
  if (!car) return ''
  if (car.image) return car.image

  const parts = car.name ? car.name.split(' ') : []
  const makeClean = (parts[0] || '').trim().replaceAll(' ', '_')
  const modelClean = parts.slice(1).join(' ').trim().replaceAll(' ', '_')
  const yearClean = car.year_start || ''

  return `/CarPictures/${makeClean}_${modelClean}_${yearClean}.jpg`
}

// Pomoćna funkcija za prikaz cijene
const formatPrice = (car) => {
  const price = car?.msrp_eur ?? car?.price ?? car?.msrp
  if (price !== undefined && price !== null) {
    return `€${price.toLocaleString()}`
  }
  return 'N/A'
}
</script>

<template>
  <div>
    <!-- Hero sekcija -->
    <div 
      class="relative w-full h-125 bg-cover bg-center flex items-center font-sans text-white pl-[8%]"
      style="background-image: url('/HomeBackground.jpeg');"
    >
      <div class="absolute inset-0 bg-linear-to-r from-[#061222]/95 via-[#061222]/65 to-transparent z-10"></div>

      <div class="relative z-20 max-w-xl px-5">
        <p class="text-[#4facfe] text-xs font-semibold tracking-widest mb-4">CAR COMPARISON PLATFORM</p>
        
        <h1 class="text-5xl font-medium leading-tight tracking-tight mb-6">Clear and Simple<br />Car Compare.</h1>
        
        <p class="text-sm text-gray-400 leading-relaxed mb-9">
          Navigate and compare technical specifications of various vehicles in one place. Get accurate and objective data to help you find the perfect car.
        </p>
        <div class="flex gap-4">
          <router-link 
            to="/compare" 
            class="px-7 py-3.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center gap-2 group text-white no-underline"
          >
            Start Comparing
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Trending / Most Compared sekcija -->
    <div class="max-w-7xl mx-auto px-6 lg:px-12 py-16 bg-slate-50">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">Trending Car Models</h2>
          <p class="text-slate-500 text-sm mt-1">Real-time interest data based on technical specification searches.</p>
        </div>

        <div class="inline-flex bg-slate-200/60 p-1 rounded-xl self-start md:self-auto">
          <button class="px-5 py-2 text-sm font-semibold text-white bg-[#0a192f] rounded-lg shadow-sm border-none cursor-default">
            Most Compared
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="car in trendingCars" 
          :key="`${car?.name}-${car?.year_start}`"
          class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div class="relative aspect-video bg-slate-100 overflow-hidden">
              <img 
                :src="getCarImage(car)" 
                :alt="car?.name || 'Car'"
                loading="lazy"
                @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="p-5">
              <h3 class="text-base font-bold text-slate-900">{{ car?.name }}</h3>
              <p class="text-xs text-slate-400 mt-1">{{ car?.body_type || 'Vehicle Model' }}</p>
            </div>
          </div>

          <div class="p-5 pt-0 flex items-center justify-between border-t border-slate-50 mt-2">
            <span class="text-base font-bold text-slate-900">{{ formatPrice(car) }}</span>
            <button 
              @click="compareStore.addCarToCompare(car)"
              class="w-9 h-9 rounded-full border border-slate-300 text-slate-600 hover:text-blue-600 hover:border-blue-600 flex items-center justify-center transition-colors text-lg cursor-pointer bg-transparent"
              title="Add to compare"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
