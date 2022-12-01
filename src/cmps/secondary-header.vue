<template>
    <div class="secondary-header-container">
    <header class="secondary-header big-search flex align-center justify-space-between">
        <label class="flex column full">
            <p>Where</p>
            <input v-model="filterBy.name" type="text" placeholder="Search destinations">
        </label>
        <div class="break-line"></div>
        <!-- <label class="flex column">
            <p>Check in</p>
        </label>
        <div class="break-line"></div> -->
        <label class="flex column">
            <div class="check-in-out flex align-center justify-space-between">
                <p>Check in</p>
                <p>Check out</p>
            </div>
            <date-picker />
        </label>
        <div class="break-line"></div>
        <div class="add-guests-container flex-container flex align-center justify-space-between full">
            <label class="flex column">
                <p>Who</p>
                <span>Add guests</span>
            </label>
            <button @click="setFilterBy" class="search-container flex align-center justify-center">
                <search-big />
            </button>
        </div>
    </header>
</div>

</template>
<script>
import searchBig from '../assets/svg/search-big.vue';
import { eventBus } from '../services/event-bus.service';
import datePicker from './date-picker.vue';

export default {
    name: 'secondary-header',
    emits:['close-search'],
    data() {
        return {
            filterBy: {
                name: ''
            }
        }
    },
    methods: {
        setFilterBy() {
            const { name } = this.filterBy
            this.$router.push({path:'/s', query:{name}})
            // eventBus.emit('search',this.filterBy)
        }
    },
    components: {
        searchBig,
        datePicker
    }
}
</script>