<template>
    <div class="mainPage">
        <div class="pageTitle">
            任务类型
        </div>
        <div class="contenArea">
            <div class="center clear-float">
                <div class="activityItem fl">
                    <div class="item" :class="{selected: isSelected}" @click="selectActivityType(true)">
                        当天赏金活动
                    </div>
                    <div class="activityDesc" v-show="isSelected">
                        <h4>活动介绍</h4>
                        <div class="desc">
                            新品没基础？那就让老客户来做点基础销量和评价呀！
                            <br>
                            转化率不够？那就赶紧补几单呀？有什么好啰嗦的！
                        </div>
                        <div class="bottomImg">
                            <el-button type="primary" @click="release" round>一键发布</el-button>
                        </div>
                        
                    </div>
                </div>
                <div class="activityItem fr">
                    <div class="item" :class="{selected: !isSelected}" @click="selectActivityType(false)">
                        回购赏金活动
                    </div>
                    <div class="activityDesc" v-show="!isSelected">
                        <h4>活动介绍</h4>
                        <div class="desc">
                            跟当天赏金活动有什么区别？
                            <br>
                            浏览轨迹更伞更深度，权重效果肯定高，
                            <br>
                            也更安全呀这么简单！
                        </div>

                        <div class="bottomImg">
                            <el-button type="primary" @click="release" round>一键发布</el-button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
             isSelected: true
        }
    },
    methods: {
        release() {
            const url = this.isSelected ? '/intraday' : '/repurchase'
            this.$router.push(url);
        },

        selectActivityType(isFirst) {
            if (isFirst !== this.isSelected) {
                this.isSelected = !this.isSelected;    
            }
        }
    }
}
</script>

<style scoped>

.activityItem {
    /* display: inline; */
    /* margin-top: 0px; */
    /* float: left; */
    margin-right: 30px;
    margin-left: 30px;
}
.item {
    border: 1px solid rgb(0, 120, 201);
    
    color: rgb(0, 120, 201);
    padding: 40px 40px;
    /* padding: 25px 40px;
    margin-right: 25px;; */
    width: 180px;
    height: 20px;
    margin: 20px auto;
    cursor: pointer;
    text-align: center;
    vertical-align: auto;
}

.center {
    width: 770px;
    margin-left: auto;
    margin-right: auto;
}

.item.selected {
    background: rgb(0, 120, 201);
    color: #fff;
}

.activityDesc {
    /* display: inline; */
    border: 2px solid rgb(230, 231, 232);
    padding: 30px 40px;
    max-width: 300px;
}

.activityDesc .bottomImg {
    margin-top: 50px;
    background: gainsboro;
    text-align: right;
    min-height: 200px;
    
}

.activityDesc .bottomImg .el-button {
    margin-right: 60px;
    margin-top: 50px;
}

</style>



