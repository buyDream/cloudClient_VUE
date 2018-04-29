<template>
    <el-date-picker
      v-model="modelValue"
      align="right"
      type="date"
      placeholder="选择日期"
      value-format="timestamp"
      @change="selectDate">
    </el-date-picker>

</template>

<script>
export default {
  props: ['value'],
  watch: {
    value(newValue, oldValue) {
      this.modelValue = newValue;
    }
  },
    data() {
      return {
        modelValue: '',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        // value: '',
      };
    },
    // watch()

    methods: {
      selectDate() {
		  console.log('date: ', typeof this.modelValue);
        // this.value = this.modelValue * 0.001;
        this.$emit('selectDate', this.modelValue);
      }
    },

    created() {
      this.modelValue = this.value;
    }
}
</script>
