// import { orderService } from '../services/order.service.local'
import { orderService } from '../services/order.service'

export function getActionRemoveOrder(orderId) {
  return {
    type: 'removeOrder',
    orderId,
  }
}
export function getActionAddOrder(order) {
  return {
    type: 'addOrder',
    order,
  }
}
export function getActionUpdateOrder(order) {
  return {
    type: 'updateOrder',
    order,
  }
}

export function getActionAddOrderMsg(orderId) {
  return {
    type: 'addOrderMsg',
    orderId,
    txt: 'Stam txt',
  }
}

export const orderStore = {
  state: {
    orders: [],
    selectedOrder: null,
  },
  getters: {
    orders({ orders }) {
      return orders
    },
    selectedOrder(state) {
      return state.selectedOrder
    },
  },
  mutations: {
    setOrders(state, { orders }) {
      state.orders = orders
    },
    addOrder(state, { order }) {
      state.orders.unshift(order)
    },
    updateOrder(state, { updatedOrder }) {
      const idx = state.orders.findIndex((c) => c._id === updatedOrder._id)
      state.orders.splice(idx, 1, updatedOrder)
    },
    removeOrder(state, { orderId }) {
      state.orders = state.orders.filter((order) => order._id !== orderId)
    },
    addOrderMsg(state, { orderId, msg }) {
      const order = state.orders.find((order) => order._id === orderId)
      if (!order.msgs) order.msgs = []
      order.msgs.push(msg)
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
    },
    setSelectedOrder(state, { order }) {
      state.selectedOrder = order
    },
  },
  actions: {
    async addOrder(context, { order }) {
      try {
        order = await orderService.save(order)
        context.commit(getActionAddOrder(order))
        return order
      } catch (err) {
        throw err
      }
    },
    async updateOrder(context, { order }) {
      try {
        const updatedOrder = await orderService.save(order)
        context.commit({ type: 'updateOrder', updatedOrder })
        return updatedOrder
      } catch (err) {
        console.log('orderStore: Error in updateOrder', err)
        throw err
      }
    },
    async loadOrders(context, { filterBy }) {
      try {
        const orders = await orderService.query(filterBy)
        console.log('orders: ', orders)
        context.commit({ type: 'setOrders', orders })
      } catch (err) {
        console.log('orderStore: Error in loadOrders', err)
        throw err
      }
    },
    async removeOrder(context, { orderId }) {
      try {
        await orderService.remove(orderId)
        context.commit(getActionRemoveOrder(orderId))
      } catch (err) {
        console.log('orderStore: Error in removeOrder', err)
        throw err
      }
    },
    async addOrderMsg(context, { orderId, txt }) {
      try {
        const msg = await orderService.addOrderMsg(orderId, txt)
        context.commit({ type: 'addOrderMsg', orderId, msg })
      } catch (err) {
        console.log('orderStore: Error in addOrderMsg', err)
        throw err
      }
    },
    async loadOrder({ commit }, { id }) {
      try {
        const order = await orderService.getById(id)
        commit({ type: 'setSelectedOrder', order })
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
