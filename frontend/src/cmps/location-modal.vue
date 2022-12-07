<template>
    <div class="location-container flex" bis_skin_checked="1">
        <div class="popup-lt-side flex" bis_skin_checked="1">
            <div class="lt map-header" bis_skin_checked="1">Search by region</div>
            <div class="maps-wrapper" bis_skin_checked="1">
                <div class="map-loc" bis_skin_checked="1" @click="$emit('setLocation','United States')">
                    <div class="img-con" bis_skin_checked="1"
                        style="background-image: url(https://res.cloudinary.com/nisan/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency//v1659373328/air2b/united-state_heslmk.jpg);">
                    </div><span>United States</span>
                </div>
                <div class="map-loc" bis_skin_checked="1">
                    <div class="img-con" bis_skin_checked="1"
                        style="background-image: url(https://res.cloudinary.com/nisan/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency//v1659373329/air2b/flexible_uyzxif.jpg);">
                    </div><span>Canada</span>
                </div>
                <div class="map-loc" bis_skin_checked="1">
                    <div class="img-con" bis_skin_checked="1"
                        style="background-image: url(https://res.cloudinary.com/nisan/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency//v1659373328/air2b/middle-east_x0suwb.jpg)">
                    </div><span>Spain</span>
                </div>
                <div class="map-loc" bis_skin_checked="1">
                    <div class="img-con" bis_skin_checked="1"
                        style="background-image: url(https://res.cloudinary.com/nisan/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency//v1659373328/air2b/italy_tyogsw.jpg);">
                    </div><span>Australia</span>
                </div>
                <div class="map-loc" bis_skin_checked="1">
                    <div class="img-con" bis_skin_checked="1"
                        style="background-image: url(https://res.cloudinary.com/nisan/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency//v1659373328/air2b/france_ehe9fl.jpg);">
                    </div><span>Portugal</span>
                </div>
                <div class="map-loc" bis_skin_checked="1">
                    <div class="img-con" bis_skin_checked="1"
                        style="background-image: url(https://res.cloudinary.com/nisan/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency//v1659373328/air2b/south-america_fytw85.jpg);">
                    </div><span>Maui</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'location-modal',
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