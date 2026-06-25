<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

</script>

<template>

  <div>
    <div
      class="w-full bg-cover bg-center flex items-center"
      style="height: 768px; background-image: url(
        '/HomeBackground.jpeg');">
      <div class="ml-16 max-w-lg flex flex-col gap-4">
        <h1 class="text-5xl font-bold text-white">
          Naslov
        </h1>
        <p class="text-lg text-white/80">
          Opis ili podnaslov koji želiš ovdje staviti.
        </p>
      </div>
    </div>
  </div>
</template>
