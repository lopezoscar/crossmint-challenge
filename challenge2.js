const { getMapGoal } = require('./lib/map')

const { createPolyanet } = require('./lib/polyanets')
const { createCometh } = require('./lib/comeths')
const { createSoloon } = require('./lib/soloons')

const HTTP_STATUS_OK = 200

function getPoints (mapGoal) {
  const map = []
  for (let i = 0; i < mapGoal.length; i++) {
    const columns = mapGoal[i]
    for (let j = 0; j < columns.length; j++) {
      const element = columns[j]
      if (element !== 'SPACE') {
        const { type, ...typeParams } = parseElement(element)
        const requestParam = {
          row: i,
          column: j,
          ...typeParams
        }
        map.push({ type, requestParam })
      }
    }
  }
  return map
}

function parseElement (element) {
  const mapParams = {
    COMETH: 'direction',
    SOLOON: 'color'
  }
  const [param, type] = element.split('_')

  if (mapParams[type]) {
    const element = {
      type
    }
    element[mapParams[type]] = param.toLowerCase()
    return element
  }
  return { type: element }
}

const apiCallByType = {
  POLYANET: createPolyanet,
  COMETH: createCometh,
  SOLOON: createSoloon
}

async function storePoints (points) {
  // processing in series because it returns 429 Too Many Requests with Promise.all
  let polyanetsCreated = 0
  try {
    for (const point of points) {
      console.log('creating point', point)
      const response = await apiCallByType[point.type](point.requestParam)
      if (response.status === HTTP_STATUS_OK) {
        polyanetsCreated++
        console.log('points created', polyanetsCreated, 'of', points.length)
      }
    }
    if (polyanetsCreated !== points.length) {
      throw new Error('There was an error creating polyanets')
    }
    return {
      process: 'OK'
    }
  } catch (error) {
    console.log('points created', polyanetsCreated, 'of', points.length)
    console.log('error storing points', error.message)
  }
}

async function run () {
  const candidateId = process.env.CANDIDATE_ID || '7b7efdda-9b51-4445-bde8-645ff444a738'
  const { data } = getMapGoal({ candidateId })
  const points = getPoints(data.goal)
  console.log('points', points)
  const storePointsResponse = await storePoints(points)
  console.log('storePointsResponse', storePointsResponse)
}

run()
