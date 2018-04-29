<template>
    <el-select v-model="value" placeholder="请选择" size="medium" @change="selectChanged">
        <el-option
        v-for="item in shopNames"
        :key="item.itemName"
        :label="item.itemName"
        :value="item.itemValue">
        </el-option>
    </el-select>
</template>

<style>
/* .el-select > .el-input {
    display: inline-block;
} */
</style>

<script>
import { GetShopName } from "../../../../api/user";
export default {
  props: ['originValue'],
    data() {
      return {
        value: '',
        shopNames: []
      }
    },

    watch: {
        originValue: function(newValue, oldValue) {
            this.value = this.originValue;
        }
    },

    created() {
        
        console.log('----------created----');
        
        GetShopName((success) => {
            console.log('success data:', success.results);
            success.results.forEach(element => {
                var shopItem = {"itemName": element.name, "itemValue": element.shop_id};
                this.shopNames.push(shopItem);
            });
            
        }, (failed) => {

        });
    },

    updated() { 
        // 这里直接带初始值进来 watch 是为了更新值变化
        if (this.originValue !== undefined) this.value = this.originValue;
    },

    methods: {
        selectChanged() {
            this.$emit('shopNameChanged', this.value);
        }
    }
}
</script>
