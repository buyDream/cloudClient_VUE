<template>
    <el-radio-group v-model="item" @change="selectRadio">
        <template v-if="radioType === 'inShopType'">
            <el-radio-button v-for="(item, index) in optionalDic" :label="index + 1" :key="index">{{item}}</el-radio-button>
        </template>
        <template v-else>
            <el-radio v-for="(item, index) in optionalDic" :label="index + 1" :key="index" >{{item}}</el-radio>
        </template>
        
    </el-radio-group>
</template>


<script>
const inShopItems = ['关键词进店', '淘口令', '二维码']
const wwItems = ['需要旺旺聊天', '不需要旺旺聊天']
const genderItems = ['不限', '男', '女']
export default {
    props: ['radioType', 'normalValue'],
    data() {
        return {
            item: this.normalValue,
            key: null
        }
    },

    computed: {
        optionalDic: function() {
            if (this.radioType === 'wwType') {
                return wwItems;
            } else if (this.radioType === 'inShopType') {
                return inShopItems;
            } else if (this.radioType == 'genderType'){
                return genderItems;
            }

        },
    },

    watch: {
        normalValue: function(newValue, oldValue) {
            this.item = newValue;
        }
    },

    methods: {
        selectRadio(val) {
            this.$emit('selectRadio', {index: val, radioType: this.radioType});
        }
    },
    mounted() {
        console.log('selec mounted normalValue: ', this.normalValue);
    },

    updated() {
        console.log('selec update normalValue', this.normalValue);
        
    }
  
}
</script>

<style>
.el-radio-button .el-radio-button__inner {
    padding: 12px 50px;
}
</style>
