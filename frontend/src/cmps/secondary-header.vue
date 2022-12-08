<template>
    <div class="secondary-header-container">
        <header :class="{ selected: $store.getters.isElementSelected }"
            class="secondary-header big-search flex align-center justify-space-between">
            <label :class="{ selected: $store.getters.isWhereSelected }" class="flex column full where"
                @click.stop.prevent="selected('where')">
                <p>Where</p>
                <input class="where" ref="input" v-model="filterBy.name" type="text" placeholder="Search destinations">
                <location-modal @set-location="setLocation" v-if="$store.getters.isWhereSelected" />
            </label>
            <!-- <div class="flex header-dates align-center"> -->
            <!-- <div @click.stop="selected('check-in')" class="check-in flex column" -->
            <!-- :class="{ selected: $store.getters.isCheckInSelected }"> -->
            <label class="checkin flex column" @click.stop="selected('check-in')"
                :class="{ selected: $store.getters.isCheckInSelected }">
                <p>Check in</p>
                <input disabled type="text" class="dates-txt" :value="inDate" placeholder="Add dates" />
            </label>
            <!-- </div> -->
            <!-- <div @click.stop="selected('check-out')" class="checkout flex column" -->
            <!-- :class="{ selected: $store.getters.isCheckOutSelected }"> -->
            <label class="checkout flex column" @click.stop="selected('check-out')"
                :class="{ selected: $store.getters.isCheckOutSelected }">
                <p>Check out</p>
                <input disabled type="text" class="dates-txt" :value="outDate" placeholder="Add dates" />
            </label>
            <!-- </div> -->

            <!-- </div> -->
            <!-- </label> -->
            <div @click.stop="selected('who')" :class="{ selected: $store.getters.isGuestsSelected }"
                class="add-guests-container flex-container flex align-center justify-space-between full">
                <label class="flex column full">
                    <p>Who</p>
                    <input :value="guests" type="text" placeholder="Add guests" disabled />
                    <add-guests v-if="$store.getters.isGuestsSelected" @guests-update="setGuests"
                        :allGuests="filterBy.guests" />
                </label>
                <button v-if="!$store.getters.isElementSelected" @click="setFilterBy"
                    :class="{ 'element-selected': $store.getters.isElementSelected }"
                    class="custom search-container flex align-center justify-center">
                    <transition name="fade">
                        <search-big />
                    </transition>
                </button>
                <transition v-else @click="setFilterBy" class="gradient-search" name="fade">
                    <!-- <span v-if="$store.getters.isElementSelected">Search</span> -->
                    <gradient-button class="btn search" :data="data" :search-cmp="true" />
                </transition>
            </div>
            <div class="header-dates-modal flex column">
                <date-picker @set-dates="setDates" />
            </div>
        </header>
    </div>

</template>
<script>
import searchBig from '../assets/svg/search-big.vue'
import datePicker from './date-picker.vue'
import addGuests from './add-guests.vue'
import gradientButton from './gradient-button.vue'
import locationModal from './location-modal.vue'

export default {
    name: 'secondary-header',
    emits: ['close-search'],
    data() {
        return {
            filterBy: {
                name: '',
                guests: null,
                date: {
                    in: null,
                    out: null
                }
            },
            data: 'Search',
        }
    },
    created() {
        const { name, guests, startDate, endDate } = this.$route.query
        if (name) this.filterBy.name = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()
        if (guests && Object.keys(guests).length) {
            const guestsObject = JSON.parse(guests)
            this.filterBy.guests = guestsObject
        }
        if (startDate) {
            const inDate = new Date(startDate)
            const outDate = new Date(endDate)
            this.filterBy.date.in = inDate
            this.filterBy.date.out = outDate
        }
    },
    mounted() {
        if (this.$store.getters.isWhereSelected) this.$refs.input.focus()
    },
    unmounted() {
        this.unSelectElements()
    },
    methods: {
        setFilterBy() {
            const { name, date, guests } = this.filterBy
            this.$router.push({ path: '/s', query: { name, startDate: this.longDate(date.in), endDate: this.longDate(date.out), guests: JSON.stringify(guests) } })
            this.$emit('close-search')
            this.unSelectElements()
        },
        selected(el) {
            let select
            let type
            if (el === 'who') {
                select = 'isGuestsSelected'
                if (this.$store.getters.isGuestsSelected) {
                    type = 'unSelectElement'
                } else {
                    type = 'selectElement'
                    this.unSelectElements()
                }
            }
            else if (el === 'where') {
                select = 'isWhereSelected'
                if (this.$store.getters.isWhereSelected) {
                    type = 'unSelectElement'
                } else {
                    type = 'selectElement'
                    this.unSelectElements()
                    this.$refs.input.focus()
                }
            }
            else if (el === 'check-in') {
                select = 'isCheckInSelected'
                if (this.$store.getters.isCheckInSelected) {
                    type = 'unSelectElement'
                } else {
                    type = 'selectElement'
                    this.unSelectElements()
                }
            }
            else if (el === 'check-out') {
                select = 'isCheckOutSelected'
                if (this.$store.getters.isCheckOutSelected) {
                    type = 'unSelectElement'
                } else {
                    type = 'selectElement'
                    this.unSelectElements()
                }
            }
            this.$store.commit({ type, select })
        },
        setGuests(guests) {
            this.filterBy.guests = guests
        },
        setDates(dates) {
            this.filterBy.date.in = dates[0]
            this.filterBy.date.out = dates[1]
        },
        unSelectElements() {
            this.$store.commit({ type: 'unSelectElements' })
        },
        longDate(date) {
            if (!date) return ''
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            const dateObj = new Date(date)
            return dateObj.toLocaleString('en-US', options)
        },
        setLocation(location) {
            this.filterBy.name = location
        }
    },
    computed: {
        guests() {
            if (!this.filterBy.guests) return ''
            return `${this.filterBy.guests.capacity} guests`
        },
        inDate() {

            if (!this.filterBy.date.in) return ''
            const options = { month: 'short', day: 'numeric' }
            return this.filterBy.date.in.toLocaleString("en-US", options)
        },
        outDate() {

            if (!this.filterBy.date.out) return ''
            const options = { month: 'short', day: 'numeric' }
            return this.filterBy.date.out.toLocaleString("en-US", options)
        },

    },
    components: {
        searchBig,
        datePicker,
        addGuests,
        gradientButton,
        locationModal
    }
}
</script>