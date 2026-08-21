import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { cars } from '@/cars'
import { db } from '@/firebase'
import { doc, setDoc, increment, collection, onSnapshot } from 'firebase/firestore'

export const useCompareStore = defineStore('compare', () => {
  const selectedCars = ref([null, null, null, null])
  const compareCounts = ref({})

  // Dohvaćanje spremljenih brojača iz Firestore baze da vidimo koji je most compared auto
  onMounted(() => {
    try {
      const statsRef = collection(db, 'carStats')
      onSnapshot(statsRef, (snapshot) => {
        const counts = {}
        snapshot.forEach((docSnap) => {
          counts[docSnap.id] = docSnap.data().compareCount || 0
        })
        compareCounts.value = counts
      }, (e) => {
        console.warn('Greska pri dohvacanju iz Firestorea:', e)
      })
    } catch (e) {
      console.warn('Firestore nije spreman:', e)
    }
  })

  // Povećava brojač u Firestoreu za most compared sekciju
  const trackComparison = async (car) => {
    if (!car || !car.name) return
    const key = `${car.name}-${car.year_start || ''}`.replaceAll('/', '_')
    const carRef = doc(db, 'carStats', key)

    try {
      await setDoc(carRef, {
        name: car.name,
        compareCount: increment(1)
      }, { merge: true })
    } catch (e) {
      console.error('Greska pri spramanju u Firebase:', e)
    }
  }

  const addCarToCompare = (car) => {
    if (!car) return false

    // Provjera da auto već nije dodan
    const isAlreadyAdded = selectedCars.value.some(
      slot => slot && slot.name === car.name && slot.year_start === car.year_start
    )

    if (isAlreadyAdded) {
      alert('This car is already added to compare!')
      return false
    }

    const freeSlotIndex = selectedCars.value.findIndex(slot => slot === null)
    
    if (freeSlotIndex !== -1) {
      selectedCars.value[freeSlotIndex] = car
      trackComparison(car)
      return true
    } else {
      alert('All slots are filled')
      return false
    }
  }

  const clearSlot = (index) => {
    selectedCars.value[index] = null
  }

  // Dohvaća most compared modele 
  const mostComparedCars = computed(() => {
    if (!cars || !Array.isArray(cars) || cars.length === 0) return []
    
    const hasData = Object.keys(compareCounts.value).length > 0
    
    if (!hasData) {
      return cars.slice(0, 4)
    }

    return [...cars].sort((a, b) => {
      const keyA = `${a.name}-${a.year_start || ''}`.replaceAll('/', '_')
      const keyB = `${b.name}-${b.year_start || ''}`.replaceAll('/', '_')
      const countA = compareCounts.value[keyA] || 0
      const countB = compareCounts.value[keyB] || 0
      return countB - countA
    }).slice(0, 4)
  })

  return { selectedCars, addCarToCompare, clearSlot, mostComparedCars, trackComparison }
})
