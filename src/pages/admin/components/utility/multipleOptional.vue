<template>
    <el-checkbox-group 
        v-model="requirement"
        :min="0"
        :max="5" class="inlineBlock">
        <el-checkbox v-for="(multipleItem, index) in multipleOptioalItems" :label="index + 1" :key="multipleItem" @change="didSelect">{{multipleItem}}</el-checkbox>
    </el-checkbox-group>
</template>

<script>
const activityRequirements = ['收藏宝贝', '加购物车', '分享二维码', '分享淘口令', '关注店铺', '领优惠券']
export default {
    props: ['multipleOptioalType', 'originValue'],
    data() {
        return {
            activityRequirements: activityRequirements,
            requirement: [],
        }
    },
    computed: {
        multipleOptioalItems: function() {
            if (this.multipleOptioalType === 'activityRequirement') { // 活动需求
                return activityRequirements
            } else {
                
            }
        },
        // requirement() {
        //     return this.bindValue;
        // }
    },

    watch: {
        originValue: function(newValue, oldValue) {
            this.requirement = newValue;
        }
    },

    methods: {
        didSelect() {
            this.$emit('selectorOptional', this.requirement);
        }
    },
}
</script>
