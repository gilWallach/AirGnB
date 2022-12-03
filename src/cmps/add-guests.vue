<template>
    <section class='add-guests'>
        <div class="add-guests-modal flex column">
            <div class="adults-container flex justify-space-between">
                <div class="text">
                    <p>Adults</p>
                    <span>Ages 13 or above</span>
                </div>
                <div class="counter flex align-center">
                    <button
                    :disabled="!adults"
                    @click="adults--" 
                    class="round custom flex align-center justify-center">
                        <minus />
                    </button>
                    <span>{{adults}}</span>
                    <button
                    @click="adults++"  
                    class="round custom flex align-center justify-center">
                        <plus />
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import minus from '../assets/svg/minus.vue'
import plus from '../assets/svg/plus.vue'

export default {
    name: 'add-guests',
    props: {},
    data() {
        return {
            adults:0,
            children:0,
            infants:0,
        }
    },
    created() { },
    methods: {},
    computed: {},
    components: {
        minus,
        plus
    }
}
</script>