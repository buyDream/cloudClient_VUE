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
import { GetShopName } from "../../api/user";
export default {
  props: ['originValue'],
    data() {
      return {
        value: '',
        shopNames: []
      }
    },
    
    computed: {
        // value() {
        //     return 
        // }
    },

    created() {
        console.log('create ---- shop native!!!!!!!');
        
      GetShopName((success) => {
            console.log('success data:', success.results);
            success.results.forEach(element => {
                var shopItem = {"itemName": element.name, "itemValue": element.shop_id};
                this.shopNames.push(shopItem);
            });
            
        }, (failed) => {

        });
    },

    methods: {
        selectChanged() {
            this.$emit('shopNameChanged', this.value);
        }
    }
}
</script>
