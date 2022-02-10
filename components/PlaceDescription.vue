<template>
  <div
    v-if="Object.keys(placeDetail).length"
    class="right-0 bg-gray-600 absolute top-0 h-full pt-20 max-w-sm shadow-xl"
  >
    <!-- NO PHOTO VARIABLE FROM GMAPS API RESPOSE -->
    <img
      v-if="placeDetail.photos"
      :src="placeDetail.photos[0].getUrl()"
      :alt="placeDetail.name"
    />
    <!-- DEFAULT IMAGE -->
    <img
      v-else
      src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2444&q=80"
      alt="default image"
    />

    <div class="px-4 py-2 text-white bg-[#71CDD1] w-full">
      <h2>{{ placeDetail.name }}</h2>
    </div>

    <div class="w-full py-4 px-5 text-gray-400 space-y-4">
      <p v-html="currentMarkerFocus.description"></p>

      <span class="flex flex-row space-x-3 pt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 172 172"
          style="fill: #000000"
        >
          <g
            fill="none"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
          >
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g fill="#71cbcf">
              <path
                d="M86,14.33333c-27.70633,0 -50.16667,22.46033 -50.16667,50.16667c0,28.423 31.562,70.37667 44.61967,86.50883c2.86667,3.54033 8.22733,3.54033 11.094,0c13.05767,-16.13217 44.61967,-58.08583 44.61967,-86.50883c0,-27.70633 -22.46033,-50.16667 -50.16667,-50.16667zM86,82.41667c-9.89717,0 -17.91667,-8.0195 -17.91667,-17.91667c0,-9.89717 8.0195,-17.91667 17.91667,-17.91667c9.89717,0 17.91667,8.0195 17.91667,17.91667c0,9.89717 -8.0195,17.91667 -17.91667,17.91667z"
              ></path>
            </g>
          </g>
        </svg>
        <p>{{ placeDetail.formatted_address }}</p>
      </span>

      <span class="flex flex-row space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 172 172"
          style="fill: #000000"
        >
          <g
            fill="none"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
          >
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g fill="#85c230">
              <path
                d="M86,14.33333c-26.45933,0 -49.5538,14.448 -61.96647,35.83333h17.49675c6.45,-7.96933 14.86658,-14.27634 24.66341,-17.90267c-2.24317,5.21733 -4.04099,11.30934 -5.41699,17.90267h14.73925c3.43283,-14.1685 8.24089,-21.5 10.48405,-21.5c2.24317,0 7.05122,7.3315 10.48405,21.5h14.73925c-1.376,-6.59333 -3.18099,-12.68534 -5.41699,-17.90267c9.78967,3.62633 18.21341,9.93334 24.66341,17.90267h17.49674c-12.41267,-21.38533 -35.50714,-35.83333 -61.96647,-35.83333zM7.16667,64.5l8.90234,43h9.37825l6.08887,-24.87337l6.07487,24.87337h9.33626l8.90234,-43h-10.778l-3.84928,24.11751l-5.72493,-24.11751h-7.97852l-5.73893,24.15951l-3.80729,-24.15951zM61.65853,64.5l8.90234,43h9.37826l6.08886,-24.87337l6.07487,24.87337h9.33627l8.90234,-43h-10.764l-3.86328,24.11751l-5.71094,-24.11751h-7.99252l-5.72493,24.15951l-3.82129,-24.15951zM116.15039,64.5l8.90235,43h9.37825l6.08887,-24.87337l6.07487,24.87337h9.33626l8.90235,-43h-10.77799l-3.84929,24.11751l-5.72493,-24.11751h-7.97851l-5.73893,24.15951l-3.80729,-24.15951zM24.03353,121.83333c12.41267,21.38533 35.50714,35.83333 61.96647,35.83333c26.45933,0 49.5538,-14.448 61.96647,-35.83333h-17.49674c-6.45,7.96933 -14.86658,14.27634 -24.66341,17.90267c2.236,-5.21733 4.02699,-11.30934 5.40299,-17.90267h-14.73925c-3.43283,14.1685 -8.24089,21.5 -10.48405,21.5c-2.24317,0 -7.03722,-7.3315 -10.47006,-21.5h-14.73925c1.376,6.59333 3.18099,12.68534 5.41699,17.90267c-9.78967,-3.62633 -18.21341,-9.93334 -24.66341,-17.90267z"
              ></path>
            </g>
          </g>
        </svg>
        <a :href="placeDetail.website ? placeDetail.website : ''">{{
          placeDetail.website ? placeDetail.website : ''
        }}</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    placeDetail() {
      return this.$store.state.placeDetail
    },

    currentMarkerFocus() {
      return this.$store.state.currentMarkerFocus
    },
  },
}
</script>
