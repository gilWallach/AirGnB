<template>
    <div class="secondary-header-container">
        <header :class="{ selected: $store.getters.isElementSelected }"
            class="secondary-header big-search flex align-center justify-space-between">
            <label :class="{ selected: $store.getters.isWhereSelected }" class="flex column full"
                @click.stop.prevent="selected('where')">
                <p>Where</p>
                <input ref="input" v-model="filterBy.name" type="text" placeholder="Search destinations">
            </label>
            <div class="break-line"></div>
            <label class="flex column date" :class="{ selected: $store.getters.isDateSelected }"
                @click.stop.prevent="selected('date')">
                <div class="check-in-out flex align-center">
                    <p class="full">Check in</p>
                    <p class="full">Check out</p>
                </div>
                <date-picker @filter-dates="setDatesFilter" />
            </label>
            <div class="break-line"></div>
            <div @click.stop="selected('who')" :class="{ selected: $store.getters.isGuestsSelected }"
                class="add-guests-container flex-container flex align-center justify-space-between full">
                <label class="flex column full">
                    <p>Who</p>
                    <input :value="guests" type="text" placeholder="Add guests" disabled />
                    <add-guests v-if="$store.getters.isGuestsSelected" @guests-update="setCapacity" />
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
        </header>
    </div>

</template>
<script>
import searchBig from '../assets/svg/search-big.vue'
import datePicker from './date-picker.vue'
import addGuests from './add-guests.vue'
import gradientButton from './gradient-button.vue'

export default {
    name: 'secondary-header',
    emits: ['close-search'],
    data() {
        return {
            filterBy: {
                name: '',
                capacity: 0,
                date: {
                    in: null,
                    out: null
                }
            },
            data: 'Search',
        }
    },
    created() {
        const { name, capacity } = this.$route.query
        if (name) this.filterBy.name = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()
        if (capacity) this.filterBy.capacity = +capacity
    },
    mounted() {
        if (this.$store.getters.isWhereSelected) this.$refs.input.focus()
    },
    unmounted() {
        this.unSelectElements()
    },
    methods: {
        setFilterBy() {
            const { name, capacity, date } = this.filterBy
            this.$router.push({ path: '/s', query: { name, capacity, startDate: date.in, endDate: date.out } })
            this.$emit('close-search')
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
            else if (el === 'date') {
                select = 'isDateSelected'
                if (this.$store.getters.isDateSelected) {
                    type = 'unSelectElement'
                } else {
                    type = 'selectElement'
                    this.unSelectElements()
                }
            }
            this.$store.commit({ type, select })
        },
        setCapacity(capacity) {
            this.filterBy.capacity = capacity
        },
        setDatesFilter(dates) {
            this.filterBy.date.in = dates[0]
            this.filterBy.date.out = dates[1]
        },
        unSelectElements() {
            this.$store.commit({ type: 'unSelectElements' })
        }
    },
    computed: {
        guests() {
            return this.filterBy.capacity ? `${this.filterBy.capacity} guests` : ''
        },
    },
    components: {
        searchBig,
        datePicker,
        addGuests,
        gradientButton
    }
}
</script>