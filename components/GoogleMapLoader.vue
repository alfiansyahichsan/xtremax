<template>
  <div>
    <div ref="googleMap" class="google-map"></div>
    <template v-if="Boolean(map)">
      <slot :map="map" />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    mapConfig: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      map: null,
    }
  },

  // INIT MAPS FROM THIS COMPONENT
  // API KEY SHOULD BE FROM ENV
  head() {
    return {
      script: [
        {
          src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBcuQe02OaUNoz1Yj1z5erOSTOyuprCY5o&libraries=places&v=weekly',
          defer: true,
        },
      ],
    }
  },

  async mounted() {
    await this.initMap()
  },

  methods: {
    // INITIALIZE GOOGLE MAPS APIS
    initMap() {
      // eslint-disable-next-line no-undef
      this.map = new google.maps.Map(this.$refs.googleMap, this.mapConfig)
    },
  },
}
</script>

<style lang="postcss" scoped>
.google-map {
  @apply w-full h-screen;
}
</style>
