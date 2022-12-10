const fs = require('fs')

const stays = require('./stay-extended.json')

formatStay()

function formatStay() {
  var newStays = stays.map((stay) => {
    stay.reviews.forEach((review) => {
      review.rate = getRandomIntInclusive(3, 5)
    })

    return stay
  })

  fs.writeFile(
    'stay-extended.json',
    JSON.stringify(newStays, null, 2),
    'utf8',
    (err) => {
      if (err) return
      console.log('hopa!!!')
    }
  )
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return (Math.random() * (max - min) + min).toFixed(2) //The maximum is inclusive and the minimum is inclusive
}
