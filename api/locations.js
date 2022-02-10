import data from '../data/locations.json'

export default {
  path: '/locations',
  handler(req, res) {
    res.end(JSON.stringify(data.locations))
  },
}
