<template>
  <section class="stay-preview">
    <router-link :to="`/stay/${stay._id}`">
      <li class="card">
        <div class="img-container">
          <img :src="stay.imgUrls[0]" alt="">
        </div>
        <p>{{ stay.name }}</p>
        <p>Capacity: {{ stay.capacity }}</p>
        <p>Dec 4-9</p>
        <p>${{ stay.price?.toLocaleString() }} night</p>
        <!-- <button @click="removeStay(stay._id)">x</button>
        <button @click="updateStay(stay)">Update</button> -->
        <!-- <hr />
        <button @click="addStayMsg(stay._id)">Add stay msg</button>
        <button @click="printStayToConsole(stay)">Print msgs to console</button> -->
      </li>
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'stay-preview',
  props: {
    stay: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  components: {},
}
</script>
