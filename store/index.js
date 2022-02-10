/* eslint-disable no-undef */
export const state = () => ({
  loading: false,
  markers: [],

  showPlaceList: true,

  // DEFAULT CENTER MAPS
  currentMarkerFocus: {
    id: '',
    position: { lat: 1.28692, lng: 103.85457 },
    zoom: 15,
  },

  placeDetail: {},
})

export const getters = {
  // FUNCTION TO RETRIEVE LOCATIONS DATA USING FETCH
  // async getPlaceLists(state) {
  //   const res = await fetch('/locations')
  //   state.markers = await res.json()
  // },
}

export const mutations = {
  setLoading(state) {
    state.loading = !state.loading
  },

  setLocations(state, payload) {
    state.markers = payload
  },

  setDefault(state) {
    state.currentMarkerFocus = {
      id: '',
      position: { lat: 1.28692, lng: 103.85457 },
      zoom: 15,
    }
    state.placeDetail = {}
  },

  setPlaceList(state) {
    state.showPlaceList = !state.showPlaceList
  },

  setCurrentMarkerFocus(state, marker) {
    state.currentMarkerFocus = marker
  },

  setPlaceDetail(state, place) {
    state.placeDetail = place
  },
}

export const actions = {
  async getLocations(context) {
    context.commit('setLoading')
    // function to fetch data
    // get value from data/locations.json
    const res = await fetch('/locations')
    context.commit('setLocations', await res.json())

    context.commit('setLoading')
  },

  showPlaceList(context) {
    context.commit('setPlaceList')
  },

  setMapDefault(context) {
    context.commit('setDefault')
  },

  setMarkerItsContent(context, marker) {
    context.commit('setCurrentMarkerFocus', marker)
  },

  async getPlaceDetail(context, data) {
    const request = {
      query: data.name === 'Merlion' ? 'Merlion Fountain' : data.name,
      fields: ['name', 'geometry', 'photos', 'place_id'],
    }
    const service = await new google.maps.places.PlacesService(data.map)
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        service.getDetails(
          {
            placeId: results[0].place_id,
            fields: [
              'name',
              'formatted_address',
              'geometry',
              'photo',
              'website',
            ],
          },
          (place, status) => {
            if (
              // eslint-disable-next-line no-undef
              status === google.maps.places.PlacesServiceStatus.OK &&
              place &&
              place.geometry &&
              place.geometry.location
            ) {
              context.commit('setPlaceDetail', place)
            }
          }
        )
      }
    })
  },
}
