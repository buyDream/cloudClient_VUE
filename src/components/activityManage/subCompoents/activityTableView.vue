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
      prop="activityGroupID"
      label="活动组ID">
    </el-table-column>

    <el-table-column
	  align="center"
      prop="activityType"
      label="活动类型"
      width="180">
    </el-table-column>

<!-- prop="activityContent" -->
    <el-table-column
      label="活动内容"
      width="380">
	  	<template slot-scope="scope">
			<div class="image inlineBlock fl">
                <el-popover
                    ref="popoverImg"
                    placement="top-start"
                    width="200px"
                    trigger="hover">
                    <img :src="scope.row.image" alt="" style="width: 200px">
                    <img :src="scope.row.image" alt="" slot="reference">
                </el-popover>
				
				<div class="linkDiv">
					<a :href="scope.row.productLink">宝贝链接</a>
				</div>
			</div>

			<div class="content inlineBlock">
				<div class="conttentitem">
					店铺：{{scope.row.shopName}}
				</div>
				<div class="conttentitem">
					<template v-if="scope.row.inShopType === 1">
						关键词：{{ scope.row.keywords }}
					</template>

					<template v-else-if="scope.row.inShopType === 2">
						淘口令：{{ scope.row.taoCommand }}
					</template>

					<template v-else-if="scope.row.inShopType === 3">
						二维码：{{ scope.row.keywords }}<a :href="scope.row.qrCodeImg">二维码</a>
					</template>
				</div>
				<div class="conttentitem">
					筛选条件：{{ scope.row.filter }}
				</div>
			</div>

	  	</template>
    </el-table-column>

    <el-table-column
	  align="center"
      prop="wwID"
      label="旺旺号">
    </el-table-column>

    <el-table-column
	  align="center"
      prop="orderID"
      label="订单号">
    </el-table-column>

    <el-table-column
	  align="center"
      prop="activityStatus"
      label="活动状态">
    </el-table-column>

    <el-table-column
	  align="center"
      prop="activityDate"
      label="活动日期">
    </el-table-column>
	
    <el-table-column
	  align="center" label="操作" width="120px">
      <template slot-scope="scope">
		  <!-- <router-link :to="{ name: 'activityDetail', params: {activityID: scope.row.activityID, type: 1}}">查看详情</router-link> -->
        <el-button
          size="mini"
          type="primary"
          @click="handleCheckDetail(scope.$index, scope.row)">查看详情</el-button>

		<el-button
			size="mini"
			type="success"
			:disabled="scope.row.activityStatus.indexOf('已完成') !== -1"
			@click="handleReject(scope.$index, scope.row, true)">确认</el-button>

		<el-button
			size="mini"
			type="warning"
			:disabled="scope.row.activityStatus === '被驳回'"
			@click="handleReject(scope.$index, scope.row, false)">驳回</el-button>
			
		<!-- <el-button
			size="mini"
			type="info"
			@click="handleEdit(scope.$index, scope.row)">仅限浏览</el-button> -->

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
			// console.log('item: item', item.activityStatus);
			
			this.$router.push({name: 'activityDetail', params: {activityID: item.activityID, type: item.activityStatus, isGroup: false}});
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