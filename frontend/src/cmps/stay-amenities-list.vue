<template>
  <section class="stay-amenities-list">
    <div class="amenities-container">
      <h1 class="amenities-header">What this place offers</h1>
      <div class="amenities-list">
        <!-- STATIC AMENITIES LIST -->
        <div class="amenity-item">
          <div class="amenity-logo">
            <kitchen />
          </div>
          <div class="amenity-txt">Kitchen</div>
        </div>
        <div class="amenity-item">
          <div class="amenity-logo">
            <wifi />
          </div>
          <div class="amenity-txt">Wifi</div>
        </div>
        <div class="amenity-item">
          <div class="amenity-logo">
            <tv />
          </div>
          <div class="amenity-txt">TV</div>
        </div>
        <div class="amenity-item">
          <div class="amenity-logo"><smoking-allowed /></div>
          <div class="amenity-txt">Smoking alllowed</div>
        </div>
        <div class="amenity-item">
          <div class="amenity-logo"><cooking-basics /></div>
          <div class="amenity-txt cancelled">Cooking basics</div>
        </div>
        <div class="amenity-item">
          <div class="amenity-logo"><private-entrance /></div>
          <div class="amenity-txt">Private entrance</div>
        </div>
        <div class="amenity-item">
          <div class="amenity-logo">
            <pool />
          </div>
          <div class="amenity-txt">Pool</div>
        </div>
        <div class="amenity-item">
          <div class="amenity-logo">
            <stove />
          </div>
          <div class="amenity-txt">Stove</div>
        </div>
        <div class="amenity-item">
          <div class="amenity-logo">
            <heating />
          </div>
          <div class="amenity-txt">Heating</div>
        </div>
        <div class="amenity-item">
          <div class="amenity-logo"><free-parking /></div>
          <div class="amenity-txt cancelled">Free parking</div>
        </div>
      </div>
      <div class="more-amenities">
        <div class="btn-show-amenities">
          Show all {{ this.stay.amenities?.length }} amenities
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import kitchen from '../assets/svg/kitchen.vue'
import wifi from '../assets/svg/wifi.vue'
import tv from '../assets/svg/tv.vue'
import petsAllowed from '../assets/svg/pets-allowed.vue'
import cookingBasics from '../assets/svg/cooking-basics.vue'
import smokingAllowed from '../assets/svg/smoking-allowed.vue'
import privateEntrance from '../assets/svg/private-entrance.vue'
import pool from '../assets/svg/pool.vue'
import stove from '../assets/svg/stove.vue'
import heating from '../assets/svg/heating.vue'
import freeParking from '../assets/svg/free-parking.vue'

export default {
  name: 'stay-amenities-list',
  props: {
    stay: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  components: {
    kitchen,
    wifi,
    tv,
    petsAllowed,
    cookingBasics,
    smokingAllowed,
    privateEntrance,
    pool,
    stove,
    heating,
    freeParking,
  },
}
</script>
