<template>
<section class='stay-carousel'>
    <el-carousel trigger="click" :autoplay="false">
      <el-carousel-item v-for="img in stay.imgUrls" :key="img" >
        <img :src="img" alt="stay imgs" class="card-image">
      </el-carousel-item>
    </el-carousel>
</section>
</template>
<script>
 export default {
name: 'stay-carousel',
  props: [
    'stay'
  ],
  data() {
 return{}},
  created(){},
 methods: {},
 computed: {},
 components: { 
 }
  }
 </script>