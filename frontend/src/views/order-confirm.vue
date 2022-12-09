<template>
  <div class="main-container-stay-details">
    <section class="order-confirm">
      <!-- page header -->
      <header class="flex column">
        <h1 class="header fs22">Order Confirmation</h1>
        <!-- <p class="fs14">Dear guest,</p>
        <p class="fs14 subtitle">
          In order to complete your reservation,
          <span class="bold">please confirm your trip details</span>
        </p> -->
      </header>
      <!-- main content -->
      <main class="main-content flex">
        <!-- stay summary -->
        <div class="stay-container flex column">
          <div class="stay-txt">
            <h1 class="fs18">{{ currStay.name }}</h1>
            <h3 class="fs14 l-grey">
              {{ currStay.loc.city + ', ' + currStay.loc.country }}
            </h3>
          </div>
          <img :src="currStay.imgUrls[0]" alt="stay image" class="stay-img" />
        </div>

        <!-- order summary -->
        <div class="content-container flex justify-space-between align-center">
          <div class="reservation-details">
            <h3 @click="back" class="btn-back">Back</h3>
            <h2 class="fs18">Order details</h2>
            <ul class="clean-list">
              <li class="flex column list-item">
                <h3 class="fs16">Dates</h3>
                <span>{{ order.startDate }} - {{ order.endDate }}</span>
              </li>
              <li class="flex column list-item">
                <h3 class="fs16">Guests</h3>
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
                <h3 class="fs16">Price Breakdown</h3>
                <p class="flex align-center justify-space-between">
                  <span>{{ pricePerNight }}</span>
                  <span>{{ this.order.netPrice }}</span>
                </p>
                <p class="flex align-center justify-space-between last-item">
                  <span>Service fee</span> <span>$383</span>
                </p>
              </li>
              <li
                class="flex align-center justify-space-between list-item bold fs22"
              >
                <span>Total</span><span>{{ totalPrice }}</span>
              </li>
            </ul>
            <div class="confirmation-btns flex column justify-center">
              <gradient-button :data="'Confirm'" @click="setOrder" />
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
    }
  },
  async created() {
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
        // console.log(err)
        showErrorMsg('could not create order, please try again later')
      }
    },
    back() {
      const stayId = this.$route.params.id
      //   console.log('stayid: ', stayId)
      const { guests, checkInDate, checkOutDate } = this.$route.query
      this.$router.push({
        path: `/stay/${stayId}`,
        query: { guests, startDate: checkInDate, endDate: checkOutDate },
      })
    },
  },
  computed: {
    stay() {
      return this.$store.getters.selectedStay
    },
  },
  components: {
    arrowBack,
    gradientButton,
  },
}
</script>
