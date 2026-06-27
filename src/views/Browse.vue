<template>
  <div class="p-8 max-w-7xl mx-auto flex gap-8">

    <main class="flex-1">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <!--dodavanje naslova-->
        <div>
          <h1 class="text-3xl font-bold text-slate-900">Browse Vehicles</h1>
        </div>
        
        <!--dodavanje searchbara-->
        <div class="relative w-full sm:w-80">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
          <input type="text" placeholder="Search cars..." class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </main>

  </div>
</template>

<script setup>

</script>
