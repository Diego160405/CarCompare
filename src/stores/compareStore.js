import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCompareStore = defineStore('compare', () => {
  // Držimo fiksno 4 slota, inicijalno prazni (null)
  const selectedCars = ref([null, null, null, null])

  // Funkcija traži prvi slobodan slot u compareu i dodaje auto u njega
  const addCarToCompare = (car) => {
    const freeSlotIndex = selectedCars.value.findIndex(slot => slot === null)
    
    if (freeSlotIndex !== -1) {
      selectedCars.value[freeSlotIndex] = car
      return true // Uspješno dodano
    } else {
      alert('All slots are filled')
      return false
    }
  }

  const clearSlot = (index) => {
    selectedCars.value[index] = null
  }

  return { selectedCars, addCarToCompare, clearSlot }
})
