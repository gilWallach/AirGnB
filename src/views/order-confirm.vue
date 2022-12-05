<template>
    <section class='order-confirm main-container-stay-details'>
        <h1>Confirm your order</h1>
    </section>
</template>
<script>
export default {
    name: 'order-confirm',
    props: {},
    data() {
        return {}
    },
    created() {
        this.$store.commit({ type: 'setDetails' })
    },
    methods: {},
    computed: {},
    components: {}
}
</script>