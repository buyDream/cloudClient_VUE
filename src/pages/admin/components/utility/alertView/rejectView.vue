<template>
    <!-- <div class="rejectAlertView"> -->

    
    <el-dialog
        title="提示"
        :visible="rejectVisiable"
        @close="closeView"
        width="40%"
        center>
        <div>是什么原因真的要驳回吗？点击“驳回”将向卖家发送驳回通知，让买家重新提交信息！</div>
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请填写驳回原因"
            v-model="textarea">
        </el-input>

        <div slot="footer" class="dialog-footer">
            <el-button type="warning" @click="clickSureButton(1)">驳回</el-button>
            <el-button type="info" @click="clickSureButton(2)">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: ['rejectVisiable'],
    data() {
        return {
            textarea: ''
        }
    },

    mounted() {
        console.log('mounted alert view: ', this.rejectVisiable);
    
    },

    methods: {
        clickSureButton(index) {
            // if (index === 2) 
            //     this.rejectVisiable = false;
            // else  
            console.log('click');
            
            this.$emit('confirmReject', this.textarea, index);
        },

        closeView() {
            this.$emit('closeView')
        }
    }
}


</script>

