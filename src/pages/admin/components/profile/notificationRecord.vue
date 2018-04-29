<template>
    <div class="mainPage">
        <div class="pageTitle">
            通知记录
        </div>

        <div class="contenArea">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    align="center"
                    prop="notificationTitle"
                    label="标题"
                    width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="notificationMsg"
                    label="内容摘要">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    label="发布时间">
                </el-table-column>

                <el-table-column
                    align="center" label="操作" width="240px">
                    
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleCheckDetail(scope.$index, scope.row)">查看详情</el-button>
                    </template>

                </el-table-column>
            </el-table>

            <NotificationAlertView :visiable="notificationAlert" @closeAlertView="closeAlertView" :modelItem="selectedItem"></NotificationAlertView>
        </div>
    </div>

</template>

<script>

import NotificationAlertView from '../utility/alertView/alertEditeNotificationView.vue'
import {MerchantNotificationList} from '../../../../api/user'
export default {
    data() {
        return {
          tableData: [],
          notificationAlert: false,
          selectedItem: {},
        }
    },

    created() {
        MerchantNotificationList((data) => {
            this.tableData.length = 0;
            data.results.forEach(element => {
                var modelItem = {
                    notificationTitle: element.title,
                    notificationMsg: element.content,
                    date: element.create_time,
                    notificationID: element.id
                };
                this.tableData.push(modelItem);
            });
        }, (faild) => {
            this.$message.error(faild);
        });
    },

    methods: {
        handleCheckDetail(index, row) {
            this.notificationAlert = true;
            this.selectedItem = row;
        },

        closeAlertView() {
            this.notificationAlert = false;
        }
    },

    components: {
        NotificationAlertView
    }
}
</script>

