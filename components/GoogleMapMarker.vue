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

  mounted() {
    // eslint-disable-next-line no-undef
    const marker = new google.maps.Marker({
      position: this.marker.position,
      marker: this.marker,
      map: this.map,
    })

    console.log(marker)
  },

  // eslint-disable-next-line vue/require-render-return
  render() {},
}
</script>
