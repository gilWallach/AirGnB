<template>
        <header class="secondary-header big-search flex align-center justify-space-between">
            <label class="flex column full">
                <p>Where</p>
                <input type="text" placeholder="Search destinations">
            </label>
            <div class="break-line"></div>
            <label class="flex column">
                <p>Check in</p>
                <span>Add dates</span>
                <input type="date">
            </label>
            <div class="break-line"></div>
            <label class="flex column">
                <p>Check out</p>
                <span>Add dates</span>
                <input type="date">
            </label>
            <div class="break-line"></div>
            <div class="flex-container flex align-center justify-space-between full">
                <label class="flex column">
                    <p>Who</p>
                    <span>Add guests</span>
                </label>
                <div class="search-container flex align-center justify-center">
                    <search-big />
                </div>
            </div>
        </header>
</template>
<script>
import searchBig from '../assets/svg/search-big.vue';

export default {
    name: 'secondary-header',
    components: {
        searchBig
    }
}
</script>