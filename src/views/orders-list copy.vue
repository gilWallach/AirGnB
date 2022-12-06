<template>
  <section class="backoffice-list">
    <h1 class="fs22"> Reservation</h1>
    <el-table :data="formattedOrders" style="width: 100%">
      <el-table-column fixed prop="status" label="Status" width="80" />
      <el-table-column prop="guests" label="Guests" width="80" />
      <el-table-column prop="stastartDatete" label="Check-in" width="120" />
      <el-table-column prop="endDate" label="Check-out" />
      <el-table-column prop="createdAt" label="Booked" />
      <el-table-column prop="listing" label="Listing" width="120" />
      <el-table-column prop="totalPrice" label="Total payout" />
      <el-table-column prop="status" fixed="right" label="Actions" width="120">

        <template #default>
          <el-select v-model="status" class="m-2" :value="status" size="small">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>

      </el-table-column>
    </el-table>
  </section>
</template>

<script>
// import { ref } from 'vue'
import { ElTable } from 'element-plus'

export default {
  data() {
    return {
      User: {
        status: '',
        guests: null,
        startDate: '',
        endDate: '',
        createdAt: null,
        listing: null,
        totalPrice: '',
      },
      orders: null,
      formattedOrders: null,
      options: [
        {
          value: 'pending',
          label: 'Pending',
        },
        {
          value: 'approved',
          label: 'Approved',
        },
        {
          value: 'declined',
          label: 'Declined',
        }],
    }
  },
  async created() {
    try {
      await this.$store.dispatch({ type: 'loadOrders' })
      this.orders = this.$store.getters.orders
      this.formattedOrders = this.formatOrders
    } catch (err) {
      throw err
    }
  },
  methods: {
    formatGuests(guests) {
      const guestsArr = Object.values(guests)
      return guestsArr.reduce((acc, n) => acc + n, 0)
    }
  },
  computed: {
    formatOrders() {
      return this.orders.map(currOrder => {
        const { status, guests, startDate, endDate, createdAt, order, totalPrice } = currOrder
        return {
          status,
          guests: this.formatGuests(guests),
          startDate,
          endDate,
          createdAt: new Date(createdAt).toLocaleDateString('en-US'),
          listing: order.name,
          totalPrice: (totalPrice).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }),
        }
      })
    }
  }
}
</script>