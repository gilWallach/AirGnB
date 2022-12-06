<template>
  <section v-if="orders" class='orders-list main-layout-list'>
    <h1 class="fs22"> Reservation</h1>
    <div class="list">
      <table>
        <tr>
          <th v-for="hr in tableHeadings" class="fs16">{{ hr }}</th>
        </tr>
        <tr v-for="currOrder in orders">
          <td :class="styleStatus(currOrder.status)" class="fs18 bold">{{ currOrder.status }}</td>
          <td>{{ formatGuests(currOrder.guests) }}</td>
          <td>{{ currOrder.startDate }}</td>
          <td>{{ currOrder.endDate }}</td>
          <td>{{ formatCreatedAt(currOrder.createdAt) }}</td>
          <td>{{ currOrder.order.name }}</td>
          <td>{{ formatTotalPrice(currOrder.totalPrice) }}</td>
          <td>
            <select v-model="currOrder.status" name="status" :value="currOrder.status">
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="declined">Declined</option>
            </select>
          </td>
        </tr>
      </table>
    </div>
  </section>
</template>
<script>
export default {
  name: 'orders-list',
  props: {},
  data() {
    return {
      tableHeadings: ['Status', 'Guests', 'Check-in', 'Check-out', 'Booked', 'Listing', 'Total Payout', 'Actions'],
      orders: null,
    }
  },
  async created() {
    try {
      await this.$store.dispatch({ type: 'loadOrders' })
      this.orders = this.$store.getters.orders
    } catch (err) {
      throw err
    }
  },
  methods: {
    formatGuests(guests) {
      const guestsArr = Object.values(guests)
      return guestsArr.reduce((acc, n) => acc + n, 0)
    },
    formatCreatedAt(createdAt) {
      return new Date(createdAt).toLocaleDateString('en-US')
    },
    formatTotalPrice(totalPrice) {
      return (totalPrice).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    },
    styleStatus(status){
      return {
        approved: status === 'approved',
        pending: status === 'pending',
        declined: status === 'declined',
      }
    },
    setOrderStatus(order, value){
      console.log(value)
    }
  },
  computed: {

  },
  components: {}
}
</script>