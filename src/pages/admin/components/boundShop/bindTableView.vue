<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%;">
    <el-table-column
      align="center"
      prop="shop_type"
      label="店铺类型">
    </el-table-column>
    <el-table-column
      align="center"
      prop="name"
      label="店铺名称">
    </el-table-column>
    <el-table-column
      align="center"
      prop="manager"
      label="掌柜旺旺名">
    </el-table-column>
    <el-table-column
      align="center"
      prop="wechat"
      label="联系微信号">
    </el-table-column>
    <el-table-column
      align="center"
      prop="mobile"
      label="联系手机号">
    </el-table-column>
    <el-table-column
      align="center"
      prop="bind_time"
      label="绑定时间">
    </el-table-column>
  </el-table>
</template>

<style>


.el-table th {
    background-color: rgb(239, 240, 241);
}
</style>


<script>
  export default {
    props: ['tableData'],
    
	computed: {
		// headerStyle: function() {
		// 	var x = document.createElement("style");
    //         x.background = "green";
    //         return x;
		// }
	},

    methods: {
        // setHeaderStyle(val) {
        //     console.log('setHeaderStyle:', val);
            
        // }
    }
  }
</script>