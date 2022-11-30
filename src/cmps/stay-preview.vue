<template>
  <section class="stay-preview">
    <li>
      <pre>{{ stay }}</pre>
      <p>
        {{ stay.name }}
      </p>
      <p>${{ stay.price?.toLocaleString() }}</p>
      <button @click="removeStay(stay._id)">x</button>
      <button @click="updateStay(stay)">Update</button>
      <hr />
      <button @click="addStayMsg(stay._id)">Add stay msg</button>
      <button @click="printStayToConsole(stay)">Print msgs to console</button>
    </li>
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
