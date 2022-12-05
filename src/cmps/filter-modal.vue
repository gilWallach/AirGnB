<template>
    <section class="list-modal">
        <div class="header flex justify-center align-center">
            <button class="close-btn custom">
                <close @click="$emit('closeModal')" />
            </button>
            <h2 class="center-heading">Filters</h2>
        </div>
        <div class="filters-container">
            <!-- <div class="line">
                <HistogramSlider :width="600" :bar-height="100" :data="data" />
            </div> -->
        </div>

        <el-checkbox-group @change="setFilterBy" v-model="filterBy.type">
            <el-checkbox label="Entire place" />
            <p>A place all to yourself</p>
            <el-checkbox label="Private room" />
            <p>Your own room in a home or a hotel, plus some shared common spaces</p>
            <el-checkbox label="Shared room" />
            <p>A sleeping space and common areas that may be shared with others</p>
        </el-checkbox-group>

    </section>
</template>

<script>
// import { ref } from 'vue'

import close from '../assets/svg/close.vue'
import { ref } from 'vue'

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
                type: ref([]),
            },
        }
    },
    created() { },
    methods: {
        setFilterBy() {
            var filter = this.filterBy
            console.log(filter.type)
            // this.$store.commit({
            //     type: 'setFilterBy',
            //     filterBy: JSON.parse(JSON.stringify(filter))
            // })
            // this.$store.dispatch('loadStays')
        },
    },
    computed: {},
    components: {
        close,
        // HistogramSlider,
    }
}
</script>