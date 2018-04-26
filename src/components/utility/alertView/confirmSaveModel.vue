<template>

    <el-dialog
    title="提示"
    :visible="visiable"
    @close="closeView(false)"
    width="30%"
    :show-close="false"
    center>
        <el-form :model="form" ref="form">
            <el-form-item 
                prop="modelName" 
                :rules="[
                { required: true, message: '标题不能为空'},
                ]">
                <span>请填写保存模板的名称</span>
                <el-input v-model="form.modelName"></el-input>
            </el-form-item>
            <el-form-item>
                    <el-button type="primary" @click="closeView(true, 'form')" native-type="submit" style="width:100%">保 存</el-button>
            </el-form-item>
        </el-form>

    </el-dialog>
</template>
<script>

// import bus from '../../../assets/Global.js'
import bus from '../../../assets/Global.js'
export default {
    props: ['visiable', 'form'],
    data() {
        return {
            // form: {
            //     modelName: this.passValue,
            // }
        }
    },

    methods: {
        closeView(concern, formName) {
            if (concern) { // 保存
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('convertModelTitle', this.form.modelName);
                    } else {
                        return false;
                    }
                });
            } else { // 点击背景
                this.$emit('convertModelTitle', '');
            }
            
        },

    },

    mounted() {
        console.log('mounted passvalue: ', this.passValue);
        console.log('mounted passvalue form: ', this.form.modelName);
    }
}
</script>

<style scoped>


</style>

