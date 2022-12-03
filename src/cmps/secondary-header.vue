<template>
    <div @click="unSelectElements" class="secondary-header-container">
        <header :class="{ selected: $store.getters.isElementSelected }"
            class="secondary-header big-search flex align-center justify-space-between">
            <label :class="{ selected: $store.getters.isWhereSelected }" class="flex column full"
                @click.stop="selected('where')">
                <p>Where</p>
                <input v-model="filterBy.name" type="text" placeholder="Search destinations">
            </label>
            <div class="break-line"></div>
            <label class="flex column date" :class="{ selected: $store.getters.isDateSelected }" @click.stop="selected('date')">
                <div class="check-in-out flex align-center">
                    <p class="full">Check in</p>
                    <p class="full">Check out</p>
                </div>
                <date-picker />
            </label>
            <div class="break-line"></div>
            <div @click.stop="selected('who')" :class="{ selected: $store.getters.isGuestsSelected }"
                class="add-guests-container flex-container flex align-center justify-space-between full">
                <label class="flex column full">
                    <p>Who</p>
                    <input :value="guests" type="text" placeholder="Add guests" disabled />
                    <add-guests v-if="$store.getters.isGuestsSelected" @guests-update="setCapacity" />
                </label>
                <button @click="setFilterBy" :class="{ 'element-selected': $store.getters.isElementSelected }"
                    class="search-container flex align-center justify-center">
                    <search-big />
                    <transition name="fade">
                        <span v-if="$store.getters.isElementSelected">Search</span>
                    </transition>
                </button>
            </div>
        </header>
    </div>

</template>
<script>
import searchBig from '../assets/svg/search-big.vue'
import datePicker from './date-picker.vue'
import addGuests from './add-guests.vue'

export default {
    name: 'secondary-header',
    emits: ['close-search'],
    data() {
        return {
            filterBy: {
                name: '',
                capacity: 0,
            },
        }
    },
    created() {
        const { name, capacity } = this.$route.query
        if (name) this.filterBy.name = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()
        if (capacity) this.filterBy.capacity = +capacity
    },
    methods: {
        setFilterBy() {
            const { name, capacity } = this.filterBy
            this.$router.push({ path: '/s', query: { name, capacity } })
            this.$emit('close-search')
        },
        selected(el) {
            let select
            if (el === 'who') select = 'isGuestsSelected'
            else if (el === 'where') select = 'isWhereSelected'
            else select = 'isDateSelected'
            this.$store.commit({ type: 'toggleElement', select })
        },
        setCapacity(capacity) {
            this.filterBy.capacity = capacity
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
        addGuests
    }
}
</script>