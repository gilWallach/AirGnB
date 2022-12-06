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
                        <span>{{ order.checkInDate }} - {{ order.checkOutDate }}</span>
                    </li>
                    <li>
                        <h3>Guests:</h3>
                        <span>{{ order.guests }} adult</span>
                        <!-- <span v-if="order.adults">{{order.adults}} adult</span> -->
                        <!-- <span v-if="order.children">{{order.children}} children</span> -->
                        <!-- <span v-if="order.infants">{{order.infants}} infants</span> -->
                    </li>
                    <li>
                        <h3>Price Details</h3>
                        <p class="flex align-center justify-space-between"><span>{{ pricePerNight }}</span>
                            <span>{{ this.order.price }}</span>
                        </p>
                        <p class="flex align-center justify-space-between"><span>Service fee</span> <span>$383</span>
                        </p>
                    </li>
                    <li class="flex align-center justify-space-between">
                        <span>Total</span><span>{{ priceWithService }}</span></li>
                </ul>
            </div>
            <div class="reservation-image"></div>
        </div>
        <div class="confirmation-btns flex align-center justify-center">
            <button>Back</button>
            <gradient-button :data="'Confirm'" />
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
                checkInDate: null,
                checkOutDate: null,
                guests: 0,
                price: 0,
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
        this.order.checkInDate = checkInDate
        this.order.checkOutDate = checkOutDate
        this.order.guests = guests
        this.order.price = price
        this.order.totalNights = totalNights
        this.pricePerNight = pricePerNight
        this.priceWithService = priceWithService
    },
    methods: {},
    computed: {
        stay() {
            return this.$store.getters.selectedStay
        },
        formatPricePerNight() {
            const { totalNights } = this.order
            const night = totalNights > 1 ? 'nights' : 'night'
            return this.stay.price.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'USD',
                maximumSignificantDigits: 1,
            }) + ' x ' + totalNights + ' ' + night
        },
    },
    components: {
        gradientButton
    }
}
</script>