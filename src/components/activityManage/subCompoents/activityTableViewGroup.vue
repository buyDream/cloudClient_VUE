<template>
  <el-table
    :data="tableData"
    border>
    <el-table-column
      align="center"
      prop="activityGroupID"
	  width="100px"
      label="活动组ID">
    </el-table-column>

    <el-table-column
      align="center"
      prop="activityType"
      label="活动类型">
    </el-table-column>
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
					关键词：{{ scope.row.keywords }}
				</div>
				<div class="conttentitem">
					筛选条件：{{ scope.row.filter }}
				</div>
			</div>

	  	</template>
    </el-table-column>

	<el-table-column
      align="center"
      prop="activityReward"
      label="活动奖励">
		<template slot-scope="scope">
			<div class="conttentitem">
					单个活动打赏：{{ scope.row.unitPrice }}金币
			</div>
			<div class="conttentitem" v-if="scope.row.presentImgUrl.length > 0">
				
                <el-popover
                    ref="popoverPresent"
                    placement="top-start"
                    width="200px"
                    trigger="hover">
                    <img :src="scope.row.presentImgUrl" alt="" style="width: 200px">
                    活动赠品：<a slot="reference">图片</a>
                </el-popover>
                
			</div>
		</template>

    </el-table-column>
	
    <el-table-column
      align="center"
      prop="totalActivities"
      label="活动总数">
    </el-table-column>
    <el-table-column
      align="center"
      label="接单情况">
		<template slot-scope="scope">
			<div class="count">
				预热中：{{ scope.row.received }}
			</div>

			<div class="count">
				待领取：0{{ scope.row.waitGet }}
			</div>

			<div class="count">
				进行中：0{{ scope.row.progressing }}
			</div>

			<div class="count">
				已完成：{{ scope.row.accomplish }}
			</div>

			<div class="count">
				已放弃：{{ scope.row.abandoned }}
			</div>
		</template>

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
      align="center" label="操作" width="128px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleDelete(scope.$index, scope.row, false)">查看详情</el-button>

		<el-button
        v-if="scope.row.activityStatus.indexOf('已') === -1"
		  size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row, true)">停止活动组</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
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
	width: 90px;
}
.content {
	margin-left: 8px;
}
</style>


<script>

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
        handleDelete(index, item, stop) {
			if (stop) {
				this.$emit('changeItemStatus', item.activityGroupID, confirm);

			} else { // 查看详情
				this.$router.push({name: 'activityDetail', params: {activityID: item.activityGroupID, type: item.activityStatus, isGroup: true}});
			}
        }
    }
}
</script>