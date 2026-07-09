<template>
  <div class="p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
    
    <aside class="w-full md:w-64 shrink-0 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-fit">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-slate-900">Filters</h2>
        <button @click="resetFilters" class="text-sm font-semibold text-blue-600 hover:underline">Reset All</button>
      </div>
<!--marka auta-->
      <div class="space-y-6">
        <div>
          <label :class="labelStyle">Make</label>
          <select v-model="filters.make" :class="inputStyle">
            <option value="">All Makes</option>
            <option v-for="i in 3" :key="i" :value="'make_' + i">Option {{ i }}</option>
          </select>
        </div>
<!--model auta-->
        <div>
          <label :class="labelStyle">Model</label>
          <select v-model="filters.model" :class="inputStyle">
            <option value="">All Models</option>
            <option v-for="i in 2" :key="i" :value="'model_' + i">Option {{ i }}</option>
          </select>
        </div>
<!--godište-->
        <div>
          <label :class="labelStyle">Year Range</label>
          <div class="flex gap-2">
            <select v-model="filters.yearMin" :class="[inputStyle, 'text-sm px-2']">
              <option :value="null">Min</option>
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
            <select v-model="filters.yearMax" :class="[inputStyle, 'text-sm px-2']">
              <option :value="null">Max</option>
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
        </div>
<!--body style-->
        <div>
          <label :class="labelStyle">Body Style</label>
          <div class="grid grid-cols-2 gap-2">
            <button 
              v-for="style in ['Sedan', 'SUV', 'Coupe', 'Convertible']" :key="style"
              @click="toggleBodyStyle(style)"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-full transition-colors border',
                filters.bodyStyles.includes(style) ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 hover:border-slate-300 text-slate-600'
              ]"
            >
              {{ style }}
            </button>
          </div>
        </div>
<!--cijena-->
        <div>
          <label :class="labelStyle">Price Range</label>
          <input type="range" min="20000" max="150000" v-model="filters.priceMax" class="w-full accent-blue-600" />
          <div class="flex justify-between text-xs font-semibold text-slate-500 mt-1">
            <span>€20k</span>
            <span>Max: €{{ (filters.priceMax / 1000).toFixed(0) }}k</span>
          </div>
        </div>
<!--apply filter gumb-->
        <button @click="applyFilters" class="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
          Apply Filters
        </button>
      </div>
    </aside>

    <main class="flex-1">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-slate-900">Browse Vehicles</h1>
          <p class="text-sm text-slate-500 mt-1">Technical specifications</p>
        </div>
        
        <div class="relative w-full sm:w-80">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </span>
          <input type="text" v-model="filters.search" placeholder="Search cars..." class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div class="mt-8 border-2 border-dashed border-slate-200 rounded-2xl h-96 flex items-center justify-center text-slate-400">
        Tu će doći automobili
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Tailwind varijable
const labelStyle = 'block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2'
const inputStyle = 'w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500'

// Generiranje popisa godina
const years = computed(() => Array.from({ length: 2026 - 1990 + 1 }, (_, i) => 2026 - i))

// Početne vrijednosti filtera
const defaultFilters = () => ({
  search: '',
  make: '',
  model: '',
  yearMin: null,
  yearMax: null,
  bodyStyles: [],
  priceMax: 150000
})

// Reaktivno stanje filtera
const filters = ref(defaultFilters())

// Odabir više stilova auta
const toggleBodyStyle = (style) => {
  const index = filters.value.bodyStyles.indexOf(style)
  index > -1 ? filters.value.bodyStyles.splice(index, 1) : filters.value.bodyStyles.push(style)
}

// Resetiranje svih filtera
const resetFilters = () => { filters.value = defaultFilters() }

// Apply filtera
const applyFilters = () => { console.log('Filteri:', { ...filters.value }) }
</script>
