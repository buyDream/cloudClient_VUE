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
        <template slot-scope="scope">
          <template v-if="edits[scope.$index].edit">
            <el-input v-model="scope.row.wechat" style="width: 60%" size="mini"></el-input>
          </template>
          <template v-else>
            <span>{{ scope.row.wechat }}</span>
          </template>
          
          <i class="el-icon-edit" @click="editInput(scope.$index)"></i>
        </template>
    </el-table-column>
    <el-table-column
      align="center"
      prop="mobile"
      label="联系手机号">
    </el-table-column>
    <el-table-column
      align="center"
      prop="create_time"
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
    data() {
      return {
        edits: [], 
      }
    },
    
    watch: {
      tableData(newValue, oldValue) {
        this.edits = [];
        this.tableData.forEach(element => {
          this.edits.push({edit: false});
        });
      }
    },

    mounted() {
      console.log('--created-edits: ', this.tableData.length);
      this.edits = [];
      this.tableData.forEach(element => {
        this.edits.push({edit: false});
      });
    },

    methods: {
        editInput(val) {
          // console.log('---index: ', val);
          // console.log('---index: ', this.edits);
          this.edits[val].edit = !this.edits[val].edit;
        }
    }
  }
</script>