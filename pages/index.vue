<template>
  <GoogleMapLoader :map-config="mapConfig">
    <template slot-scope="{ map }">
      <GoogleMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :map="map"
      />
    </template>
  </GoogleMapLoader>
</template>

<script>
import { mapSettings } from '../constants/mapSettings'
import GoogleMapLoader from '../components/GoogleMapLoader.vue'
import GoogleMapMarker from '../components/GoogleMapMarker.vue'
export default {
  name: 'IndexPage',
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
  },

  data() {
    return {
      markers: [
        {
          id: 'Merlion',
          position: { lat: 1.28692, lng: 103.85457 },
        },
        {
          id: 'Asian Civilisations Museum',
          position: { lat: 1.287466, lng: 103.851424 },
        },
        {
          id: 'Clarke Quay',
          position: { lat: 1.290555, lng: 103.846188 },
        },
        {
          id: 'Fort Canning Park',
          position: { lat: 1.295526, lng: 103.845331 },
        },
        {
          id: 'Orchard Road',
          position: { lat: 1.302279, lng: 103.837399 },
        },
        {
          id: 'Singapore Flyer',
          position: { lat: 1.289332, lng: 103.863152 },
        },
        {
          id: 'Marina Bay Sands',
          position: { lat: 1.283099, lng: 103.860295 },
        },
        {
          id: 'Gardens By The Bay',
          position: { lat: 1.28179, lng: 103.863954 },
        },
        {
          id: 'Chinatown',
          position: { lat: 1.284193, lng: 103.843362 },
        },
      ],
    }
  },

  computed: {
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter,
      }
    },

    mapCenter() {
      return this.markers[0].position
    },
  },
}
</script>
