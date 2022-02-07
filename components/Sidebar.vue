<template>
  <nav>
    <div class="wrapper">
      <div class="content">Sidebar</div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SideBar',
}
</script>

<style lang="postcss" scoped>
nav {
  @apply flex w-72 h-full bg-pink-500;
  .wrapper {
    @apply w-full flex mx-auto px-6 py-8;
    .content {
      @apply w-full h-full flex justify-center text-gray-900 text-xl;
    }
  }
}
</style>
