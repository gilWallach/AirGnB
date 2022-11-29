<template>
    <section class='stay-preview'>
        <ul class="stay-list">
            <li v-for="stay in stays" :key="stay._id">
                <p>
                    {{ stay.name }}
                </p>
                <p>
                    ${{ stay.price?.toLocaleString() }}
                </p>
                <button @click="removeStay(stay._id)">x</button>
                <button @click="updateStay(stay)">Update</button>
                <hr />
                <button @click="addStayMsg(stay._id)">Add stay msg</button>
                <button @click="printStayToConsole(stay)">Print msgs to console</button>
            </li>
        </ul>
    </section>
</template>
<script>
export default {
    name: 'stay-preview',
    props: {},
    data() {
        return {}
    },
    created() { },
    methods: {},
    computed: {},
    components: {}
}
</script>