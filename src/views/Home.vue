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

// Comparison
const car1 = cars.find(c => c.name === 'Audi A6' && c.year_start === 2019)
const car2 = cars.find(c => c.name === 'Ford Mustang Shelby GT500' && c.year_start === 2020)

const launchRivalry = () => {
  compareStore.clearSlot(0)
  compareStore.clearSlot(1)
  compareStore.clearSlot(2)
  compareStore.clearSlot(3)

  if (car1) compareStore.addCarToCompare(car1)
  if (car2) compareStore.addCarToCompare(car2)

  router.push('/compare')
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

<!-- Featured Comparison -->
    <div class="max-w-7xl mx-auto px-6 lg:px-12 pt-12 bg-white">
      <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        
        <!-- Slike auta -->
        <div class="relative w-full md:w-1/2 h-44 rounded-xl overflow-hidden bg-slate-900 grid grid-cols-2">
          <img :src="getCarImage(car1)" :alt="car1?.name" class="w-full h-full object-cover border-r border-slate-800" />
          <img :src="getCarImage(car2)" :alt="car2?.name" class="w-full h-full object-cover" />
          
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span class="bg-slate-900 text-white text-[11px] font-black px-2.5 py-1 rounded-full border border-slate-700 shadow-md">VS</span>
          </div>
        </div>

        <!-- Informacije i Gumb -->
        <div class="w-full md:w-1/2 flex flex-col justify-center items-start">
          <span class="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">Featured Comparison</span>
          <h3 class="text-xl font-bold text-slate-900 mb-1">Audi A6 (2019) vs Mustang Shelby GT500 (2020)</h3>
          <p class="text-xs text-slate-500 mb-5 leading-relaxed">Executive luxury specs meet track-focused V8 performance.</p>
          
          <button 
            @click="launchRivalry" 
            class="w-full sm:w-auto px-6 py-2.5 bg-[#0a192f] hover:bg-slate-800 text-white font-semibold text-sm rounded-lg transition cursor-pointer"
          >
            Compare These Cars →
          </button>
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
