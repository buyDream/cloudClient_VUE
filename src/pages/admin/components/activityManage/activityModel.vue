<template>
    <div class="mainPage">
        <div class="pageTitle "> 
            活动模板
            <div class="fr">
                <el-button type="primary" plain @click="createNewModel(1)">新建当天活动模板</el-button>
                <el-button type="primary" plain @click="createNewModel(2)">新建回购活动模板</el-button>
            </div>
        </div>
        <div class="contenArea">
            <template v-for="(activityDetail, index) in activityModels">
            
                <table :key="index" >
                    <thead>
                        <tr>
                            <td>
                                <div>模板名称：{{ activityDetail.modelName }}</div>
                                <div>创建时间：{{ activityDetail.createdTime }}</div>
                                <div>活动类型：{{ activityDetail.activityType }}</div>
                            </td>
                            <td>操作</td>
                        </tr>
                    </thead>

                    <tbody>
                        <td class="clear-float">
                            <div class="image inlineBlock">
                                <img :src="activityDetail.mainImgUrl" alt="">
                                <div class="shopName">
                                    <img src="" alt="" srcset=""><span>{{activityDetail.shopName}}</span>                                    
                                </div>
                                <a :href="activityDetail.productLink">宝贝链接</a>
                            </div>

                            <div class="image inlineBlock">
                                <img :src="activityDetail.presentImgUrl" alt="">
                                
                                <div class="shopName">
                                    赠品
                                </div>
                            </div>

                            <div class="activityDetail inlineBlock">
                                <template v-for="(item, index) in activityDetail.activityDetail">
                                    <div class="item" :key="index">
                                        <span>{{item.title}}：</span> 
                                        <span class="tintColor">{{item.value}}</span>
                                    </div>
                                </template>
                                
                            </div>
                        </td>

                        <td>
                            <el-button type="primary" plain @click="operateModel(1, index)">使用模板</el-button>
                            <el-button type="primary" plain @click="operateModel(2, index)">编辑模板</el-button>
                            <el-button type="primary" plain @click="operateModel(3, index)">删除模板</el-button>
                        </td>
                    </tbody>
                </table>
            </template>
        </div>
    </div>
</template>

<style scoped>

.pageTitle .fr {
    margin-right: 10px;
    /* margin: 5px 5px 5px 10px; */
}
.clear-float:after,
.clear-float:before {
  content: '';
  display: block;
  clear: both;
}
.contenArea table {
    
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid rgb(229, 229, 229);
     border-collapse:collapse;
}

.contenArea table thead {
    text-align: center;
    background: rgb(246, 249, 255);
    height: 40px;
}

.contenArea table tbody {
    background: rgb(251, 251, 251);
    
}
.contenArea table td {
    border: 1px solid rgb(229, 229, 229);
}

.contenArea table tbody .image {
    width: 200px;
    /* height: 250px; */
    text-align: center;
    margin-top: 40px;
    margin-left: 15px;
    margin-right: 10px;
    float: left;
}

.contenArea table tbody .activityDetail {
    margin: 20px 1px;
}

.contenArea table tbody .activityDetail .item {
    margin: 18px 1px;
    /* background: green; */
}

.contenArea table tbody .image img {
    width: 90%;
}

.contenArea table tbody .el-button {
    margin-left: auto;
    margin-right: auto;
    padding: 8px 20px;
}

.contenArea table thead div {
    padding: 10px 20px;
    margin: 10px 20px;
    display: inline;
}

.contenArea table .el-button {
    display: block;
    margin: 20px 10px;
}
</style>


<script>
import { GetActivityModels, DeleteActivityModel } from "../../../../api/user";
export default {

    data() {
        return {
            activityModels: [],
        }
    },

    methods: {

        createNewModel(type) {
            const url = type === 1 ? '/intraday' : '/repurchase';
            this.$router.push(url);
        },

        operateModel(operateType, index) {
            var selectedModel = this.activityModels[index];
            if (operateType === 3) { // 删除模板
                this.$confirm('您真的要删除此活动模板吗?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true,
                    type: 'warning'
                }).then(() => {
                    DeleteActivityModel(selectedModel.activityID, (data) => {
                        this.updateView();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }, (failed) => {
                        this.$message({
                            showClose: true,
                            message: '删除失败：' + failed,
                            type: 'warning'
                        });
                    });
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
                
            }  else { 
                const name = selectedModel.activityTypeEnum === 1 ? 'intraday' : 'repurchase';
                this.$router.push({ name: name, params: {activityID: selectedModel.activityID, activityTitle: selectedModel.modelName}});
            }
        },


        updateView() {
            this.activityModels.length = 0;
            GetActivityModels('' ,(data) => {
            var arr = data.results;
            console.log('results: ', arr);
            
            arr.forEach(element => {
                var model = {
                    activityID: element.id,
                    modelName: element.model_name,
                    createdTime: element.date.text,
                    activityType: element.type.text,
                    activityTypeEnum: element.type,
                    mainImgUrl: element.baby_img,
                    productLink: element.baby_link,
                    shopName: element.shop_name,
                    presentImgUrl: element.gift_img,
                    activityDetail: [
                        {title: '活动方式',  value: element.inlet_type.text},
                        {title: '活动平台',  value: element.inlet.text},
                        {title: '活动标题',  value: element.task_title},
                        {title: '发布单量',  value: element.count},
                        {title: '筛选老客户上次购物时间',  value: element.late_time_start.text + '-' + element.late_time_end.text},
                        {title: '每单奖励金额', value: element.reward},
                    ]
                }
                this.activityModels.push(model);
            });
            
        }, (failed) => {

        });
        }
    },
    mounted() {
        this.updateView();
        
    }
}
</script>
