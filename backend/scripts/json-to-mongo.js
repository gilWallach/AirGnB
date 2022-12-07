const { exit } = require('process')
// const dbService = require('./services/db.service.js')
const dbService = require('../services/db.service')

const gStays = require('./stay-extended.json')
var gUsers = require('./user.json')

function buildUserMap() {
  const userMap = {}

  gUsers.forEach((user) => (userMap[user.id] = user._id))
  return userMap
}
function getDbInfo() {
  const commandLineArgs = require('command-line-args')

  const optionDefinitions = [
    {
      name: 'db-info',
      alias: 'd',
      type: String,
      multiple: false,
      defaultOption: true,
      defaultValue: 'db-info.json',
    },
  ]

  const cmdArgs = commandLineArgs(optionDefinitions, { camelCase: true })
  const dbInfo = require(cmdArgs.dbInfo)
  return dbInfo
}
function getUserCollection() {
  const { userCollection, db, connectionStr } = getDbInfo()
  return dbService.getCollection(userCollection, db, connectionStr)
}
function getStayCollection() {
  const { stayCollection, db, connectionStr } = getDbInfo()
  return dbService.getCollection(stayCollection, db, connectionStr)
}

async function writeUsers() {
  userCollection = await getUserCollection()
  gUsers.forEach((user) => delete user._id)
  await userCollection.insertMany(gUsers)
  gUsers = await userCollection.find().toArray()
}

async function writeStays(userMap) {
  stayCollection = await getStayCollection()
  gStays.forEach((stay) => {
    delete stay._id
    stay.host._id = userMap[stay.host.id]
    stay.reviews.forEach((review) => (review.by._id = userMap[review.by.id]))
  })

  await stayCollection.insertMany(gStays)
}

;(async () => {
  await writeUsers()
  const userMap = buildUserMap()
  await writeStays(userMap)

  exit(0)
})()
