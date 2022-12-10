const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = { name: '' }) {
  try {
    const criteria = _createCriteria(filterBy)
    const collection = await dbService.getCollection('stay')
    var stays = await collection.find(criteria).limit(30).toArray()
    return stays
  } catch (err) {
    logger.error('cannot find stays', err)
    throw err
  }
}

async function getById(stayId) {
  try {
    const collection = await dbService.getCollection('stay')
    const stay = collection.findOne({ _id: ObjectId(stayId) })
    return stay
  } catch (err) {
    logger.error(`while finding stay ${stayId}`, err)
    throw err
  }
}

async function remove(stayId) {
  try {
    const collection = await dbService.getCollection('stay')
    await collection.deleteOne({ _id: ObjectId(stayId) })
    return stayId
  } catch (err) {
    logger.error(`cannot remove stay ${stayId}`, err)
    throw err
  }
}

async function add(stay) {
  try {
    const collection = await dbService.getCollection('stay')
    await collection.insertOne(stay)
    return stay
  } catch (err) {
    logger.error('cannot insert stay', err)
    throw err
  }
}

async function update(stay) {
  try {
    const stayToSave = {
      name: stay.name,
      price: stay.price,
    }
    const collection = await dbService.getCollection('stay')
    await collection.updateOne(
      { _id: ObjectId(stay._id) },
      { $set: stayToSave }
    )
    return stay
  } catch (err) {
    logger.error(`cannot update stay ${stayId}`, err)
    throw err
  }
}

async function addStayMsg(stayId, msg) {
  try {
    msg.id = utilService.makeId()
    const collection = await dbService.getCollection('stay')
    await collection.updateOne(
      { _id: ObjectId(stayId) },
      { $push: { msgs: msg } }
    )
    return msg
  } catch (err) {
    logger.error(`cannot add stay msg ${stayId}`, err)
    throw err
  }
}

async function removeStayMsg(stayId, msgId) {
  try {
    const collection = await dbService.getCollection('stay')
    await collection.updateOne(
      { _id: ObjectId(stayId) },
      { $pull: { msgs: { id: msgId } } }
    )
    return msgId
  } catch (err) {
    logger.error(`cannot add stay msg ${stayId}`, err)
    throw err
  }
}

function _createCriteria(filterBy) {
  const criteria = {}
  const { name, type, minPrice, maxPrice, roomType, bedrooms, capacity, bathrooms, amenities, isSuperhost } = filterBy
  criteria.$or = [
    { 'loc.city': { $regex: name, $options: 'i' } },
    { 'loc.country': { $regex: name, $options: 'i' } },
    { name: { $regex: name, $options: 'i' } }
  ]
  if (type) criteria.type = type
  if (minPrice) criteria.price = { $gte: minPrice, $lt: maxPrice }
  if (roomType) criteria.roomType = roomType
  if (bedrooms) criteria.bedrooms = bedrooms
  if (capacity) criteria.capacity = capacity
  if (bathrooms) criteria.bathrooms = bathrooms
  if (amenities.length) criteria.amenities = { $all: amenities }
  if (isSuperhost) criteria['host.isSuperhost'] = true
  return criteria
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  addStayMsg,
  removeStayMsg,
}
