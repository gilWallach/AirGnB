<template>
    <section>
        <wishlist-modal v-if="isWishlist" @closeModal="$emit('closeModal')"/>
        <filter-modal v-else @closeModal="$emit('closeModal')"/>
    </section>
</template>

<script>
import close from '../assets/svg/close.vue'
import wishlistModal from './wishlist-modal.vue'
import filterModal from './filter-modal.vue'

export default {
    name: 'list-modal',
    props: {
        isWishlist: {
            type: Boolean,
        },
    },
    data() {
        return {}
    },
    created() {
    },
    methods: {
    },
    computed: {},
    components: {
        close,
        wishlistModal,
        filterModal,
    }
}
</script>