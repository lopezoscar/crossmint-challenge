const { getMapGoal } = require('./lib/map')

const symbol = {
  SPACE: '*',
  POLYANET: 'O',

  DOWN_COMETH: 'DC',
  UP_COMETH: 'UC',
  LEFT_COMETH: 'LC',
  RIGHT_COMETH: 'RC',

  PURPLE_SOLOON: 'PS',
  BLUE_SOLOON: 'BS',
  WHITE_SOLOON: 'WS',
  RED_SOLOON: 'RS'
}

function draw (mapGoal) {
  for (let i = 0; i < mapGoal.length; i++) {
    let row = ''
    const columns = mapGoal[i]
    for (let j = 0; j < columns.length; j++) {
      row += ' ' + symbol[columns[j]] + ' - '
    }
    console.log(i, row)
  }
}

function run () {
  const { data } = getMapGoal()
  draw(data.goal)
}

run()
