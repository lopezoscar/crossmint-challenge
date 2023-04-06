const { createPolyanet } = require('./lib/polyanets')

const HTTP_STATUS_OK = 200

function createAPolyanteCrossPoints ({ totalRows, totalColumns, startRow = 0, startColumn = 0 }) {
  const map = []
  for (let i = startRow; i < totalRows - startRow; i++) {
    for (let j = startColumn; j < totalColumns - startColumn; j++) {
      if (j === i) {
        map.push({
          row: '' + i,
          column: '' + j
        })
        map.push({
          row: '' + i,
          column: (totalColumns - 1 - startColumn - j).toString()
        })
      }
    }
  }
  return map
}

async function storePolyanets (points) {
  // processing in series because it returns 429 Too Many Requests with Promise.all
  let polyanetsCreated = 0
  try {
    for (const point of points) {
      console.log('creating point', point)
      const response = await createPolyanet(point)
      if (response.status === HTTP_STATUS_OK) {
        polyanetsCreated++
      }
    }
    if (polyanetsCreated !== points.length) {
      throw new Error('There was an error creating polyanets')
    }
  } catch (error) {
    console.log('error storing Polyanets', error)
  }
}

async function run () {
  const points = createAPolyanteCrossPoints({ totalRows: 11, totalColumns: 11, startRow: 2, startColum: 2 })
  console.log(points)
  const storePolyantesResponse = await storePolyanets(points)
  console.log('storePolyantesResponse', storePolyantesResponse)
}
run()
