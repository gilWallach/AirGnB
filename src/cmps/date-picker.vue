<template>
    <div class="demo-date-picker">
        <div class="block">
            <!-- <span class="demonstration">Default</span> -->
            <el-date-picker v-model="dates" type="daterange" range-separator=""
                start-placeholder="Add dates" end-placeholder="Add dates" clear-icon :prefix-icon="customPrefix"
                :disabled-date="disabledDate" @change="setDates" @calendar-change="showDate" format="MMM D"
                value-format="x" :editable="false" @panel-change="panelChange" />
        </div>
        <!-- If I want to add +- days next add :shortcuts property -->
    </div>
</template>
  
<script>

export default {
    data() {
        return {
            dates: [,]
        }
    },
    methods: {
        showDate(dates) {
            const inTS = new Date(dates[0])?.getTime() || null
            const outTS = new Date(dates[1])?.getTime() || null
            // if(inTS) this.dates.push(inTS)
            // if (inTS) this.dates[0] = inTS
            // if (outTS) this.dates[1] = outTS
            console.log(outTS);
            // this.dates = [inTS,outTS]
            // this.dates = dates

            // console.log('date:',this.value1[0])
        },
        setDates() {
            console.log(this.dates)
        },
        disabledDate(time) {
            const date = new Date();
            const previousDate = date.setDate(date.getDate() - 1);
            return time.getTime() <= previousDate
        },
        panelChange(date){
            const currDate = new Date(Date.now())
            const month = currDate.getMonth()
            console.log(month);
            console.log(date);
            // console.log(date[0])
        }
    },
    computed: {
        customPrefix() {
            return 'h'
        },
        isDateSelected(){
            return this.$store.getters.isDateSelected
        }
    },
    watch:{
        isDateSelected(){
        }
    }
}
</script>