<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useCompareStore } from '@/stores/compareStore'
import { cars } from '@/cars'

const authStore = useAuthStore()
const compareStore = useCompareStore()

// ako smo ulogirani vraća 4 slota, ako nismo vraća 2
const slotCount = computed(() => authStore.user ? 4 : 2)

// odabrani auti po slotu, sada dolazi iz zajedničkog compareStorea
const selectedCars = compareStore.selectedCars

// koji je slot trenutno otvoren za biranje auta (null = zatvoreno)
const pickerSlot = ref(null)
const searchQuery = ref('')

// spriječava da stavimo auto sa godištem više puta
const usedCars = computed(() =>
  new Set(
    selectedCars
      .filter((car, idx) => car && idx !== pickerSlot.value)
      .map(car => `${car.name}-${car.year_start}`)
  )
)

const filteredCars = computed(() =>
  cars.filter(car =>
    car.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
    !usedCars.value.has(`${car.name}-${car.year_start}`)
  )
)

const openPicker = (slot) => {
  pickerSlot.value = slot
  searchQuery.value = ''
}

const closePicker = () => {
  pickerSlot.value = null
}

// direktno postavlja auto u slot koji je korisnik otvorio
const selectCar = (car) => {
  selectedCars[pickerSlot.value] = car
  closePicker()
}

const clearSlot = (slot) => {
  compareStore.clearSlot(slot)
}

// prikaz jedne godine ili raspona godina, ovisno o tome jesu li se specifikacije mjenjale
const yearLabel = (car) =>
car.year_start === car.year_end ? `${car.year_start}` : `${car.year_start}-${car.year_end}`

// ista logika za slike kao u Browseu - spaja Marku, Model i Godinu u ime datoteke
const getCarImage = (car) => {
  if (car.image) return car.image

  const parts = car.name ? car.name.split(' ') : []
  const makeClean = (parts[0] || '').trim().replaceAll(' ', '_')
  const modelClean = parts.slice(1).join(' ').trim().replaceAll(' ', '_')
  const yearClean = car.year_start || ''

  return `/CarPictures/${makeClean}_${modelClean}_${yearClean}.jpg`
}

// specifikacije koje se prikazuju u kartici auta
const specRows = (car) => [
  ['MSRP', `€${car.msrp_eur.toLocaleString()}`],
  ['Power', `${car.power_kw} kW`],
  ['Torque', `${car.torque_nm} Nm`],
  ['0-100 km/h', `${car.zero_to_100_kmh_sec} s`],
  ['Top speed', `${car.top_speed_kmh} km/h`],
  ['Curb weight', `${car.curb_weight_kg} kg`],
  ['Wheelbase', `${car.wheelbase_mm} mm`],
  ['Fuel capacity', car.fuel_capacity_l > 0 ? `${car.fuel_capacity_l} L` : '—'],
  ['Cargo volume', car.cargo_volume_l > 0 ? `${car.cargo_volume_l} L` : '—'],
  ['Fuel type', car.fuel_type],
  ['Body type', car.body_type],
  ['Drivetrain', car.drivetrain],
]
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
      <div v-for="i in slotCount" 
      :key="i">

        <!-- prazan slot -->
        <div
          v-if="!selectedCars[i - 1]"
          @click="openPicker(i - 1)"
          class="w-72 h-80 bg-white border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center cursor-pointer hover:border-blue-600 hover:shadow-lg transition-all group">
          <span class="text-6xl text-slate-300 group-hover:text-blue-600 transition-colors select-none">
            +
          </span>
        </div>

        <!-- popunjen slot sa specifikacijama -->
        <div v-else class="w-72 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden relative">
          <button
            @click="clearSlot(i - 1)"
            class="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 text-slate-400 hover:text-red-500 text-lg leading-none cursor-pointer border-none shadow-sm">
            ✕
          </button>

          <!-- slika auta, ista logika i stil kao u Browseu -->
          <div class="relative aspect-video bg-slate-100">
            <img
              :src="getCarImage(selectedCars[i - 1])"
              :alt="selectedCars[i - 1].name"
              loading="lazy"
              @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="p-5">
            <h3 class="text-lg font-bold text-slate-900">
              {{ selectedCars[i - 1].name }}
            </h3>
            <p class="text-sm text-slate-400 mb-4">
              {{ yearLabel(selectedCars[i - 1]) }}
            </p>

            <dl class="space-y-1.5">
              <div
                v-for="[label, value] in specRows(selectedCars[i - 1])"
                :key="label"
                class="flex justify-between text-sm">
                <dt class="text-slate-500">
                  {{ label }}
                </dt>
                <dd class="text-slate-800 font-medium">
                  {{ value }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- ekstra gumb ispod slotova kao podsjetnik u slućaju da nismo ulogirani -->
    <p v-if="!authStore.user" class="mt-8 text-slate-500 text-sm flex justify-center">
      <router-link to="/login" class="text-blue-600 hover:underline">
        Log in
      </router-link>
        to compare up to 4 vehicles
    </p>

    <!-- model za biranje auta -->
    <div
      v-if="pickerSlot !== null"
      @click.self="closePicker"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div class="p-4 border-b border-slate-200">
          <input
            v-model="searchQuery"
            type="text"
            autofocus
            placeholder="Search cars..."
            class="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="overflow-y-auto flex-1">
          <button
            v-for="car in filteredCars"
            :key="`${car.name}-${car.year_start}`"
            @click="selectCar(car)"
            class="w-full text-left px-4 py-3 hover:bg-slate-50 border-none bg-transparent cursor-pointer flex justify-between items-center">
            <span class="text-slate-800">
              {{ car.name }}
            </span>
            <span class="text-slate-400 text-sm">
              {{ yearLabel(car) }}
            </span>
          </button>
          <p v-if="!filteredCars.length" class="text-center text-slate-400 py-8 text-sm">
            No cars found.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
