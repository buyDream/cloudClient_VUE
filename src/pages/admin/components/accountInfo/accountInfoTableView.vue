<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%;">
    <el-table-column
      type="selection"
      align="center"
      width="55">
    </el-table-column>
    <el-table-column
      prop="type"
      label="活动类型">
    </el-table-column>
    <el-table-column
      prop="date"
      label="活动时间"
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      label="返款状态"
      align="center"
      width="100">
      <template slot-scope="scope">
        <el-tag
          size="mini"
          :type= "scope.row.state.value === 6 ? 'success' : 'warning'"
          >{{ scope.row.state.text }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="shop_name"
      label="店铺"
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="bill_id"
      align="center"
      label="订单号">
    </el-table-column>
    <el-table-column
      prop="wechat"
      align="center"
      label="微信号">
    </el-table-column>
    <el-table-column
      prop="task_bill_id"
      align="center"
      label="活动ID">
    </el-table-column>
    <el-table-column
      prop="task_id"
      align="center"
      label="活动组ID">
    </el-table-column>
    <el-table-column
      prop="price"
      align="center"
      label="活动金额">
    </el-table-column>
    <!-- <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleDelete(scope.$index, scope.row)">确认</el-button>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<style>


.el-table th {
    background-color: rgb(239, 240, 241);
}
</style>


<script>

export default {
	props:['searchParms', 'tableData'],
	data() {
		return {

		}
	},

	computed: {
		headerStyle: function() {
			var x = document.createElement("style");
			x.background = "red";
			return x;
		}
	},

	methods: {
		// setHeaderStyle(val) {
		//     console.log('setHeaderStyle:', val);
			
		// }
	},

	mounted() {
		console.log('dataSource: ', this.tableData);
		
	},

	updated() {
		console.log('updated --- dataSource: ', this.tableData);
	}
	
	
}
</script>