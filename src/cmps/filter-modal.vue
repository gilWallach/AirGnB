<template>
    <section class="list-modal">
        <div class="header flex justify-center align-center">
            <button class="close-btn custom">
                <close @click="$emit('closeModal')" />
            </button>
            <h2 class="center-heading">Filters</h2>
        </div>
        <!-- <div class="filters-container">
            <form @submit.prevent="setFilterBy">
                <div>
                    <legend>Type of place</legend>
                    <input v-model="filterBy.roomType" type="checkbox" name="roomType" value="Entire place">Entire place<br>
                    <p>A place all to yourself</p>
                    <input v-model="filterBy.roomType" type="checkbox" name="roomType" value="Private room">Private room<br>
                    <p>Your own room in a home or a hotel, plus some shared common spaces</p>
                    <input v-model="filterBy.roomType" type="checkbox" name="roomType" value="Shared room">Shared room<br>
                    <p>A sleeping space and common areas that may be shared with others</p>
                    <br>
                    <input type="submit" value="Submit now">
                </div>
            </form>
        </div> -->
    </section>
</template>

<script>
// import { ref } from 'vue'

import close from '../assets/svg/close.vue'

// import Vue from 'vue'
// import HistogramSlider from 'vue-histogram-slider'
// import 'vue-histogram-slider/dist/histogram-slider.css'
// Vue.component(HistogramSlider.name, HistogramSlider)

export default {
    name: 'filter-modal',
    props: {},
    data() {
        return {
            filterBy: {
                minPrice: 0,
                maxPrice: 1500,
                roomType: [],
            },
        }
    },
    created() { },
    methods: {
        setFilterBy() {
            var filter = this.filterBy
            console.log(filter)
            // this.$store.commit({
            //     type: 'setFilterBy',
            //     filterBy: JSON.parse(JSON.stringify(filter))
            // })
            // this.$store.dispatch('loadStays')
            this.filterBy = {
                minPrice: 0,
                maxPrice: 1500,
                roomType: [],
            }
        },
    },
    computed: {},
    components: {
        close,
        // HistogramSlider,
    }
}
</script>