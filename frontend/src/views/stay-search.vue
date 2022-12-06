<template>
    <section class='stay-search main'>
        <stay-list :stays="stays" :labels="labels" :date="date" />
    </section>
</template>

<script>
import stayList from '../cmps/stay-list.vue';

export default {
    name: 'stay-search',
    props: {},
    data() {
        return {
            date: {}
        }
    },
    created() {
        this.$store.commit({ type: 'setList' })
        this.loadStays()
        this.loadLabels()
        const { startDate, endDate } = this.$route.query
        this.date = { startDate, endDate }
    },
    methods: {
        async loadStays() {
            const { name, label, guests } = this.$route.query
            const capacity = (guests && JSON.parse(guests) && Object.keys(JSON.parse(guests))) ? JSON.parse(guests).capacity : 0
            const filterBy = {
                name,
                label,
                capacity
            }
            //Go to params and filter your stays
            // Talk to the store
            try {
                await this.$store.dispatch({ type: 'loadStays', filterBy })
            } catch (err) {
                console.log(err)
            }
        },
        async loadLabels() {
            try {
                await this.$store.dispatch({ type: 'loadLabels' })
            }
            catch (err) {
                throw err
            }
        }
    },
    computed: {
        stays() {
            return this.$store.getters.stays
        },
        urlChange() {
            return this.$route.query
        },
        labels() {
            return this.$store.getters.labels
        }
    },
    watch: {
        urlChange() {
            if (Object.keys(this.$route.query).length) this.loadStays()
        }
    },
    components: {
        stayList
    }
}
</script>