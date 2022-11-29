<template>
    <section class='stay-list'>
        <div class="list-header">
            <stay-filter/>
        </div>        
    </section>
</template>

<script>
    import stayFilter from './stay-filter.vue'
export default {
    name: 'stay-list',
    props: {},
    data() {
        return {}
    },
    created() { },
    methods: {},
    computed: {},
    components: {
        stayFilter,
    }
}
</script>