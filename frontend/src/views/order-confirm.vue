<template>
  <div class="main-container-stay-details">
    <section class="order-confirm">
      <!-- page header -->
      <header class="flex column">
        <h1 v-if="!isHostMode" class="header fs22">Order Confirmation</h1>
        <!-- <p class="fs14">Dear guest,</p>
        <p class="fs14 subtitle">
          In order to complete your reservation,
          <span class="bold">please confirm your trip details</span>
        </p> -->
      </header>
      <!-- main content -->
      <main class="main-content" :class="{ flex: !isHostMode }">
        <!-- stay summary -->
        <div v-if="!isHostMode && currStay" class="stay-container flex column">
          <div class="stay-txt">
            <h1 class="fs18">{{ currStay.name }}</h1>
            <h3 class="fs14 l-grey">
              {{ currStay.loc.city + ', ' + currStay.loc.country }}
            </h3>
          </div>
          <img :src="currStay.imgUrls[0]" alt="stay image" class="stay-img" />
        </div>

        <!-- order summary -->
        <div
          v-if="order.startDate"
          class="content-container justify-space-between align-center"
          :class="{ flex: !isHostMode }"
        >
          <div class="reservation-details">
            <h3 v-if="isHostMode" @click="backToList" class="btn-back">Back</h3>
            <h3 v-else @click="back" class="btn-back">Back</h3>
            <!-- <div v-if="isHostMode && currUser" class="buyer-details flex align-center justify-space-between"> -->
            <div
              v-if="isHostMode && currUser"
              class="buyer-details flex align-center justify-space-between"
            >
              <h3 :class="{ 'clean-margin': isHostMode }">
                New order from {{ order.buyer.fullname }}
              </h3>
              <div class="buyer-img-container">
                <img :src="currUser.imgUrl" alt="buyer image" />
              </div>
            </div>
            <h2 class="fs18">Order details</h2>
            <ul class="clean-list">
              <li class="flex column list-item">
                <h3 class="fs16">Dates</h3>
                <span>{{ order.startDate }} - {{ order.endDate }}</span>
              </li>
              <li
                class="flex list-item"
                :class="{
                  column: !isHostMode,
                  'justify-space-between': isHostMode,
                }"
              >
                <h3 class="fs16" :class="{ 'clean-margin': isHostMode }">
                  Total nights
                </h3>
                <span>{{ order.totalNights }}</span>
              </li>
              <li
                class="flex list-item"
                :class="{
                  column: !isHostMode,
                  'justify-space-between': isHostMode,
                }"
              >
                <h3 class="fs16" :class="{ 'clean-margin': isHostMode }">
                  Guests
                </h3>
                <span v-if="isHostMode">{{ order.guests }}</span>
                <span v-if="order.guests.adults"
                  >{{ order.guests.adults }} adult</span
                >
                <span v-if="order.guests.children"
                  >{{ order.guests.children }} children</span
                >
                <span v-if="order.guests.infants"
                  >{{ order.guests.infants }} infants</span
                >
              </li>
              <li class="list-item">
                <h3 v-if="!isHostMode" class="fs16">Price Breakdown</h3>
                <p
                  v-if="!isHostMode"
                  class="flex align-center justify-space-between"
                >
                  <span>{{ pricePerNight }}</span>
                  <span>{{ this.order.netPrice }}</span>
                </p>
                <p
                  v-if="!isHostMode"
                  class="flex align-center justify-space-between last-item"
                >
                  <span>Service fee</span> <span>$383</span>
                </p>
              </li>
              <li
                v-if="isHostMode"
                class="flex align-center justify-space-between list-item bold fs22"
              >
                <span>Total</span><span>${{ order.totalPrice }}</span>
              </li>
              <li
                v-else
                class="flex align-center justify-space-between list-item bold fs18"
              >
                <span>Total</span><span>{{ totalPrice }}</span>
              </li>
            </ul>
            <div class="confirmation-btns flex column justify-center">
              <gradient-button
                v-if="isHostMode"
                :data="'Approve'"
                @click="updateOrderStatus('approved')"
              />
              <gradient-button v-else :data="'Confirm'" @click="setOrder" />
              <button
                v-if="isHostMode"
                class="decline-btn"
                @click="updateOrderStatus('declined')"
              >
                Decline
              </button>
            </div>
          </div>
          <div class="reservation-image"></div>
        </div>
      </main>
    </section>
  </div>
