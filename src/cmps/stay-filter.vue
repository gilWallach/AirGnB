<template>
    <section class='stay-filter'>
        <h1>Hello from filter</h1>
        <label>
            Min price:
            <input type="range" @input="setFilterBy" v-model.number="filterBy.minPrice" min="30" max="1500" />
            <span>{{ filterBy.minPrice }}</span>
        </label>
        <label>
            Max price:
            <input type="range" @input="setFilterBy" v-model.number="filterBy.maxPrice" min="30" max="1500" />
            <span>{{ filterBy.maxPrice }}</span>
        </label>

  <el-checkbox-group @change="setFilterBy" v-model="filterBy.type">
    <el-checkbox label="Entire place" />
    <el-checkbox label="Private room" />
  </el-checkbox-group>
    </section>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'stay-filter',
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
            // console.log(filter)
            this.$store.commit({
                type: 'setFilterBy',
                filterBy: JSON.parse(JSON.stringify(filter))
            })
            this.$store.dispatch('loadStays')
        },
    },
    computed: {},
    components: {}
}
</script>