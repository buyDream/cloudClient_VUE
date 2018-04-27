<template>
    <div class="modelOption">
        
        <div class="modelItem borderColor inlineBlock" v-for="item in modelItems" :key="item.value">
            {{ item.text }}
            <!-- <i class="el-icon-setting"></i> -->
        </div>
    </div>
</template>


<style>

.modelOption {
    margin-top: 23px;
}
.modelOption .modelItem {
    margin-left: 10px;
    margin-right: 10px;
    padding: 4px 18px;
    font-size: 11px;
}

</style>

<script>
export default {
  data() {
        return {
            modelItems: [
                {text: '模板①', value: 0 },
                {text: '模板②', value: 1 },
                {text: '模板③', value: 2 },
                {text: '模板④', value: 3 },
            ]
        }
  },

  mounted() {
      console.log('11111');
      
      console.log(this.modelItems[1]);
  }
}
</script>
