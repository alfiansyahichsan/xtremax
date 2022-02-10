/* eslint-disable no-undef */
export const state = () => ({
  markers: [
    {
      id: 'Merlion',
      position: { lat: 1.286924052657501, lng: 103.85450201240127 },
      child: [],
      headline: 'The Merlion is the national personification of Singapore.',
      description: `The Merlion is the national personification of Singapore. <br /><br />Its name combines "mer" meaning the sea and "lion". The fish body represents Singapore"s origin as a fishing village when it was called Temasek, which means 'sea town' in Javanese. The lion head represents Singapore's original name-Singapura-meaning "lion city" or "kota singa".`,
    },
    {
      id: 'Asian Civilisations Museum',
      position: { lat: 1.287466, lng: 103.851424 },
      child: [],
      headline: 'Headline Asian Civilisations Museum',
      description: `Description.`,
    },
    {
      id: 'Clarke Quay',
      position: { lat: 1.290555, lng: 103.846188 },
      child: [],
      headline: 'Headline Clarke Quay',
      description: `Description.`,
    },
    {
      id: 'Fort Canning Park',
      position: { lat: 1.295526, lng: 103.845331 },
      child: [],
      headline: 'Headline Fort Canning Park',
      description: `Description.`,
    },
    {
      id: 'Orchard Road',
      position: { lat: 1.302279, lng: 103.837399 },
      child: [],
      headline: 'Headline Orchard Road',
      description: `Description.`,
    },
    {
      id: 'Singapore Flyer',
      position: { lat: 1.289332, lng: 103.863152 },
      child: [],
      headline: 'Headline Singapore Flyer',
      description: `Description.`,
    },
    {
      id: 'Marina Bay Sands',
      position: { lat: 1.283099, lng: 103.860295 },
      child: [
        {
          id: 'ArtScience Museum',
          position: { lat: 1.283099, lng: 103.860295 },
        },
        {
          id: 'Marina Bay Sands Skypark',
          position: { lat: 1.283099, lng: 103.860295 },
        },
        {
          id: 'Double Helix Bridge',
          position: { lat: 1.283099, lng: 103.860295 },
        },
      ],
      headline: 'Headline Marina Bay Sands',
      description: `Description.`,
    },
    {
      id: 'Gardens By The Bay',
      position: { lat: 1.28179, lng: 103.863954 },
      child: [
        {
          id: 'Test',
          position: { lat: 1.28179, lng: 103.863954 },
        },
      ],
      headline: 'Headline Gardens By The Bay',
      description: `Description.`,
    },
    {
      id: 'Chinatown',
      position: { lat: 1.284193, lng: 103.843362 },
      child: [
        {
          id: 'Test',
          position: { lat: 1.28179, lng: 103.863954 },
        },
      ],
      headline: 'Headline Chinatown',
      description: `Description.`,
    },
  ],

  // DEFAULT CENTER MAPS
  currentMarkerFocus: {
    id: '',
    position: { lat: 1.28692, lng: 103.85457 },
    zoom: 15,
  },

  placeDetail: {},
})

export const getters = {
  getPlaceLists(state) {
    return state.markers
  },
}

export const mutations = {
  setDefault(state) {
    state.currentMarkerFocus = {
      id: '',
      position: { lat: 1.28692, lng: 103.85457 },
      zoom: 15,
    }
    state.placeDetail = {}
  },

  setCurrentMarkerFocus(state, marker) {
    state.currentMarkerFocus = marker
  },

  setPlaceDetail(state, place) {
    state.placeDetail = place
  },
}

export const actions = {
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
