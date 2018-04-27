<template>
  <div class="mainPage">
	  	<div class="pageTitle">
            活动报表
        </div>
      	<el-form ref="form" :model="form" label-width="100px" :inline="true">
		  <FormInput v-for="item in searchArr" :labelText="item" :key="item.value"></FormInput>
		  <el-form-item style="display: block;margin-left: 20px;">
			<el-button type="primary" @click="onSubmit" icon="el-icon-search">筛选</el-button>
			<el-button>清空条件</el-button>
		</el-form-item>
  		</el-form>
		<div class="activity">
			<el-radio-group v-model="activeType" border>
				<el-radio-button label="普通活动"></el-radio-button>
				<el-radio-button label="推广活动"></el-radio-button>
			</el-radio-group>
			<TableView></TableView>
		</div>
  </div>
  
</template>
<style>
.reportMain {
	background: white;
}

/* .footerComp {
	display: block;
	margin-left: 20px;
} */
</style>

<script>

import FormInput from './formInput.vue'
import TableView from '../utility/tableView.vue'
export default {
	data() {
    	return {
			searchArr: [
				"活动编号",
				"活动组",
				"活动类型",
				"活动店铺",
				"活动订单号",
				"活动状态",
				"买家会员名",
				"活动时间"
			],
			form: null,
			activeType: null
      }
	},
    methods: {
      onSubmit() {
        console.log('submit!');
      }
	},
	components: {
		FormInput, TableView
	}
}
</script>
