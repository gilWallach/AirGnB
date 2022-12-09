const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

// async function query(filterBy = { _id: '' }) {
async function query() {
  const criteria = {}
  try {
    // const criteria = {
    //   name: { $regex: filterBy.name, $options: 'i' },
    //   name, capacity/ date (in/out)
    // }
    const collection = await dbService.getCollection('order')
    var orders = await collection.find(criteria).sort({ _id: -1 }).toArray()
    return orders
  } catch (err) {
    logger.error('cannot find orders', err)
    throw err
  }
}

async function getById(orderId) {
  try {
    const collection = await dbService.getCollection('order')
    const order = collection.findOne({ _id: ObjectId(orderId) })
    return order
  } catch (err) {
    logger.error(`while finding order ${orderId}`, err)
    throw err
  }
}

async function remove(orderId) {
  try {
    const collection = await dbService.getCollection('order')
    await collection.deleteOne({ _id: ObjectId(orderId) })
    return orderId
  } catch (err) {
    logger.error(`cannot remove order ${orderId}`, err)
    throw err
  }
}

async function add(order) {
  try {
    const collection = await dbService.getCollection('order')
    await collection.insertOne(order)
    logger.debug('order', order)
    return order
  } catch (err) {
    logger.error('cannot insert order', err)
    throw err
  }
}

async function update(order) {
  try {
    console.log(order)
    // const orderToSave = {
    //   name: order.name,
    //   price: order.price,
    // }
    const orderCopy = JSON.parse(JSON.stringify(order))
    delete orderCopy._id
    const collection = await dbService.getCollection('order')
    await collection.updateOne(
      { _id: ObjectId(order._id) },
      // { $set: orderToSave }
      { $set: orderCopy }
    )
    console.log(order)
    return order
  } catch (err) {
    logger.error(`cannot update order ${order._id}`, err)
    throw err
  }
}

async function addOrderMsg(orderId, msg) {
  try {
    msg.id = utilService.makeId()
    const collection = await dbService.getCollection('order')
    await collection.updateOne(
      { _id: ObjectId(orderId) },
      { $push: { msgs: msg } }
    )
    return msg
  } catch (err) {
    logger.error(`cannot add order msg ${orderId}`, err)
    throw err
  }
}

async function removeOrderMsg(orderId, msgId) {
  try {
    const collection = await dbService.getCollection('order')
    await collection.updateOne(
      { _id: ObjectId(orderId) },
      { $pull: { msgs: { id: msgId } } }
    )
    return msgId
  } catch (err) {
    logger.error(`cannot add order msg ${orderId}`, err)
    throw err
  }
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  addOrderMsg,
  removeOrderMsg,
}
