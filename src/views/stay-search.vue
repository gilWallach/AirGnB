<template>
    <section class='stay-search main'>
        <stay-list :stays="stays" :labels="labels"/>
    </section>
</template>

<script>
import stayList from '../cmps/stay-list.vue';

export default {
    name: 'stay-search',
    props: {},
    created() {
        this.$store.commit({type:'setList'})
        this.loadStays()
        this.loadLabels()
    },
    methods: {
        async loadStays() {
            const { name, label , capacity } = this.$route.query
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
            try{
                await this.$store.dispatch({ type: 'loadLabels' })
            }
            catch(err){
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