<template>
  <div class="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      
      <aside class="w-full md:w-64 shrink-0 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm h-fit">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-bold text-slate-950 uppercase tracking-wide">Filters</h2>
          <button @click="resetFilters" class="text-sm font-semibold text-blue-600 hover:underline">Reset All</button>
        </div>
      <div class="space-y-5">
          <div>
            <label :class="labelStyle">Make</label>
            <select v-model="filters.make" :class="inputStyle">
              <option value="">All Makes</option>
              <option v-for="m in uniqueMakes" :key="m" :value="m">{{ m }}</option>
            </select>
          </div>
      <div>
            <label :class="labelStyle">Model</label>
            <select v-model="filters.model" :class="inputStyle" :disabled="!filters.make">
              <option value="">All Models</option>
              <option v-for="m in availableModels" :key="m" :value="m">{{ m }}</option>
            </select>
          </div>
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
      <div>
            <label :class="labelStyle">Body Style</label>
            <div class="grid grid-cols-2 gap-2">
              <button v-for="s in ['Sedan', 'SUV', 'Coupe', 'Convertible']" :key="s" @click="toggleBodyStyle(s)" type="button"
                :class="['px-3 py-2 text-xs font-semibold rounded-full border transition-all text-center', 
                  filters.bodyStyles.includes(s) ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50']">
                {{ s }}
              </button>
            </div>
          </div>

<div>
  <label :class="labelStyle">Price Range (€)</label>
  <div class="flex gap-2 items-center">
    <input 
      type="number" 
      min="0" 
      placeholder="Min" 
      v-model.number="filters.priceMin" 
      @keydown="preventInvalid"
      :class="inputStyle" 
    />
    <span class="text-slate-400 font-bold">-</span>
    <input 
      type="number" 
      min="0" 
      placeholder="Max" 
      v-model.number="filters.priceMax" 
      @keydown="preventInvalid"
      :class="inputStyle" 
    />
  </div>
