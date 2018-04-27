<template>
    <div class="mainPage">
        <div class="pageTitle">
            任务类型
        </div>
        <div class="contenArea">
            <div class="center">
                <div class="item" :class="{selected: isSelected}" @click="selectActivityType(true)">
                    当天赏金活动
                </div>
                <div class="item" :class="{selected: !isSelected}" @click="selectActivityType(false)">
                    回购赏金活动
                </div>
                <div class="activityDesc">
                    <h4>活动介绍</h4>
                    <template v-if="isSelected">
                        <div class="desc">
                        新品没基础？那就让老客户来做点基础销量和评价呀！
                        <br>
                        转化率不够？那就赶紧补几单呀？有什么好啰嗦的！
                        </div>
                    </template>
                    <template v-else>
                        <div class="desc">
                            跟当天赏金活动有什么区别？
                            <br>
                            浏览轨迹更伞更深度，权重效果肯定高，
                            <br>
                            也更安全呀这么简单！
                        </div>
                    </template>
                    

                    <el-button type="primary" @click="release">一键发布</el-button>
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
.item {
    border: 1px solid rgb(0, 120, 201);
    display: inline-block;
    color: rgb(0, 120, 201);
    padding: 25px 40px;
    margin-right: 25px;;
    /* style="cursor:pointer;" */
    cursor: pointer;
}

.center {
    width: 800px;
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
</style>



