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
                    :disabled="(!adults)"
                    @click.stop="updateCount('adults',-1)" 
                    class="round custom flex align-center justify-center">
                        <minus />
                    </button>
                    <span>{{adults}}</span>
                    <button
                    :disabled="(capacity === 16)"
                    @click.stop="updateCount('adults',1)"  
                    class="round custom flex align-center justify-center">
                        <plus />
                    </button>
                </div>
            </div>
            <div class="children-container flex justify-space-between">
                <div class="text">
                    <p>Children</p>
                    <span>Ages 2-12</span>
                </div>
                <div class="counter flex align-center">
                    <button
                    :disabled="(!children || capacity === 16)"
                    @click.stop="updateCount('children',-1)" 
                    class="round custom flex align-center justify-center">
                        <minus />
                    </button>
                    <span>{{children}}</span>
                    <button
                    :disabled="(capacity === 16)"
                    @click.stop="updateCount('children',1)"  
                    class="round custom flex align-center justify-center">
                        <plus />
                    </button>
                </div>
            </div>
            <div class="infants-container flex justify-space-between">
                <div class="text">
                    <p>Infants</p>
                    <span>Under 2</span>
                </div>
                <div class="counter flex align-center">
                    <button
                    :disabled="(!infants)"
                    @click.stop="updateCount('infants',-1)" 
                    class="round custom flex align-center justify-center">
                        <minus />
                    </button>
                    <span>{{infants}}</span>
                    <button
                    :disabled="(capacity === 21)"
                    @click.stop="updateCount('infants',1)"  
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
    emits:['guests-update'],
    props: {},
    data() {
        return {
            adults:0,
            children:0,
            infants:0,
            capacity:0
        }
    },
    created() { },
    methods: {
        updateCount(type,diff){
            this[type] += diff
            this.capacity += diff
            this.$emit('guests-update',this.capacity)
        }
    },
    computed: {},
    components: {
        minus,
        plus
    }
}
</script>