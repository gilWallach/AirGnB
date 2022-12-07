// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import {
  socketService,
  SOCKET_EVENT_USER_UPDATED,
  SOCKET_EMIT_USER_WATCH,
} from './socket.service'
import { showSuccessMsg } from './event-bus.service'

const STORAGE_KEY = 'order'

export const orderService = {
  query,
  getById,
  save,
  remove,
  getEmptyOrder,
  addOrderMsg,
}
window.cs = orderService

async function query(filterBy = { _id: '' }) {
  return await httpService.get(STORAGE_KEY, filterBy)
}

async function getById(orderId) {
  return await httpService.get(STORAGE_KEY, `order/${orderId}`)
}

async function remove(orderId) {
  return await httpService.delete(STORAGE_KEY, `order/${orderId}`)
}

async function save(order) {
  var savedOrder
  if (order._id) {
    savedOrder = await httpService.put(`order/${order._id}`, order)
  } else {
    // Later, owner is set by the backend
    // order.buyer = userService.getLoggedinUser()
    // order.createdAt = Date.now()
    savedOrder = await httpService.post('order', order)
  }
  return savedOrder
}

async function addOrderMsg(orderId, txt) {
  // Later, this is all done by the backend
  const order = await getById(orderId)
  if (!order.msgs) order.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  order.msgs.push(msg)
  await storageService.put(STORAGE_KEY, order)

  return msg
}

function getEmptyOrder() {
  return {
    name: '',
    price: 0,
    summary: '',
  }
}
