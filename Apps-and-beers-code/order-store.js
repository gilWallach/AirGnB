export const orderStore = {
  state: {
    orders: [],
  },
  mutations: {
    addOrder(state, { order }) {
      state.orders.unshift(order)
    },
  },
}
