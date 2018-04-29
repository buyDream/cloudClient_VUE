<template>
    <el-dialog title="商家通知" :visible="visiable" center width="30%" :show-close="false" @close="clickButton(false)">
        <Notification :editType="true" :modelItem="modelItem" @closeView="clickButton"></Notification>
    </el-dialog>
</template>

<script>

import Notification from '../../profile/subView/notificationVue.vue'
export default {
    props: ['visiable', 'modelItem'],

    components: {
        Notification
    },
    methods: {
        clickButton() {
            this.$emit('closeAlertView');
        }
    }
}
</script>

<style scoped>

/* .el-dialog__body {
    padding-top: 0px;
} */



</style>
