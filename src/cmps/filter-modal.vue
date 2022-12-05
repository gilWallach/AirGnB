<template>
    <section class="list-modal">
        <div class="header flex justify-center align-center">
            <button class="close-btn custom">
                <close @click="$emit('closeModal')" />
            </button>
            <h2 class="center-heading">Filters</h2>
        </div>
        <div class="filters-container">
            <h1>Hello from filter</h1>
        </div>

        <!-- <el-checkbox-group @change="setFilterBy" v-model="filterBy.type">
            <el-checkbox label="Entire place" />
            <el-checkbox label="Private room" />
        </el-checkbox-group> -->

    </section>
</template>

<script>
// import { ref } from 'vue'

import close from '../assets/svg/close.vue'

export default {
    name: 'filter-modal',
    props: {},
    data() {
        return {
            // filterBy: {
            //     minPrice: 0,
            //     maxPrice: 1500,
            //     type: ref([]),
            // },
        }
    },
    created() {},
    methods: {
        // setFilterBy() {
        //     var filter = this.filterBy
        //     // console.log(filter)
        //     this.$store.commit({
        //         type: 'setFilterBy',
        //         filterBy: JSON.parse(JSON.stringify(filter))
        //     })
        //     this.$store.dispatch('loadStays')
        // },
    },
    computed: {},
    components: {
        close,
    }
}
</script>