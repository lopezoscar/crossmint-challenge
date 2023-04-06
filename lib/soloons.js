const api = require('./api')

exports.createSoloon = ({ row, column, color }) => {
  return api.post('/soloons', { row, column, color })
}

exports.deleteSoloon = ({ row, column }) => {
  return api.delete('/soloons', { row, column })
}