</template>
<script>
import arrowBack from '../assets/svg/arrow-back.vue'
import gradientButton from '../cmps/gradient-button.vue'
import {
  showSuccessMsg,
  showErrorMsg,
  eventBus,
} from '../services/event-bus.service'
import {
  socketService,
  SOCKET_EVENT_ORDER_ADDED,
} from '../services/socket.service'

export default {
  name: 'order-confirm',
  props: {},
  data() {
    return {
      order: {
        startDate: null,
        endDate: null,
        guests: 0,
        netPrice: 0,
        totalNights: 0,
      },
      pricePerNight: '',
      totalPrice: '',
      currStay: null,
      currUser: null,
      isHostMode: false,
    }
  },
  async created() {
    if (!this.$route.params.id) {
      this.isHostMode = true
      this.$store.commit({ type: 'setDetails' })
      await this.$store.dispatch({ type: 'loadOrders' })
      this.order = JSON.parse(JSON.stringify(this.$store.getters.orders[0]))
      await this.$store.dispatch({
        type: 'loadUser',
        userId: this.order.buyer._id,
      })

      this.currUser = this.$store.getters.user

      const guestsArr = Object.values(this.order.guests)
      this.order.guests = guestsArr.reduce((acc, n) => acc + n, 0)

      this.currStay = this.order.stay
    } else {
      this.isHostMode = false
      this.$store.commit({ type: 'setDetails' })
      const { id } = this.$route.params
      try {
        await this.$store.dispatch({ type: 'loadStay', id })
        this.currStay = this.$store.getters.selectedStay
      } catch (err) {
        throw err
      }
      const {
        guests,
        checkInDate,
        checkOutDate,
        totalNights,
        price,
        pricePerNight,
        priceWithService,
      } = this.$route.query
      this.order.startDate = checkInDate
      this.order.endDate = checkOutDate
      this.order.guests = JSON.parse(guests)
      this.order.netPrice = price
      this.order.totalNights = totalNights
      this.pricePerNight = pricePerNight
      this.totalPrice = priceWithService
    }
  },
  methods: {
    async setOrder() {
      const order = { ...this.order }
      order.totalPrice = +this.totalPrice.substring(1).replace(',', '')
      order.status = 'pending'
      order.msgs = []
      const { _id, name, price, host } = this.stay
      const { _id: hostId, fullname, thumbnailUrl } = host
      order.host = { _id: hostId, fullname, thumbnailUrl }
      const miniStay = { _id, name, price }
      order.stay = miniStay
      try {
        await this.$store.dispatch({ type: 'addOrder', order })
        showSuccessMsg('order created!')
        this.$router.push('/')
      } catch (err) {
        showErrorMsg('could not create order, please try again later')
      }
    },
    async updateOrderStatus(status) {
      this.order.status = status
      try {
        await this.$store.dispatch({ type: 'updateOrder', order: this.order })
        showSuccessMsg('order created!')
        this.$router.push('/user/orders')
      } catch (err) {
        showErrorMsg('could not create order, please try again later')
      }
    },
    back() {
      const stayId = this.$route.params.id
      const { guests, checkInDate, checkOutDate } = this.$route.query
      this.$router.push({
        path: `/stay/${stayId}`,
        query: { guests, startDate: checkInDate, endDate: checkOutDate },
      })
    },
    backToList() {
      this.$router.push({ path: `/` })
    },
  },
  computed: {
    stay() {
      return this.$store.getters.selectedStay
    },
    // selectedOrder() {
    //   return this.$store.getters.selectedOrder
    // },
  },
  components: {
    arrowBack,
    gradientButton,
  },
}
</script>
