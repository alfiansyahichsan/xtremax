<template>
  <div class="navigation">
    <div v-if="loading">fetching</div>
    <template v-else>
      <div class="filter">Filter by favorite</div>
      <div class="mt-8 flex flex-col">
        <div v-for="(marker, index) in markers" :key="index">
          <button
            :class="`${
              currentMarkerFocus.id == marker.id ? 'bg-gray-900' : ''
            }`"
            @click="
              !marker.child.length ? focusOnMarker(marker) : showNavChild(index)
            "
          >
            <span
              :class="
                currentMarkerFocus.id == marker.id ? 'text-green-400' : ''
              "
              >{{ marker.id }}</span
            >
            <span
              v-if="marker.child.length"
              :class="childNav.includes(index) ? 'transform rotate-180' : ''"
              >&#9660;</span
            >
          </button>
          <div
            v-if="childNav.includes(index)"
            class="pl-5 flex flex-col space-y-4 pt-2 pb-4"
          >
            <a
              v-for="(item, x) in marker.child"
              :key="x"
              :class="`cursor-pointer text-gray-600 ${
                currentMarkerFocus.id == item.id ? 'text-green-400' : ''
              }`"
              @click="focusOnMarker(item)"
              >{{ item.id }}</a
            >
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    map: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      childNav: [],
    }
  },

  computed: {
    // GET FETCH LOADING STATUS
    loading() {
      return this.$store.state.loading
    },

    markers() {
      return this.$store.state.markers
    },

    currentMarkerFocus() {
      return this.$store.state.currentMarkerFocus
    },
  },

  methods: {
    async focusOnMarker(marker) {
      await this.$store.dispatch('setMarkerItsContent', { ...marker, zoom: 17 })
      await this.$store.dispatch('getPlaceDetail', {
        name: marker.id,
        lat: marker.position.lat,
        lng: marker.position.lng,
        map: this.map,
      })
    },

    showNavChild(index) {
      if (!this.childNav.length) {
        this.childNav.push(index)
        return
      }

      if (this.childNav.includes(index)) {
        this.childNav.splice(this.childNav.indexOf(index), 1)
      } else {
        this.childNav.push(index)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.navigation {
  @apply relative top-0 left-0 w-80 bg-[#282C37] text-gray-200 text-sm px-5 py-8 h-full;
  .filter {
    @apply border border-gray-700 px-4 py-2 w-full text-gray-400;
  }
  .list {
    @apply cursor-pointer border-t p-4 border-gray-700 flex flex-row justify-between items-center;
  }

  button {
    @apply w-full flex justify-between items-center font-semibold hover:bg-gray-900 p-3;
  }
}
</style>
