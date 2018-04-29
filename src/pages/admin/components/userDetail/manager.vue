<template>
  <div class="mainPage">
	  	<div class="pageTitle">
            用户管理
        </div>
    	<div class="contenArea">
            <Search @updateTableView="updateTableView"></Search>
            <div class="tableView">
                <el-select v-model="operateStatus" placeholder="批量操作" size="mini" style="width: 100px" @change="selectorChanged">
                    <el-option label="拉黑" value="3"></el-option>
                    <el-option label="取消拉黑" value="4"></el-option>
                </el-select>
                <TableView :tableData="results" type="manager" :searchParms="parms" @changeItemStatus="changeItemStatus" @handleSelectionChange="batchProcessingData"></TableView>
            </div>
            
            <Pagination 
                @pageChange="handlePageChange"
                :totalPage="totalPage">
            </Pagination>

            <EditeBuyerView :rejectVisiable="rejectVisiable" @confirmSubmit="confirmSubmit" :dataSource="buyerItemInfo" @closeView="closeView"></EditeBuyerView>

    	</div>
  </div>
</template>

<script>
import Search from '../searchBar.vue'
import TableView from '../utility/tableView.vue'
import EditeBuyerView from '../utility/alertView/editBuyerInfo.vue'
import Pagination from '../pagination.vue'

import { EditUserInfo, ShowUserDetail, ChangeUserState, login } from "../../../../api/user";
export default {
    data() {
        return {
            parms: {},
            rejectVisiable: false,
            results: [],
            userIds: [],
            operateStatus: "批量操作",
            buyerItemInfo: {},
            totalPage: 1,
        }
    },
    components: {
        Search, TableView, EditeBuyerView, Pagination
    },

    methods: {

        updateTableView(parms, search) {
            if (search) {
                this.getData(parms);    
            }
        },
        // updateTableView(parms) {
        //     this.parms = parms;
        //     console.log('来了吗', parms.phone);
            
        // },
        handlePageChange(val) {
            this.getData(val);
        },

        batchProcessingData(val) {
            this.userIds = val;
        },

        selectorChanged() {
            if (this.userIds.length > 0) {
                var params = {
                    buyerID: this.userIds,
                    state: this.operateStatus    
                }
                // console.log('params: ', params);
                this.p_changeUserState(params);
                this.operateStatus = '批量操作';
            }
            
        },

        p_changeUserState(params) {
            ChangeUserState(params, (success) => {
                    console.log('ojbk: ', success);
                    this.getData();
                }, (falied) => {
                    this.$alert(falied);
                });
        },

        

        confirmSubmit(parms) {
            EditUserInfo(parms, (data) => {
                this.getData();
                this.rejectVisiable = false;
            }, (failed) => {
                this.$alert(failed);
            });
        },

        changeItemStatus(parms) {
            
            if (parms.state === 5) {
                this.rejectVisiable = true;  
                
                this.buyerItemInfo = this.results[parms.index];
                // console.log('------buyerItemInfo:', this.buyerItemInfo);
                return;
            } 

            ChangeUserState(parms, (data) => {
                this.getData();
			}, (err) => {
                this.$alert(err);
			});
        },

        getData(val) {
            console.log('params: ----------');
            var parms = val === undefined ? {} : val;
            ShowUserDetail(parms, false, (data) => {
                console.log('params: ', data);
                this.results = data.results;
                this.totalPage = data.all_page;
            }, (err) => {
                console.log(err);
            });
        },


        closeView() {
            this.rejectVisiable = false;
        }
        
    },

    created() {
        this.getData();
    }


}
</script>
