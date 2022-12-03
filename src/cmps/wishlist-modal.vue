<template>
<section class="wishlist-modal">
    <div class="header flex justify-center align-center">
        <button class="close-btn custom">
            <close @click="$emit('closeModal')"/>
        </button>
        <h2 class="center-heading">Your wishlists</h2>
    </div>
    <div class="wishlist">
        <div class="line flex align-center">
            <button class="custom">
                <img src="https://a0.muscache.com/im/pictures/da1a2f06-efb0-4079-abce-0f6fc82089e0.jpg" alt="plus-sign">
            </button>
            <h2 class="center-heading">Create new wishlist</h2>
        </div>
        <div class="line flex align-center">
            <button class="custom">
                <img src="https://a0.muscache.com/im/pictures/7db51ae5-3848-4f8e-87fa-3ec70c341e33.jpg?im_w=720" alt="plus-sign">
            </button>
            <div class="info">
                <h2>December vacation</h2>
                <p>Dec 22 - Dec 29</p>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import close from '../assets/svg/close.vue'

 export default {
name: 'wishlist-modal',
  props: {},
  data() {
 return{}},
  created(){},
 methods: {},
 computed: {},
 components: {
    close,
 }
  }
 </script>