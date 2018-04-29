<template>
    <div class="mainPage">
	  	<div class="pageTitle">
            用户审核
        </div>
    	<div class="contenArea">
            <Search @updateTableView="updateTableView"></Search>
            <div class="tableView">
                <el-select v-model="operateStatus" placeholder="批量操作" size="mini" style="width: 100px" @change="selectorChanged">
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="拒绝" value="2"></el-option>
                </el-select>
                <TableView :tableData="results" type="auditor" @handleSelectionChange="batchProcessingData" @changeItemStatus="changeItemStatus"></TableView>
            </div>
            
            <Pagination 
                @pageChange="handlePageChange"
                :totalPage="totalPage">
            </Pagination>

    	</div>
    </div>
</template>

<script>
import Search from '../searchBar.vue'
import TableView from '../utility/tableView.vue'
import Pagination from '../pagination.vue'
import { ShowUserDetail, ChangeUserState } from "../../../../api/user";

export default {
    data() {
        return {
            userIds: [],
            operateStatus: '批量操作',
            results: [],
            totalPage: 1,
        }
    },
    
    created() {
        this.getData();
    },

    methods: {

        updateTableView(parms, search) {
            // this.parms = Object.assign(parms, this.parms);
            
            if (search) {
                console.log('updateTableView parms: ', parms.userName);
                this.getData(parms);    
            }
        },

        batchProcessingData(val) {
            this.userIds = val;
        },

        changeItemStatus(val) {
            this.changeUserState(val);
        },

        handlePageChange(val) {
            this.getData(val);
        },

        selectorChanged() {
            if (this.userIds.length > 0) {
                var params = {
                    buyerID: this.userIds,
                    state: this.operateStatus    
                }
                console.log('params: ', params);
                this.changeUserState(params);
                this.operateStatus = '批量操作';                
            }
            
        },

        changeUserState(params) {
            ChangeUserState(params, (success) => {
                    console.log('ojbk: ', success);
                    this.getData();
                }, (falied) => {
                    this.$alert(falied);
                });
        },

        getData(val) {
            ShowUserDetail(val === undefined ? {} : val , true, (data) => {
                this.results = data.results;
                console.log('results data: ', this.results);
                this.totalPage = data.all_page;
            }, (err) => {
                console.log(err);
            });
        }
    },

   

    components: {
        Search, TableView, Pagination
    },
}
</script>

<style>


</style>

