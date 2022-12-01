<template>
    <section class='stay-search main'>
        <stay-list :stays="stays" />
    </section>
</template>

<script>
import stayList from '../cmps/stay-list.vue';
import { eventBus } from '../services/event-bus.service';

export default {
    name: 'stay-search',
    props: {},
    async created() {
        eventBus.on('search', this.loadStays)
        await this.loadStays()
    },
    methods: {
        async loadStays() {
            console.log(arguments)
            const { name } = this.$route.query
            console.log("🚀 ~ file: stay-search.vue:15 ~ name:", name)
            const filterBy = {
                name
            }
            //Go to params and filter your stays
            // Talk to the store
            try{
                await this.$store.dispatch({ type: 'loadStays', filterBy })
            } catch(err){
                console.log(err)
            }
        }
    },
    computed: {
        stays() {
            return this.$store.getters.stays
        }
    },
    components: {
        stayList
    }
}
</script>