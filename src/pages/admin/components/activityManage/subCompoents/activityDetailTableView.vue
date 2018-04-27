<template>
  <el-table
	:data="dataSource"
    border
    style="width: 100%;">
    <el-table-column
      align="center"
      label="活动信息">
      	<template slot-scope="scope">
			  <!-- <template v-for="(item, index) in dataSource.baseInfo"> -->
				<div class="item">
					<span>活动类型：</span> 
					<span class="1tintColor、、、">{{scope.row.activityType}}</span>
				</div>

				<div class="item">
					<span>活动方式：</span> 
					<span class="1tintColor、、、">{{scope.row.inShopType}}</span>
				</div>

				<div class="item">
					<span>活动平台：</span> 
					<span class="1tintColor、、、">{{scope.row.entrance}}</span>
				</div>

				<div class="item">
					<span>店铺名称：</span> 
					<span class="1tintColor、、、">{{scope.row.shopBossID}}</span>
				</div>
				<div class="item">
					<span>筛选上次购物时间：</span> 
					<span class="1tintColor、、、">{{scope.row.latestTimes}}</span>
				</div>

				<div class="item">
					<div class="imageV">
                        <el-popover
                            ref="popoverImg"
                            placement="top-start"
                            width="200px"
                            trigger="hover">
                            <img :src="scope.row.mainPicUrl" alt="" style="width: 200px">
                            <img :src="scope.row.mainPicUrl" alt="" slot="reference">
                        </el-popover>
						<div class="linkDiv">
							<a :href="scope.row.productLink" target="_blank">宝贝链接</a>
						</div>
					</div>
					<div class="imageV">
                        <el-popover
                            ref="popoverImg"
                            placement="top-start"
                            width="200px"
                            trigger="hover">
                            <img :src="scope.row.presentImgUrl" alt="" style="width: 200px">
                            <img :src="scope.row.presentImgUrl" alt="" slot="reference">
                        </el-popover>
						<div class="linkDiv">
							<span>赠送产品</span>
						</div>
					</div>
					
				</div>
			  <!-- </template> -->
      	</template>
    </el-table-column>
    <el-table-column v-if="activityGroup === false"

      align="center"
      label="买家信息">

		<template slot-scope="scope">
			<div class="item">
				<span>活动旺旺：</span> 
				<span class="tintColor">{{scope.row.wwID}}</span>
			</div>
			<div class="item">
				<span>微信号：</span> 
				<span class="tintColor">{{scope.row.wechatID}}</span>
			</div>


		</template>

    </el-table-column>

	<el-table-column v-else
      align="center"
      label="活动总数">
	  	<template slot-scope="scope">
			  <div class="item">
				<span>{{scope.row.price}}</span> 
			</div>
	  	</template>
    </el-table-column>

    <el-table-column
      align="center"
      label="活动状态">
	  	<template slot-scope="scope">
			  <div class="item">
				<span>{{scope.row.activityStatus}}</span> 
			</div>
	  	</template>
    </el-table-column>

    <el-table-column
      v-if="activityGroup === false"
      align="center"
      prop="price"
      label="买家垫付金额"
      width="180">
        <template slot-scope="scope">
			  
			  <div class="item">
				  <span>宝贝本金：</span> 
					<span class="tintColor">￥{{scope.row.price}}</span>
			</div>
	  	</template>
    </el-table-column>
	
    <el-table-column
      v-else
      align="center"
      label="活动总金额">
	  	<template slot-scope="scope">
			  
			<div class="item">
                <span>单活动金额：</span> 
				<span class="tintColor">￥{{scope.row.price}}</span>
			</div>

            <div class="item">
                <span>活动组总金额：</span> 
				<span class="tintColor">￥{{scope.row.totalPrice}}</span>
			</div>

	  	</template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

.imageV {
	display: inline-block;
}
.imageV img {
    /* text-align: center; */
		width: 60px;
		height: 60px;
}

.el-table th {
    background-color: rgb(239, 240, 241);
}
</style>


<script>
  export default {
	props: ['dataSource', 'activityGroup'],

  }
</script>