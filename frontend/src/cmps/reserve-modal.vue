<template>
  <section class="reserve-modal">
    <div class="reserve-section">
      <div class="reserve-modal-full flex column">
        <div class="modal-header flex justify-space-between">
          <div>
            <span class="modal-header-price">{{
              this.stay.price.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              })
            }}</span>
            <span class="modal-header-text"> night</span>
          </div>
          <div class="rating-reviews flex" v-if="stay.reviews.length">
            <star /><span>4.82 </span
            ><span class="separator">&nbsp;·&nbsp;</span>
            <span class="reviews-amount"
              >{{ this.stay.reviews.length + ' ' + formatReviews }}
            </span>
          </div>
        </div>
        <div class="pax-dates-container">
          <div class="dates">
            <div class="check-in flex column">
              <label for="i">
                <p>CHECK-IN</p>
                <p class="dates-txt">
                  {{ this.order.checkInDate || 'Add date' }}
                </p>
              </label>
            </div>
            <div class="checkout flex column">
              <label for="o">
                <p>CHECKOUT</p>
                <p class="dates-txt">
                  {{ this.order.checkOutDate || 'Add date' }}
                </p>
              </label>
            </div>
            <div class="dates-modal flex column">
              <date-picker @set-dates="setDates" />
            </div>
          </div>
          <!-- !!! HANDLE CHANGES IN isGuestModalOpen, probably emit events to stay-details cmp-->
          <div
            @click.stop="toggleIsGuestModalOpen"
            :class="{ selected: isGuestModalOpen }"
            class="pax flex justify-space-between"
          >
            <!-- !!! -->
            <div>
              <p>GUESTS</p>
              <p class="pax-txt">{{ this.order.guests.capacity }} guest</p>
            </div>
            <!-- !!! HANDLE CHANGES IN isGuestModalOpen, probably emit events to stay-details cmp-->
            <div class="reserve-arrow">
              <arrow-up v-if="isGuestModalOpen" />
              <arrow-down v-else />
            </div>
            <transition name="fade">
              <add-guests
                v-if="isGuestModalOpen"
                @guests-update="addGuests"
                :allGuests="this.order.guests"
              />
            </transition>
            <!-- !!! -->
          </div>
        </div>
        <div class="gradient-container" ref="elReserveModal">
          <gradient-button :data="'Reserve'" @click="doReserve" />
        </div>
        <p class="reg-text">You won't be charged yet</p>
        <!-- modal rates -->
        <div class="modal-rates flex column align-center">
          <div class="nights-and-rate flex justify-space-between">
            <div class="underline">{{ formatPricePerNight }}</div>
            <div>{{ formatTotalPrice }}</div>
          </div>
          <div class="fee-container flex justify-space-between">
            <div class="underline">Cleaning fee</div>
            <div>$155</div>
          </div>
          <div class="fee-container flex justify-space-between">
            <div class="underline">Service fee</div>
            <div>$228</div>
          </div>
        </div>
        <!-- modal total -->
        <div class="modal-total flex justify-space-between">
          <div>Total</div>
          <div>{{ formatTotalPriceWithService }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import addGuests from '../cmps/add-guests.vue'
import datePicker from '../cmps/date-picker.vue'
import arrowDown from '../assets/svg/arrow-down.vue'
import arrowUp from '../assets/svg/arrow-up.vue'
import star from '../assets/svg/star.vue'
import gradientButton from '../cmps/gradient-button.vue'
export default {
  name: 'reserve-modal',
  props: {
    stay: {
      type: Object,
      required: true,
    },
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isGuestModalOpen: false,
      modalObserver: null,
      modalInSubHeader: false,
    }
  },
  created() {},
  mounted() {
    this.modalObserver = new IntersectionObserver(this.onModalObserved, {
      rootMargin: '-97px 0px 0px 0px',
    })
    this.modalObserver.observe(this.$refs.elReserveModal)
  },
  methods: {
    setDates(dates) {
      this.order.checkInDate = dates[0].toLocaleString().split(',')[0]
      this.order.checkOutDate = dates[1]?.toLocaleString().split(',')[0] || null
    },
    doReserve() {
      if (!this.formatNights) {
        return
      }

      const { guests, checkInDate, checkOutDate } = this.order
      const { id } = this.$route.params
      this.$router.push({
        name: 'order-confirm',
        params: { id },
        query: {
          guests: JSON.stringify(guests),
          checkInDate,
          checkOutDate,
          totalNights: this.formatNights,
          price: this.formatTotalPrice,
          pricePerNight: this.formatPricePerNight,
          priceWithService: this.formatTotalPriceWithService,
        },
      })
    },
    addGuests(guests) {
      this.order.guests = guests
    },
    onModalObserved(entries) {
      entries.forEach((entry) => {
        this.modalInSubHeader = entry.isIntersecting ? false : true
        this.$emit('toggleModalInSubHeader', this.modalInSubHeader)
      })
    },
    toggleIsGuestModalOpen() {
      this.isGuestModalOpen = !this.isGuestModalOpen
      this.$emit('setIsGuestModalOpen', this.isGuestModalOpen)
    },
  },
  computed: {
    formatReviews() {
      return this.stay.reviews.length > 1 ? 'reviews' : 'review'
    },
    formatNights() {
      const inDate = new Date(this.order.checkInDate)
      const outDate = new Date(this.order.checkOutDate)
      const diffTime = Math.abs(outDate - inDate)
      const totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || ''
      return totalNights
    },
    formatPriceNight() {
      return this.stay.price.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })
    },
    formatPricePerNight() {
      const night = this.formatNights > 1 ? 'nights' : 'night'
      return `${this.formatPriceNight} x ${this.formatNights} night`
      //   return this.formatPriceNight + ' x ' + this.formatNights + ' ' + night
    },
    formatTotalPrice() {
      return (this.stay.price * this.formatNights).toLocaleString('en-IN', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })
    },
    formatTotalPriceWithService() {
      return (this.stay.price * this.formatNights + 383).toLocaleString(
        'en-IN',
        {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }
      )
    },
  },
  components: {
    addGuests,
    datePicker,
    arrowDown,
    arrowUp,
    star,
    gradientButton,
  },
}
</script>
