<script>
export default {
  props: {
    map: {
      type: Object,
      required: true,
    },
    marker: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      markerContent: null,
    }
  },

  computed: {
    currentMarkerFocus() {
      return this.$store.state.currentMarkerFocus
    },
  },

  watch: {
    currentMarkerFocus(val) {
      // SET MARKER ON GREEN
      this.markerContent.setOptions(
        this.markerOptions(val.id === this.marker.id)
      )
    },
  },

  mounted() {
    this.markerContent = new google.maps.Marker({
      position: this.marker.position,
      marker: this.marker,
      map: this.map,
      ...this.markerOptions(false),
    })

    this.markerContent.addListener('mouseover', () => {
      this.markerContent.setOptions(this.markerOptions(true))
    })

    this.markerContent.addListener('mouseout', () => {
      // CHECK CURRENT MARKER FOCUS ID WITH THIS MARKER ID
      // IF EQUAL, SET TO TRUE
      // SET MARKER INTO THE GREEN ONE
      this.markerContent.setOptions(
        this.markerOptions(this.currentMarkerFocus.id === this.marker.id)
      )
    })

    this.markerContent.addListener('click', async (e) => {
      await this.onClickMarker(e.latLng.lat(), e.latLng.lng())
    })
  },

  methods: {
    markerOptions(scale) {
      const scaledSize = scale ? 90 : 60
      const pointTop = scale ? 15 : 9
      const bgLabel = scale ? 'bg-[#92D72D]' : 'bg-black'

      return {
        icon: {
          url: '/pin-point.png',
          scaledSize: new google.maps.Size(scaledSize, scaledSize),
          labelOrigin: new google.maps.Point(16, pointTop),
        },
        label: {
          text: scale
            ? `${this.marker.id}` + `\n` + `${this.marker.headline}`
            : `${this.marker.id}`,
          color: 'white',
          fontSize: '12px',
          className: `${bgLabel} px-3 py-2 absolute left-0 rounded-l-full text-left`,
        },
      }
    },

    async onClickMarker(lat, lng) {
      await this.$store.dispatch('setMarkerItsContent', {
        ...this.marker,
        zoom: 17,
      })

      await this.$store.dispatch('getPlaceDetail', {
        name: this.marker.id,
        lat,
        lng,
        map: this.map,
      })
    },
  },

  // eslint-disable-next-line vue/require-render-return
  render() {},
}
</script>

<style scoped>
.gm-style-iw {
  background-color: rgb(237, 28, 36);
  border: 1px solid rgba(72, 181, 233, 0.6);
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(178, 178, 178, 0.6);
  color: rgb(255, 255, 255) !important;
  font-family: gothambook;
  text-align: center;
  top: 15px !important;
  width: 150px !important;
}
</style>
