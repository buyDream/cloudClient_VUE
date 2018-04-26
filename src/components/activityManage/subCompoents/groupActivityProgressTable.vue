<template>
  <el-table
    :data="tableData"
    border>
    <el-table-column
	  align="center"
      prop="activityID"
      label="活动ID">
    </el-table-column> 

    <el-table-column
	  align="center"
      prop="orderID"
      label="订单号">
    </el-table-column>

    <el-table-column
	  align="center"
      prop="wechatID"
      label="微信号">
    </el-table-column>

    <el-table-column
	  align="center"
      prop="activityStatus"
      label="活动状态">
    </el-table-column>

    <el-table-column
	  align="center"
      prop="activityDate"
      label="活动更新时间">
    </el-table-column>
	
    <el-table-column
	  align="center" label="操作" width="120px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleCheckDetail(scope.$index, scope.row)">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>


.el-table th {
    background-color: rgb(239, 240, 241);
}

.el-table img {
	width: 60px;
}
.el-table .linkDiv {
	font-size: 12px;
	/* margin-top: 0px; */
	text-align: center;
	color: #147ce8;
}

.el-table .cell .el-button {
	display: block;
	margin-left: 10px;
    margin-right: 10px;
	margin-top: 7px;
	width: 80px;
}
.content {
	margin-left: 8px;
}

</style>


<script>
import { GetMyActivity } from "../../../api/user";
export default {
	
	props: ['tableData'],
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
		handleCheckDetail(index, item) {
			console.log('----ddddd-------');
            this.$emit('clickActivityDetail', {activityID: item.activityID, type: item.activityStatus, isGroup: false});
            // this.$router.push({name: 'activityDetail', params: {activityID: item.activityID, type: item.activityStatus, isGroup: false}});
		},

		handleReject(index, item, confirm) {
			console.log('index: ', index);
			this.$emit('changeItemStatus', item.activityID, confirm);
		},

	},

	mounted() {
		
		


	}
}
</script>