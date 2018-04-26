<template>
    <div class="selectCreateModel">
        <el-collapse-item title="是否选择模板" name="1">
            <div class="selectDiv">
                <div class="selectModel" :class="{selected: isSelected}" @click="isSelected = !isSelected">
                否，我要创建
                </div>
                <div class="selectModel" :class="{selected: !isSelected}" @click="isSelected = !isSelected">
                是
                </div>
                <span>(已保存的模板不能编辑，如需编辑请新建模板)</span>
            </div>
            <ModelOption></ModelOption>
        </el-collapse-item>
    </div>
</template>

<style>

.selectCreateModel .selectDiv {
    position: relative;
}
.selectCreateModel .selectDiv .selectModel {
    border-radius: 3px;
    background: rgb(220, 219, 222);
    display: inline-block;
    width: 100px;
    line-height: 30px;
    text-align: center;
    margin-left: 10px;
}

.selectCreateModel .selectDiv .selected {
    background: rgb(43, 154, 45);
    color: white;
}

.selectCreateModel .selectDiv span {
    font-size: 10px;
    color: red;
    position: absolute;
    bottom: -1px;
    padding-left: 3px;
}

</style>

<script>

import ModelOption from '../../utility/modelOption.vue'
export default {
    data() {
        return {
            isSelected: true
        }
    },
    components: {
        ModelOption
    },

    updated() {
        console.log('selected: ', this.isSelected);
        
    }
}
</script>
