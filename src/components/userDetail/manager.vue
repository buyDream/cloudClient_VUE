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
            
            <div class="bottomPagination">

            <!-- next-text="下一页 >" -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    background
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="sizes, prev, pager, next, total, jumper"
                    :total="resultTotal">
                </el-pagination>
            </div>

            <EditeBuyerView :rejectVisiable="rejectVisiable" @confirmSubmit="confirmSubmit" :dataSource="buyerItemInfo" @closeView="closeView"></EditeBuyerView>

    	</div>
  </div>
</template>

<script>
import Search from '../searchBar.vue'
import TableView from '../utility/tableView.vue'
import EditeBuyerView from '../utility/alertView/editBuyerInfo.vue'
// import { ShowUserDetail } from "../../api/user";  
import { EditUserInfo, ShowUserDetail, ChangeUserState, login } from "../../api/user";
export default {
    data() {
        return {
            parms: {},
            currentPage: 0,
            resultTotal: 12,
            handleSizeChange: '',
            handleCurrentChange: '',
            rejectVisiable: false,
            results: [],
            userIds: [],
            operateStatus: "批量操作",
            buyerItemInfo: {}
        }
    },
    components: {
        Search, TableView, EditeBuyerView
    },

    methods: {

        updateTableView(parms, search) {
            // this.parms = Object.assign(parms, this.parms);
            
            if (search) {
                console.log('updateTableView parms: ', parms.phone);
                this.getData(parms);    
            }
        },
        // updateTableView(parms) {
        //     this.parms = parms;
        //     console.log('来了吗', parms.phone);
            
        // },

        batchProcessingData(val) {
            this.userIds = val;
        },

        selectorChanged() {
            if (this.userIds.length > 0) {
                var params = {
                    buyerID: this.userIds,
                    state: this.operateStatus    
                }
                console.log('params: ', params);
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
                // console.log('-------');
                
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
            console.log('updateTableView aval: ', val);
            ShowUserDetail(val === undefined ? {} : val, false, (data) => {
                this.results = data.results;
                console.log('data: ', this.results);
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
