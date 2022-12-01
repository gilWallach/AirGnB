<template>
    <div class="demo-date-picker">
        <div class="block">
            <!-- <span class="demonstration">Default</span> -->
            <el-date-picker v-model="dates" type="daterange" range-separator="|"
                start-placeholder="Add dates" end-placeholder="Add dates" clear-icon :prefix-icon="customPrefix"
                :disabled-date="disabledDate" @change="setDates" @calendar-change="showDate" format="MMM D"
                value-format="x" />
        </div>
        <!-- If I want to add +- days next add :shortcuts property -->
    </div>
</template>
  
<script>

export default {
    data() {
        return {
            dates: [,],
            shortcuts: [
                {
                    text: 'Last week',
                    value: () => {
                        end = new Date()
                        start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        return [start, end]
                    },
                },
                {
                    text: 'Last month',
                    value: () => {
                        end = new Date()
                        start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        return [start, end]
                    },
                },
                {
                    text: 'Last 3 months',
                    value: () => {
                        end = new Date()
                        start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        return [start, end]
                    },
                },
            ]
        }
    },
    methods: {
        showDate(dates) {
            const inTS = new Date(dates[0])?.getTime() || null
            const outTS = new Date(dates[1])?.getTime() || null
            // if(inTS) this.dates.push(inTS)
            if (inTS) this.dates[0] = inTS
            if (outTS) this.dates[1] = outTS
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
        }
    },
    computed: {
        customPrefix() {
            return 'h'
        },
    }
}
</script>