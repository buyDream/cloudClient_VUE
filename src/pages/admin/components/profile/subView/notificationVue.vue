<template>
    <div class="natification">
        <div class="profileItem">
            <div class="profileItemTitle">
                标题
            </div>
            <div class="profileItemContent" style="padding-left: 0px; padding-top: 0px;">
                <el-input :disabled="active" placeholder="请填写标题" v-model="notification.notificationTitle"></el-input>
            </div>
        </div>

        

        <div class="profileItem">
            <div class="profileItemTitle">
                通知内容
            </div>
            <div class="profileItemContent" style="padding-left: 0px; padding-top: 0px;">
                <el-input :disabled="active" type="textarea" v-model="notification.notificationMsg" placeholder="请填写通知内容" :autosize="{ minRows: 5, maxRows: 9}"></el-input>
            </div>
            
        </div>

        <div class="releaseNofButton">
            <template v-if="editType">
                <el-button type="primary" plain="" @click="clickBottomButton(3)">{{ operateTitle }}</el-button>
            </template>
            <template v-else> 
                <el-button type="primary" plain="" @click="clickBottomButton(1)">通知记录</el-button>
                <el-button type="primary" plain="" @click="clickBottomButton(2)">发布</el-button>
            </template>
            
        </div>
    </div>
</template>

<script>
import { EditNotification } from "../../../../../api/user";
export default {
    props: ['editType', 'modelItem'],
    data() {
        return {
            notification: {
                notificationMsg: "",
                notificationTitle: "",
                notificationID: ""
            },
            active: false,
            operateTitle: '编辑',
        }
    },

    watch: {
        modelItem(newValue, oldValue) {
            // this.notification.notificationMsg = this.modelItem.notificationMsg;
            // this.notification.notificationTitle = this.modelItem.notificationTitle;
            // this.notification.notificationID = this.modelItem.notificationID;
            this.p_configureNotification();
        }
    },

    // updated() {
    //     console.log('updated modelItem: ', this.modelItem);
    // },  
    created() {
        this.active = this.editType;
        this.p_configureNotification();
        
    },

    methods: {
        clickBottomButton(buttonType) {

            switch (buttonType) {
                case 2:
                    SendNotification(this.notification, (data) => {
                        this.notification.notificationMsg = '';
                        this.notification.notificationTitle = '';
                        this.$message.success('ojbk!');
                    }, (failed) => {
                        this.$message.warning(failed);
                    });  
                    break;
                case 1: 
                    console.log('记录');
                    this.$router.push('/notificationRecord');
                    break;

                case 3:
                    
                    if (this.active) {
                        this.active = false;
                        this.operateTitle = '完成';
                        console.log('编辑');
                    } else {
                        // this.$emit('clickNofBottomButton', true, this.notification);
                        console.log('完成');
                        // 修改通知
                        EditNotification(this.notification, (data) => {
                            // this.notification.notificationMsg = '';
                            // this.notification.notificationTitle = '';
                            this.$emit('closeView')
                            this.$message.success('修改成功');
                        }, (failed) => {
                            this.$message.warning(failed);
                        }); 
                    }
                    
                    break;
                default:
                    break;
            }
        },

        p_configureNotification() {
            if (this.modelItem !== undefined) {
                this.notification.notificationMsg = this.modelItem.notificationMsg;
                this.notification.notificationTitle = this.modelItem.notificationTitle;
                this.notification.notificationID = this.modelItem.notificationID;
            }
        }
    }
}
</script>

<style scoped>
.profileItem {
    margin-top: 20px;
    font-size: 15px;
}

.profileItemContent {
      position: relative;
      /* margin: 15px 8px; */
      margin: 10px 0px;
      padding: 10px;
      
}
.releaseNofButton {
    text-align: right;
    padding-right: 10px;
}

</style>
