<template>
  <nav>
    <div class="wrapper">
      <div class="content">
        <ul>
          <li
            :class="`${showPlaceList ? 'bg-[#71CDD1] !text-white' : ''}`"
            @click="$store.dispatch('showPlaceList')"
          >
            <img
              class="w-12"
              src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/ffffff/external-world-global-logistics-flatart-icons-outline-flatarticons.png"
            />
            <span>Browse</span>
          </li>
          <li>
            <img src="/singapore.svg" />
            <span>Suggest Attraction</span>
          </li>
          <li>
            <img src="/tv.svg" />
            <span>Videos</span>
          </li>
          <li>
            <img src="/blog.svg" alt="" />
            <span>Blog</span>
          </li>
          <li>
            <img src="/about.svg" alt="" />
            <span>About</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SideBar',
  computed: {
    showPlaceList() {
      return this.$store.state.showPlaceList
    },
  },
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
        @apply flex flex-col space-y-2 items-center text-center p-6 cursor-pointer hover:bg-[#71CDD1] hover:text-white text-[#8197A0] text-sm border-b border-gray-700;
      }
    }
  }
}
</style>
