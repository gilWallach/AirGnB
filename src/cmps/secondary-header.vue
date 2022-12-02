<template>
    <div class="secondary-header-container">
        <header 
        :class="{selected:isElementSelected}"
        class="secondary-header big-search flex align-center justify-space-between">
            <label class="flex column full" ref="where" @click="selected('where')">
                <p>Where</p>
                <input v-model="filterBy.name" type="text" placeholder="Search destinations">
            </label>
            <div class="break-line"></div>
            <label class="flex column date" ref="date" @click="selected('date')">
                <div class="check-in-out flex align-center">
                    <p class="full">Check in</p>
                    <p class="full">Check out</p>
                </div>
                <date-picker />
            </label>
            <div class="break-line"></div>
            <div ref="who" @click="selected('who')"
                class="add-guests-container flex-container flex align-center justify-space-between full">
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
import datePicker from './date-picker.vue';

export default {
    name: 'secondary-header',
    emits: ['close-search'],
    data() {
        return {
            filterBy: {
                name: ''
            },
            isElementSelected:false
        }
    },
    methods: {
        setFilterBy() {
            const { name } = this.filterBy
            this.$router.push({ path: '/s', query: { name } })
        },
        selected(type) {
            const els = this.$refs
            for(const key in els){
                els[key].classList.remove('selected')
            }
            this.$refs[type].classList.add('selected')
            this.isElementSelected = true
        }
    },
    components: {
        searchBig,
        datePicker
    }
}
</script>