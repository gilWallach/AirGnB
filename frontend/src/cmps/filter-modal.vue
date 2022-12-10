<template>
    <section class="list-modal">
        <div class="header flex justify-center align-center">
            <button class="close-btn custom">
                <close @click="$emit('closeModal')" />
            </button>
            <h2 class="center-heading">Filters</h2>
        </div>
        <HistogramSlider style="margin: 200px auto" :width="300" :bar-height="100" :data="prices"
            :drag-interval="true" :force-edges="false" :colors="['#4facfe', '#00f2fe']"
            :min="0" :max="maxPrice" @finish="setMinMax" />
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
        <footer class="filter-modal footer flex justify-space-between align-center">
            <button>Clear all</button>
            <button @click="$emit('do-filter',this.filterBy)">Show Homes</button>
        </footer>
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
    created() { 
        console.log(Math.max(...this.prices))
    },
    methods: {
        setFilterBy() {
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
        setMinMax(slider){
            this.filterBy.minPrice = slider.from
            this.filterBy.maxPrice = slider.to
            console.log(this.filterBy);
        }
    },
    computed: {
        prices(){
            return this.$store.getters.stays.map(stay=>stay.price)
        },
        maxPrice(){
            return Math.max(...this.prices)
        }
    },
    components: {
        close,
    }
}
</script>