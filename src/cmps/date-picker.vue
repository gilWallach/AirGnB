<template>
    <div class="demo-date-picker">
        <div class="block">
            <!-- <span class="demonstration">Default</span> -->
            <el-date-picker v-model="dates" type="daterange" unlink-panels range-separator="|"
                start-placeholder="Add dates" end-placeholder="Add dates" clear-icon :prefix-icon="customPrefix"
                :disabled-date="disableDates($event)" @change="setDates" @calendar-change="showDate" format="MMM D" value-format="x"/>
        </div>
        <!-- If I want to add +- days next add :shortcuts property -->
    </div>
</template>
  
<script>

export default {
    data() {
        return {
            dates: [,],
            value1: [],
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
            console.log("🚀 ~ file: date-picker.vue:54 ~ showDate ~ dates", dates[0].toString().substring(4,10),dates[1])

            // console.log('date:',this.value1[0])
        },
        setDates(){
            // console.log(this.dates)
        },
        disableDates(){
            console.log(arguments);
        }
    },
    computed: {
        customPrefix() {
            return 'h'
        }
    }
}
</script>
<style scoped>
.demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-date-picker .block:last-child {
    border-right: none;
}

.demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>
  