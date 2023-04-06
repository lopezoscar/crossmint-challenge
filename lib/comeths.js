const api = require('./api')

exports.createCometh = ({ row, column, direction }) => {
  return api.post('/comeths', { row, column, direction })
}

exports.deleteCometh = ({ row, column }) => {
  return api.delete('/comeths', { row, column })
}