</div>

          <button @click="applyFilters" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            Apply Filters
          </button>
        </div>
      </aside>

      <main class="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div class="mb-5">
            <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Browse Vehicles</h1>
            <p class="text-sm text-slate-500 mt-1">Showing {{ sortedCars.length }} vehicles</p>
          </div>

          <div class="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <div class="relative flex-1">
              <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </span>
              <input v-model="filters.search" type="text" placeholder="Search by make, model..." class="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
            </div>
            
            <div class="flex items-center gap-2 sm:w-64 shrink-0">
              <select v-model="sortBy" class="w-full text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all">
                <option value="hp-desc">Horsepower: High to Low</option>
                <option value="hp-asc">Horsepower: Low to High</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Year: Newest</option>
                <option value="year-asc">Year: Oldest</option>
              </select>
            </div>
          </div>

          <div v-if="paginatedCars.length > 0" class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div v-for="car in paginatedCars" :key="car.id" class="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div class="relative aspect-video bg-slate-100">
                  <img
                    :src="car.image"
                    :alt="car.model"
                    loading="lazy"
                    @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'"
                    class="w-full h-full object-cover"
                  />
                </div>
                
                <div class="p-5">
                  <div class="flex justify-between items-start gap-2">
                    <div>
                      <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">{{ car.year }}</span>
                      <h3 class="text-xl font-bold text-slate-900 mt-0.5 leading-tight">{{ car.make }} {{ car.model }}</h3>
                    </div>
                    <div class="text-right shrink-0">
                      <span class="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Starting At</span>
                      <span class="text-lg font-extrabold text-slate-900">€{{ Number(car.price || 0).toLocaleString('de-DE') }}</span>
                    </div>
                  </div>

                  <div class="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-100 text-center">
                    <div>
                      <span class="text-[11px] font-medium text-slate-400 block mb-1">0-100 km/h</span>
                      <span class="font-bold text-slate-800 text-sm">{{ car.acceleration || 'N/A' }}s</span>
                    </div>
                    <div>
                      <span class="text-[11px] font-medium text-slate-400 block mb-1">Power</span>
                      <span class="font-bold text-slate-800 text-sm">{{ car.power || 'N/A' }} kW</span>
                    </div>
                    <div>
                      <span class="text-[11px] font-medium text-slate-400 block mb-1">Drivetrain</span>
                      <span class="font-bold text-slate-800 text-sm uppercase">{{ car.drivetrain || 'N/A' }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-5 pt-0 flex gap-2">
                <button @click="openDetails(car)" class="flex-1 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 text-sm shadow-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/><circle cx="12" cy="12" r="3"/></svg>
                  Details
                </button>
                <button @click="compareStore.addCarToCompare(car.original)" class="flex-1 py-2.5 border border-blue-200 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5 text-sm shadow-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                  Add to Compare
                </button>
              </div>
            </div>
          </div>

          <div v-else class="mt-8 bg-white border border-slate-200 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center text-slate-400 shadow-sm">
            <p class="text-base font-semibold">No vehicles match your criteria.</p>
          </div>
        </div>

        <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-1.5">
          <button @click="currentPage--" :disabled="currentPage === 1" class="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-600 transition shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>

          <template v-for="page in visiblePages" :key="page">
            <span v-if="page === '...'" class="w-10 h-10 flex items-center justify-center text-slate-400 font-bold">...</span>
            <button v-else @click="currentPage = page" :class="['w-10 h-10 font-bold text-sm rounded-xl transition shadow-sm', currentPage === page ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50']">
              {{ page }}
            </button>
          </template>

          <button @click="currentPage++" :disabled="currentPage === totalPages" class="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-600 transition shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </main>

    </div>

    <!-- detalji auta -->
    <div
      v-if="detailsCar"
      @click.self="closeDetails"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto relative">
        <button
          @click="closeDetails"
          class="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-slate-400 hover:text-red-500 text-lg leading-none cursor-pointer border-none shadow-sm">
          ✕
        </button>

        <div class="relative aspect-video bg-slate-100">
          <img
            :src="detailsCar.image"
            :alt="detailsCar.model"
            @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="p-6">
          <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">{{ detailsCar.year }}</span>
          <h3 class="text-2xl font-bold text-slate-900 mt-0.5 mb-4">{{ detailsCar.make }} {{ detailsCar.model }}</h3>

          <dl class="space-y-1.5">
            <div
              v-for="[label, value] in detailSpecs(detailsCar.original)"
              :key="label"
              class="flex justify-between text-sm py-1.5 border-b border-slate-50 last:border-0">
              <dt class="text-slate-500">{{ label }}</dt>
              <dd class="text-slate-800 font-medium">{{ value }}</dd>
            </div>
          </dl>

          <button
            @click="compareStore.addCarToCompare(detailsCar.original); closeDetails()"
            class="w-full mt-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 text-sm shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
            Add to Compare
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { cars as localCars } from '@/cars'
import { useCompareStore } from '@/stores/compareStore' 

const compareStore = useCompareStore()

defineEmits(['add-to-compare'])

const labelStyle = 'block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5'
const inputStyle = 'w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

const currentYear = new Date().getFullYear()
const years = computed(() => Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i))
const sortBy = ref('hp-desc')

// spriječava unos minusa, plusa i slova e u price inpute
const preventInvalid = (e) => ['-', '+', 'e', 'E'].includes(e.key) && e.preventDefault()

// auto čiji se detalji trenutno prikazuju
const detailsCar = ref(null)
const openDetails = (car) => { detailsCar.value = car }
const closeDetails = () => { detailsCar.value = null }

// pune specifikacije auta s detaljima
const detailSpecs = (originalCar) => [
  ['MSRP', `€${Number(originalCar.msrp_eur || 0).toLocaleString('de-DE')}`],
  ['Power', `${originalCar.power_kw} kW`],
  ['Torque', `${originalCar.torque_nm} Nm`],
  ['0-100 km/h', `${originalCar.zero_to_100_kmh_sec} s`],
  ['Top speed', `${originalCar.top_speed_kmh} km/h`],
  ['Curb weight', `${originalCar.curb_weight_kg} kg`],
  ['Wheelbase', `${originalCar.wheelbase_mm} mm`],
  ['Fuel capacity', originalCar.fuel_capacity_l > 0 ? `${originalCar.fuel_capacity_l} L` : '—'],
  ['Cargo volume', originalCar.cargo_volume_l > 0 ? `${originalCar.cargo_volume_l} L` : '—'],
  ['Fuel type', originalCar.fuel_type],
  ['Body type', originalCar.body_type],
  ['Drivetrain', originalCar.drivetrain],
]

// funkcija koja automatski spaja Marku, Model i Godinu u ime datoteke za automatsko prikazivanje slika u browseu
const getCarImage = (car) => {
  if (car.image) return car.image

  const makeClean = (car.make || '').trim().replaceAll(' ', '_')
  const modelClean = (car.model || '').trim().replaceAll(' ', '_')
  const yearClean = car.year || ''

  return `/CarPictures/${makeClean}_${modelClean}_${yearClean}.jpg`
}

