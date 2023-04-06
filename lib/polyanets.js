const api = require('./api')

exports.createPolyanet = ({ row, column }) => {
  return api.post('/polyanets', { row, column })
}

exports.deletePolyanet = ({ row, column }) => {
  return api.delete('/polyanets', { row, column })
}
