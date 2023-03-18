<template>
    <section>
        <wishlist-modal v-if="isWishlist" @closeModal="$emit('closeModal')" :stayId="stayId"/>
        <filter-modal v-else @closeModal="$emit('closeModal')" @filter="filter"/>
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
        stayId: {
            type: String,
        },
    },
    emits: ['closeModal', 'filter'],
    methods: {
        filter(filterBy){
            this.$emit('filter',filterBy)
        }
    },
    computed: {},
    components: {
        close,
        wishlistModal,
        filterModal,
    }
}
</script>