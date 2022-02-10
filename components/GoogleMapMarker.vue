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
      markerDefault: {
        icon: {
          url: '/pin-point.png',
          // eslint-disable-next-line no-undef
          scaledSize: new google.maps.Size(60, 60), // scaled size
          // eslint-disable-next-line no-undef
          labelOrigin: new google.maps.Point(16, 9),
        },
        label: {
          text: this.marker.id,
          color: 'white',
          fontSize: '12px',
          className:
            'bg-black px-3 py-2 absolute left-0 rounded-l-full text-left',
        },
      },

      markerOnHover: {
        icon: {
          url: '/pin-point.png',
          // eslint-disable-next-line no-undef
          scaledSize: new google.maps.Size(90, 90), // scaled size
          // eslint-disable-next-line no-undef
          labelOrigin: new google.maps.Point(16, 15),
        },
        label: {
          text: `${this.marker.id}` + `${this.marker.headline}`,
          color: 'white',
          fontSize: '12px',
          className:
            'bg-[#92D72D] px-3 py-2 absolute left-0 rounded-l-full text-left',
        },
      },
    }
  },

  computed: {
    currentMarkerFocus() {
      return this.$store.state.currentMarkerFocus
    },
  },

  // watch: {
  //   currentMarkerFocus(val) {
  //     console.log(val)
  //   },
  // },

  mounted() {
    // eslint-disable-next-line no-undef
    this.markerContent = new google.maps.Marker({
      position: this.marker.position,
      marker: this.marker,
      map: this.map,
      ...this.markerDefault,
    })

    this.markerContent.addListener('mouseover', () => {
      this.markerContent.setOptions(this.markerOnHover)
    })

    this.markerContent.addListener('mouseout', () => {
      this.markerContent.setOptions(this.markerDefault)
    })

    this.markerContent.addListener('click', async (e) => {
      this.markerContent.setOptions(this.markerOnHover)
      await this.onClickMarker(e.latLng.lat(), e.latLng.lng())
    })
  },

  methods: {
    markerOptions() {},

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
