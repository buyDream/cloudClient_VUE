<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%;"
		@selection-change="handleSelectionChange"
		>
	<!-- <template v-if="type === 'auditor'"> -->
		<el-table-column
		type="selection"
		align="center"
		width="55">
		</el-table-column>
	<!-- </template> -->

    <el-table-column
		align="center"
      prop="nickname"
      label="用户名">
    </el-table-column>

    <el-table-column
		align="center"
      prop="sex"
      label="性别">
    </el-table-column>

    <el-table-column
		align="center"
      prop="age"
      label="年龄"
      width="180">
    </el-table-column>

    <el-table-column
		align="center"
      prop="mobile"
      label="手机号"
      width="180">
    </el-table-column>

	<el-table-column
	align="center"
      prop="wechat"
      label="微信号">
    </el-table-column>

    <el-table-column
		align="center"
      prop="wangwang"
      label="淘宝会员名">
    </el-table-column>

    <el-table-column
		align="center"
      prop="credit"
      label="淘气值">
        <template slot-scope="scope">
            <div class="taoqiValueItem">
                <el-popover
                    ref="popoverPresent"
                    placement="top-start"
                    width="200px"
                    trigger="hover">
                    <img :src="scope.row.credit_img" alt="" style="width: 200px">
                    <a slot="reference">{{scope.row.credit}}</a>
                </el-popover>
            </div>
      </template>
      
    </el-table-column>

    <el-table-column
		align="center" label="操作" width="120px">
		
      	<template slot-scope="scope">
			<template v-if="type === 'auditor'">
				<el-button
				size="mini"
				type="primary"
				@click="handleChange(scope.$index, scope.row, 1)">通过</el-button>

				<el-button
				size="mini"
				type="warning"
				@click="handleChange(scope.$index, scope.row, 2)">拒绝</el-button>
				
			</template>
			<template v-else-if="type === 'manager'">
				<el-button
					size="mini"
					type="primary"
					@click="handleChange(scope.$index, scope.row, 5)">编辑</el-button>

					<el-button
					v-if="scope.row.state === '正常'"
					size="mini"
					type="danger"
					@click="handleChange(scope.$index, scope.row, 3)">拉黑</el-button>
					
					<el-button
						v-else
						size="mini"
						type="info"
						@click="handleChange(scope.$index, scope.row, 4)">取消拉黑</el-button>
			</template>

      	</template>
	  

    </el-table-column>
  </el-table>
</template>

<style scoped>
.el-table th {
    background-color: rgb(239, 240, 241);
}

.el-table .cell {
	padding-left: 2px;
	padding-right: 2px;
}

/* .el-table .cell .el-button {
	display: inline-block;
	margin-left: 2px;
  margin-right: 2px;
} */
.el-table .cell .el-button {
	display: block;
	margin-left: 10px;
    margin-right: 10px;
	margin-top: 7px;
	width: 80px;
}
</style>


<script>
import { ShowUserDetail } from "../../../../api/user";  
import { EditUserInfo, ChangeUserState } from "../../../../api/user";
export default {
	props: ['type', 'searchParms', 'tableData'],
	data() {
		return {
			multipleSelection: []
		}
	},

	methods: {
		handleChange(index, row, editeType) {
			console.log('editeType----:%',editeType);
			this.$emit('changeItemStatus', {
				buyerID: row.id,
				state: editeType,  //操作状态
				index: index
			})
		},

		handleSelectionChange(val) {
				
				this.multipleSelection = [];
				val.forEach(element => {
					this.multipleSelection.push(element.id); 
				});
				console.log('-------ids:', this.multipleSelection);
				this.$emit('handleSelectionChange', this.multipleSelection)
      }
	},


	updated() {
		// 监听条件变换搜索
		// console.log('search tableData: ', this.tableData);
		// console.log('search comdic: ', this.searchParms);
		
	}
}
</script>