// iščitava sve aute kada nema filtera ni pretrage
const allCars = computed(() => {
  return localCars.map((car, index) => {
    const parts = car.name ? car.name.split(' ') : []
    const mappedBodyStyle = ['hatchback', 'wagon'].includes(car.body_type?.toLowerCase()) ? 'Sedan' : car.body_type
    
    const make = parts[0] || 'Unknown'
    const model = parts.slice(1).join(' ') || 'Model'
    const year = car.year_start

    const formattedCar = {
      id: car.id || index,
      make,
      model,
      year,
      price: car.msrp_eur,
      acceleration: car.zero_to_100_kmh_sec,
      power: car.power_kw,
      drivetrain: car.drivetrain,
      bodyStyle: mappedBodyStyle,
      original: car 
    }

    formattedCar.image = car.image || getCarImage(formattedCar)

    return formattedCar
  })
})

  //defualtni filteri
const defaultFilters = () => ({ search: '', make: '', model: '', yearMin: null, yearMax: null, bodyStyles: [], priceMin: null, priceMax: null })
const filters = ref(defaultFilters())
const activeFilters = ref(defaultFilters())
const currentPage = ref(1)
const itemsPerPage = 10 

const uniqueMakes = computed(() => [...new Set(allCars.value.map(c => c.make))].sort())
const availableModels = computed(() => filters.value.make ? [...new Set(allCars.value.filter(c => c.make === filters.value.make).map(c => c.model))].sort() : [])

watch(() => filters.value.make, () => filters.value.model = '')
watch(() => filters.value.search, (val) => { activeFilters.value.search = val; currentPage.value = 1 })

  //odabir karoserije sa toggle
const toggleBodyStyle = (s) => {
  const i = filters.value.bodyStyles.indexOf(s)
  i > -1 ? filters.value.bodyStyles.splice(i, 1) : filters.value.bodyStyles.push(s)
}

//dodavanje i micanje filtera
const resetFilters = () => { filters.value = defaultFilters(); activeFilters.value = defaultFilters(); currentPage.value = 1 }
const applyFilters = () => { activeFilters.value = JSON.parse(JSON.stringify(filters.value)); currentPage.value = 1 }

const filteredCars = computed(() => {
  return allCars.value.filter(car => {
    if (activeFilters.value.search && !`${car.make} ${car.model}`.toLowerCase().includes(activeFilters.value.search.toLowerCase())) return false
    if (activeFilters.value.make && car.make !== activeFilters.value.make) return false
    if (activeFilters.value.model && car.model !== activeFilters.value.model) return false
    if (activeFilters.value.yearMin && car.year < activeFilters.value.yearMin) return false
    if (activeFilters.value.yearMax && car.year > activeFilters.value.yearMax) return false
    if (activeFilters.value.bodyStyles.length && !activeFilters.value.bodyStyles.includes(car.bodyStyle)) return false
    if (activeFilters.value.priceMin !== null && activeFilters.value.priceMin !== '' && car.price < activeFilters.value.priceMin) return false
    if (activeFilters.value.priceMax !== null && activeFilters.value.priceMax !== '' && car.price > activeFilters.value.priceMax) return false
    return true
  })
})

//sortiranje auti
const sortedCars = computed(() => {
  return [...filteredCars.value].sort((a, b) => {
    if (sortBy.value === 'hp-desc') return b.power - a.power
    if (sortBy.value === 'hp-asc') return a.power - b.power
    if (sortBy.value === 'price-asc') return a.price - b.price
    if (sortBy.value === 'price-desc') return b.price - a.price
    if (sortBy.value === 'year-desc') return b.year - a.year
    if (sortBy.value === 'year-asc') return a.year - b.year
    return 0
  })
})

//paginacija, kako će se prikazivatai dio za listanje na dnu
const totalPages = computed(() => Math.ceil(sortedCars.value.length / itemsPerPage) || 1)
const paginatedCars = computed(() => sortedCars.value.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage))

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = [1]
  if (current <= 4) {
    pages.push(2, 3, 4, 5, '...', total)
  } else if (current >= total - 3) {
    pages.push('...')
    for (let i = total - 4; i <= total; i++) pages.push(i)
  } else {
    pages.push('...', current - 1, current, current + 1, '...', total)
  }
  return pages
})
</script>
