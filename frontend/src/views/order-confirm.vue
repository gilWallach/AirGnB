<template>
    <section class='order-confirm main-container-stay-details'>
        <h1 class="header fs22">One last step</h1>
        <p>Dear guest,</p>
        <p>In order to complete your reservation, please confirm your trip details</p>
        <div class="content-container flex justify-space-between align-center">
            <div class="reservation-details">
                <h2>Reservation details</h2>
                <ul class="clean-list">
                    <li>
                        <h3>Trip dates:</h3>
                        <span>{{ order.startDate }} - {{ order.endDate }}</span>
                    </li>
                    <li class="flex column">
                        <h3>Guests:</h3>
                        <span v-if="order.guests.adults">{{ order.guests.adults }} adult</span>
                        <span v-if="order.guests.children">{{ order.guests.children }} children</span>
                        <span v-if="order.guests.infants">{{ order.guests.infants }} infants</span>
                    </li>
                    <li>
                        <h3>Price Details</h3>
                        <p class="flex align-center justify-space-between"><span>{{ pricePerNight }}</span>
                            <span>{{ this.order.totalPrice }}</span>
                        </p>
                        <p class="flex align-center justify-space-between"><span>Service fee</span> <span>$383</span>
                        </p>
                    </li>
                    <li class="flex align-center justify-space-between">
                        <span>Total</span><span>{{ priceWithService }}</span>
                    </li>
                </ul>
            </div>
            <div class="reservation-image"></div>
        </div>
        <div class="confirmation-btns flex align-center justify-center">
            <button>Back</button>
            <gradient-button :data="'Confirm'" @click="setOrder" />
        </div>
    </section>
</template>
<script>
import gradientButton from '../cmps/gradient-button.vue'

export default {
    name: 'order-confirm',
    props: {},
    data() {
        return {
            order: {
                startDate: null,
                endDate: null,
                guests: 0,
                totalPrice: 0,
                totalNights: 0
            },
            pricePerNight: '',
            priceWithService: ''
        }
    },
    async created() {
        this.$store.commit({ type: 'setDetails' })
        const { id } = this.$route.params
        try {
            await this.$store.dispatch({ type: 'loadStay', id })
        } catch (err) {
            throw err
        }
        const { guests, checkInDate, checkOutDate, totalNights, price, pricePerNight, priceWithService } = this.$route.query
        this.order.startDate = checkInDate
        this.order.endDate = checkOutDate
        this.order.guests = JSON.parse(guests)
        this.order.totalPrice = price
        this.order.totalNights = totalNights
        this.pricePerNight = pricePerNight
        this.priceWithService = priceWithService
    },
    methods: {
        async setOrder() {
            const order = { ...this.order }
            order.totalPrice = +order.totalPrice.substring(1)
            order.status = 'pending'
            order.msgs = []
            const { _id, name, price, host } = this.stay
            const { _id: hostId, fullname, thumbnailUrl } = host
            order.host = { _id: hostId, fullname, thumbnailUrl }
            const miniStay = { _id, name, price }
            order.stay = miniStay
            try {
                await this.$store.dispatch({ type: 'addOrder', order })
            } catch (err) {
                throw err
            }
        }
    },
    computed: {
        stay() {
            return this.$store.getters.selectedStay
        },
    },
    components: {
        gradientButton
    }
}
</script>