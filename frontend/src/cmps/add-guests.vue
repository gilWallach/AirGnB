<template>
    <section class='add-guests'>
        <div class="add-guests-modal flex column">
            <div class="adults-container flex justify-space-between">
                <div class="text">
                    <p>Adults</p>
                    <span>Ages 13 or above</span>
                </div>
                <div class="counter flex align-center">
                    <button :disabled="(!guests.adults)" @click.stop="updateCount('adults', -1)"
                        class="round custom flex align-center justify-center">
                        <minus />
                    </button>
                    <span>{{ guests.adults }}</span>
                    <button :disabled="(guests.capacity === 16)" @click.stop="updateCount('adults', 1)"
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
                    <button :disabled="(!guests.children || guests.capacity === 16)"
                        @click.stop="updateCount('children', -1)" class="round custom flex align-center justify-center">
                        <minus />
                    </button>
                    <span>{{ guests.children }}</span>
                    <button :disabled="(guests.capacity === 16)" @click.stop="updateCount('children', 1)"
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
                    <button :disabled="(!guests.infants)" @click.stop="updateCount('infants', -1)"
                        class="round custom flex align-center justify-center">
                        <minus />
                    </button>
                    <span>{{ guests.infants }}</span>
                    <button :disabled="(guests.capacity === 21)" @click.stop="updateCount('infants', 1)"
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
    emits: ['guests-update'],
    props: {
        allGuests: {
            type: Object
        }
    },
    data() {
        return {
            guests: this.allGuests || {
                adults: 0,
                children: 0,
                infants: 0,
                capacity: 0,
            },
        }
    },
    created() {
        const { guests } = this.$route.query
        if (guests && JSON.parse(guests) && Object.keys(JSON.parse(guests)).length) this.guests = JSON.parse(guests)
    },
    methods: {
        updateCount(type, diff) {
            this.guests[type] += diff
            this.guests.capacity += diff
            this.$emit('guests-update', { ...this.guests })
        }
    },
    computed: {
        // getCapacity() {
        //     return this.guests.adults + this.guests.children + this.guests.infants
        // }
    },
    components: {
        minus,
        plus
    }
}
</script>