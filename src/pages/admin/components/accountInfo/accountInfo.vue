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
                <Pagination 
                    @pageChange="handlePageChange"
                    :totalPage="totalPage">
                </Pagination>
        </div>
        

  </div>
  
</template>

<style>




.tableView {
    margin: 0px 15px;
}

.bottomPagination {
    padding: 8px 20px 8px 10px;
    /* text-align: right; */
}
.fr .el-pagination {
    display: inline-block;
}
.fr .lastItem {
    display: inline;
    padding: 2px 5px;
}
</style>

<script>

import FormInput from '../activityReport/formInput.vue'
import TableView from './accountInfoTableView.vue'
import Selector from '../utility/selector.vue'
import Pagination from '../pagination.vue'
import Search from '../searchBar.vue'
import { ShowAccoutDetail } from "../../../../api/user";
export default {
	data() {
    	return {
			// form: null,
            // activeType: null,
            // formLabelAlign: {
            //     name: '',
            //     region: '',
            //     type: ''
            // },
            parms: {},
            results: [],
            totalPage: 1,
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
        
        handlePageChange(val) {
            this.getData(val);
        },

        getData(val) {
            var parms = val === undefined ? {} : val;
            ShowAccoutDetail(parms , (data) => {
                this.results = data.results;
                this.totalPage = data.all_page;
            }, (err) => {
                this.$alert(err)
            });
        }
	},
	components: {
		FormInput, TableView, Selector, Search, Pagination
    },

    created() {
        this.getData();
        console.log('-------------created 资金详情');
        
	},
    
    
}
</script>
