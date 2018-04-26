<template>
  <div class="mainPage">
	  	<div class="pageTitle">
            返款记录
        </div>
        <div class="contenArea">
            <Search @updateTableView="updateTableView"></Search>
            <div class="tableView">
                <TableView searchParms="parms" :tableData="results"></TableView>
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
                
        </div>
        

  </div>
  
</template>

<style>


.bottomPagination {
    padding: 8px 20px 8px 10px;
}

.tableView {
    margin: 0px 15px;
}
</style>

<script>

import FormInput from '../activityReport/formInput.vue'
import TableView from './accountInfoTableView.vue'
import Selector from '../utility/selector.vue'

import Search from '../searchBar.vue'
import { ShowAccoutDetail } from "../../api/user";
export default {
	data() {
    	return {
			form: null,
            activeType: null,
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            timeValue: "",
			inputSize: 'small',
            parms: {},
            currentPage: 1,
            results: []
      }
    },

    methods: {
        onSubmit() {
            console.log('submit!');
        },

        updateTableView(parms, search) {
            if (search) {
                console.log('updateTableView parms: ', parms.userName);
                this.getData(parms);    
            }
        },

        getData(val) {
            ShowAccoutDetail(val === undefined ? {} : val , (data) => {
                this.results = data.results;
                console.log('results data: ', this.results);
            }, (err) => {
                // console.log(err);
                this.$alert(err)
            });
        }
	},
	components: {
		FormInput, TableView, Selector, Search
    },

    created() {
        this.getData();
	},
    
    
}
</script>
