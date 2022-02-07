<template>
  <div class="flex h-screen bg-red-500">
    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="flex h-full">
        <Sidebar />
        <main
          class="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14"
        >
          <Nuxt />
        </main>
        <!-- <nav class="flex w-72 h-full bg-yellow-400">
          <div class="w-full flex mx-auto px-6 py-8">
            <div
              class="w-full h-full flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed"
            >
              Rightbar
            </div>
          </div>
        </nav> -->
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'DefaultLayout',
  components: { Sidebar },
}
</script>
