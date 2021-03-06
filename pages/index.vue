<template>
  <div class="wrapper">
    <GoogleMapLoader :map-config="mapConfig">
      <!-- MAP SLOT -->
      <template slot-scope="{ map }">
        <div class="content">
          <transition name="slide-fade">
            <PlaceLists v-if="showPlaceList" :map="map" />
          </transition>

          <div class="header">
            <h2>TOP-RATED TOURIST ATTRACTIONS IN SINGAPORE</h2>
            <div class="ml-auto flex flex-row space-x-4 items-center">
              <img
                class="w-8 h-8 cursor-pointer"
                src="https://img.icons8.com/ios-filled/50/647D7F/settings.png"
              />
              <img
                class="w-8 h-8 cursor-pointer"
                src="https://img.icons8.com/ios-filled/50/647D7F/help.png"
              />
              <img
                class="w-8 h-8 cursor-pointer"
                src="https://img.icons8.com/ios-filled/50/647D7F/xbox-x.png"
                @click="clear"
              />
            </div>
          </div>

          <!-- ADD MARKER -->
          <GoogleMapMarker
            v-for="marker in markers"
            ref="googleMarker"
            :key="marker.id"
            :marker="marker"
            :map="map"
          />

          <transition name="slide-fade">
            <PlaceDescription />
          </transition>
        </div>
      </template>
    </GoogleMapLoader>
  </div>
</template>

<script>
import { mapSettings } from '../constants/mapSettings'
import GoogleMapLoader from '../components/GoogleMapLoader.vue'
import GoogleMapMarker from '../components/GoogleMapMarker.vue'
import PlaceLists from '../components/PlaceLists.vue'
import PlaceDescription from '../components/PlaceDescription.vue'

export default {
  name: 'IndexPage',
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    PlaceLists,
    PlaceDescription,
  },

  computed: {
    // GET LIST OF POSITIONS
    markers() {
      return this.$store.state.markers
    },

    currentMarkerFocus() {
      return this.$store.state.currentMarkerFocus
    },

    showPlaceList() {
      return this.$store.state.showPlaceList
    },

    mapConfig() {
      return {
        ...mapSettings,
        center: {
          lat: this.currentMarkerFocus.position.lat,
          lng: this.currentMarkerFocus.position.lng,
        },
        zoom: this.currentMarkerFocus.zoom,
      }
    },
  },

  async mounted() {
    await this.$store.dispatch('getLocations')
  },

  methods: {
    clear() {
      this.$store.dispatch('setMapDefault', true)
    },
  },
}
</script>

<style lang="postcss" scoped>
.wrapper {
  @apply relative w-full h-screen;
  .content {
    @apply flex flex-row h-full w-full;
    .header {
      @apply bg-[#F4F7FA] right-0 w-full h-28 z-10 py-5 px-10 flex flex-row items-center justify-between;
      h2 {
        @apply font-extrabold text-xl;
      }
    }
  }
}
</style>
