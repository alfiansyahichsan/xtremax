<template>
  <nav>
    <div class="wrapper">
      <div class="content">
        <ul>
          <li>
            <span>img</span>
            <span>Browser</span>
          </li>
          <li>2</li>
        </ul>
      </div>
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
  @apply flex w-36 h-full bg-[#313541];
  .wrapper {
    @apply w-full flex mx-auto;
    .content {
      @apply w-full h-full justify-center text-gray-900 text-xl block;

      li {
        @apply flex flex-col space-y-2 items-center p-4 bg-blue-200 mb-2;
      }
    }
  }
}
</style>
