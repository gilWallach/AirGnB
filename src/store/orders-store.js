import { orderService } from '../services/order.service.local'

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
        labels: [],
        selectedOrder: null,
    },
    getters: {
        orders({orders}) {
            return orders
        },
        labels({ labels }) {
            return labels
        },
        selectedOrder(state) {
            return state.selectedOrder
        },
    },
    mutations: {
        setOrders(state, { orders }) {
            state.orders = orders
        },
        setLabels(state, { labels }) {
            state.labels = labels
        },
        addOrder(state, { order }) {
            state.orders.push(order)
        },
        updateOrder(state, { order }) {
            const idx = state.orders.findIndex((c) => c.id === order._id)
            state.orders.splice(idx, 1, order)
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
            console.log(filterBy)
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
                console.log('orderStore: Error in addOrder', err)
                throw err
            }
        },
        async updateOrder(context, { order }) {
            try {
                order = await orderService.save(order)
                context.commit(getActionUpdateOrder(order))
                return order
            } catch (err) {
                console.log('orderStore: Error in updateOrder', err)
                throw err
            }
        },
        async loadOrders(context, { filterBy }) {
            try {
                const orders = await orderService.query(filterBy)
                context.commit({ type: 'setOrders', orders })
            } catch (err) {
                console.log('orderStore: Error in loadOrders', err)
                throw err
            }
        },
        async loadLabels(context) {
            try {
                const labels = await orderService.getLabels()
                context.commit({ type: 'setLabels', labels })
            } catch (err) {
                console.log('orderStore: Error in loadLabels', err)
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
