<template>
  <section class="backoffice-list">
    <h1 class="fs22"> Reservation</h1>
    <el-table ref="singleTableRef" :data="formattedOrders" highlight-current-row style="width: 100%">
      <!-- <el-table ref="singleTableRef" :data="tableData" highlight-current-row style="width: 100%"
      @current-change="handleCurrentChange"> -->
      <!-- <el-table-column type="index" width="50" /> -->
      <el-table-column property="status" label="Status" width="80" />
      <el-table-column property="guests" label="Guests" width="120" />
      <el-table-column property="startDate" label="Check-in" />
      <el-table-column property="endDate" label="Check-out" />
      <el-table-column property="createdAt" label="Booked" />
      <el-table-column property="listing" label="Listing" />
      <el-table-column property="totalPrice" label="Total payout" />
      <el-table-column property="action" label="Actions" />
    </el-table>
    <!-- <div style="margin-top: 20px">
      <el-button @click="setCurrent(tableData[1])">Select second row</el-button>
      <el-button @click="setCurrent()">Clear selection</el-button>
    </div> -->
  </section>
</template>

<script>
// import { ref } from 'vue'
import { ElTable } from 'element-plus'
import StayApp from './stay-app.vue'

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
      formattedOrders: null
    }
  },
  async created() {
    try {
      await this.$store.dispatch({ type: 'loadOrders' })
      this.orders = this.$store.getters.orders
      console.log(this.orders)
      this.formattedOrders = this.formatOrders
      console.log(this.formattedOrders)
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
          })
        }
      })
    }
  }
}

// const currentRow = ref()
// const singleTableRef = ref < InstanceType < typeof ElTable >> ()-- >
</script>

<!-- <script lang="ts" setup>
import { ref } from 'vue'
import { ElTable } from 'element-plus'

interface User {
  status: string
  guests: string
  startDate: string
  endDate: string
  createdAt: string
  listing: string
  totalPrice: string
}

const currentRow = ref()
const singleTableRef = ref<InstanceType<typeof ElTable>>() -->

<!-- // const setCurrent = (row?: User) => {
//   singleTableRef.value!.setCurrentRow(row)
// }
// const handleCurrentChange = (val: User | undefined) => {
//   currentRow.value = val
// }
const tableData: User[] = [
  {
    status: '2016-05-03',
    guests: 'Tom',
    startDate: 'No. 189, Grove St, Los Angeles',
    endDate: 'No. 189, Grove St, Los Angeles',
    createdAt: 'No. 189, Grove St, Los Angeles',
    listing: 'No. 189, Grove St, Los Angeles',
    totalPrice: 'No. 189, Grove St, Los Angeles',
  },
] -->
