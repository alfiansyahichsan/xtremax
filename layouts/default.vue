<template>
  <div class="flex h-screen">
    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="flex h-full">
        <Sidebar />
        <main>
          <Nuxt />
        </main>
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

<style lang="postcss" scoped>
main {
  @apply flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto relative;
}
</style>
