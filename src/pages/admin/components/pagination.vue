<template>
    <div class="bottomPagination clear-float">
        <div class="fl">
            每页显示
            <el-select v-model="pageSize" placeholder="请选择" size="mini" style="width: 60px" @change="handleSizeChange">
                <el-option
                v-for="item in pageSizes"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
        </div>

        <div class="fr">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                background
                layout="prev, pager, next"
                :page-count="totalPage"
                next-text="下一页>">
            </el-pagination>

            <div class="lastItem">
                <span>共{{ totalPage }}页</span>
                <div class="el-input el-input--mini" style="width: 56px;">
                    <!----><input autocomplete="off" placeholder="页码" class="el-input__inner" type="number" v-model.number="inputPage"  @change="didFinishInput"><!----><!----><!---->
                </div>
                <el-button plain @click="goToPage" size="mini">确定</el-button>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    props: ['totalPage'],
    data() {
        return {
            pageSizes: [10, 20, 30, 50],
            pageSize: 10,
            inputPage: 1,
            currentPage: 1,
        }
    },

    updated() {
        console.log('update-------');
        
    },

    methods: {
        handleCurrentChange(val) {
            this.inputPage = val;
            
            this.convertParamsToParent();
        },

        goToPage() {
            this.currentPage = this.inputPage;
            this.convertParamsToParent();
        },

        handleSizeChange() {
            this.inputPage = 1;
            this.convertParamsToParent();
        },

        didFinishInput() {
            this.inputPage = this.inputPage  > this.totalPage ? this.totalPage : val;
        },

        convertParamsToParent() {
            // console.log('当天页数多少条:', this.pageSize);
            
            var parms = {};
            parms.currentPage = this.inputPage;
            parms.sizePage = this.pageSize;
            
            this.$emit('pageChange', parms)
        }

    }
}
</script>

<style scoped>

.bottomPagination {
    padding: 8px 20px 8px 10px;
}

.fr .el-pagination {
    float: left;
}

.fr .lastItem .el-input__inner {
	text-align: center;
	-moz-appearance: textfield;
	line-height: normal;
}

.fr .lastItem {
    padding: 2px 5px;
    float: right;
}

.el-input input {
    -moz-appearance: textfield;
}

</style>


