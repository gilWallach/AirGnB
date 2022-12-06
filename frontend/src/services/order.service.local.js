import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'orders'

export const orderService = {
  query,
  getById,
  save,
  remove,
  getEmptyOrder,
  addOrderMsg,
}
window.cs = orderService

async function query() {
  var orders = await storageService.query(STORAGE_KEY)
  if (!orders?.length) _createOrders()
  const loggedinUser = userService.getLoggedinUser()
  orders = orders.filter((order) => order.hostId === loggedinUser._id)

  return orders
}

function getById(orderId) {
  return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
  await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
  var savedOrder
  if (order._id) {
    savedOrder = await storageService.put(STORAGE_KEY, order)
  } else {
    // Later, owner is set by the backend
    order.buyer = userService.getLoggedinUser()
    order.createdAt = Date.now()
    savedOrder = await storageService.post(STORAGE_KEY, order)
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

function _createOrders() {
  utilService.saveToStorage(STORAGE_KEY,
    [{
      _id: 'o1225',
      hostId: '622f3401e36c59e6164fab4d',
      createdAt: 9898989,
      buyer: {
        _id: '622f3401e36c59e6164fab4e',
        fullname: 'Leo',
        imgUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
      },
      totalPrice: 1785,
      startDate: '2025/10/15',
      endDate: '2025/10/17',
      guests: {
        adults: 2,
        kids: 1,
      },
      stay: {
        _id: '622f337a75c7d36e498aaaf8',
        name: 'Westin Kaanapali KORVN 2BR',
        price: 595,
      },
      msgs: [],
      status: 'pending', // pending, approved
    },
    {
      _id: 'o1226',
      hostId: '622f3401e36c59e6164fab4d',
      createdAt: 9898989,
      buyer: {
        _id: '622f3401e36c59e6164fab4e',
        fullname: 'Leo',
      },
      totalPrice: 1785,
      startDate: '2025/10/15',
      endDate: '2025/10/17',
      guests: {
        adults: 2,
        kids: 1,
      },
      stay: {
        _id: '622f337a75c7d36e498aaaf8',
        name: 'Yaron Charming Villa',
        price: 595,
      },
      msgs: [],
      status: 'approved', // pending, approved
    },
    {
      _id: 'o1227',
      hostId: '622f3401e36c59e6164fab4d',
      createdAt: 9898989,
      buyer: {
        _id: '622f3401e36c59e6164fab4e',
        fullname: 'Leo',
      },
      totalPrice: 1785,
      startDate: '2025/10/15',
      endDate: '2025/10/17',
      guests: {
        adults: 2,
        kids: 1,
      },
      stay: {
        _id: '622f337a75c7d36e498aaaf8',
        name: 'Muki Charming Duplex',
        price: 595,
      },
      msgs: [],
      status: 'approved', // pending, approved
    },
    {
      _id: 'o1228',
      hostId: '622f3401e36c59e6164fa555',
      createdAt: 9898989,
      buyer: {
        _id: '622f3401e36c59e6164fab4e',
        fullname: 'Leo',
      },
      totalPrice: 1785,
      startDate: '2025/10/15',
      endDate: '2025/10/17',
      guests: {
        adults: 2,
        kids: 1,
      },
      stay: {
        _id: '622f337a75c7d36e498aaaf8',
        name: 'Puki Charming Duplex',
        price: 595,
      },
      msgs: [],
      status: 'declined', // pending, approved
    }])
}

// function getOrders() {
//   return [
//     {
//       _id: 'o1225',
//       hostId: '622f3401e36c59e6164fab4d',
//       createdAt: 9898989,
//       buyer: {
//         _id: '622f3401e36c59e6164fab4e',
//         fullname: 'Leo',
//       },
//       totalPrice: 1785,
//       startDate: '2025/10/15',
//       endDate: '2025/10/17',
//       guests: {
//         adults: 2,
//         kids: 1,
//       },
//       order: {
//         _id: '622f337a75c7d36e498aaaf8',
//         name: 'Westin Kaanapali KORVN 2BR',
//         price: 595,
//       },
//       msgs: [],
//       status: 'pending', // pending, approved
//     },
//   ]
// }