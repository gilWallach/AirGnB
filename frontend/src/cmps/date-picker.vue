<template>
    <div class="demo-date-picker">
        <div class="block">
            <el-date-picker v-model="dates" type="daterange" range-separator="" start-placeholder="Add dates"
                end-placeholder="Add dates" clear-icon :prefix-icon="customPrefix" :disabled-date="disabledDate"
                @calendar-change="showDate" format="MMM D" value-format="MM/DD/YYYY"
                :editable="false" @panel-change="panelChange" :popper-class="setPopperClass" id="io"
                :teleported="false" />
        </div>
        <!-- If I want to add +- days next add :shortcuts property -->
    </div>
</template>
  
<script>

export default {
    data() {
        return {
            dates: [,],
            isCurrMonth: true
        }
    },
    methods: {
        showDate(dates) {
            this.$emit('set-dates', dates)
        },
        disabledDate(time) {
            const date = new Date();
            const previousDate = date.setDate(date.getDate() - 1);
            return time.getTime() <= previousDate
        },
        panelChange(date) {
            const currDate = new Date(Date.now())
            const month = currDate.getMonth()
            this.isCurrMonth = month === date[0].getMonth() ? true : false
        }
    },
    computed: {
        customPrefix() {
            return 'h'
        },
        setPopperClass() {
            return this.isCurrMonth ? 'curr-month' : ''
        }
    },
}
</script>