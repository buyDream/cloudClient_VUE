<template>
  <!-- <div class="chooseReleaseTimeAndSoOn"> -->
    <el-collapse-item title="4请选择发布时间、数量和奖励" name="4">
        <div class="item">
            <div class="itemTitle is-required inlineBlock">
                发布数量：
            </div>
            <div style="display: inline">
                
                <el-input :disabled="checked" v-model="form.releaseNum" placeholder="请填写分配活动数量" style="width: 15%"></el-input>单
                <div style="margin-left: 150px">
                    剩余待分配活动数量：{{allocate}}
                </div>
            </div>
        </div>
        <div class="item">
            <div class="itemTitle is-required">
                发布日期：
            </div>
            <DatePicker @selectDate="selectDate" :value="form.releaseDate"></DatePicker>
        </div>
        <div class="item" v-if="group">
            <div class="itemTitle is-required">
                指定下单日期：
            </div>
            <DatePicker @selectDate="selectPlaceOrderDate" :value="form.payDate"></DatePicker>
        </div>
        <div class="item">
            <div class="itemTitle is-required">
                奖励买家：
            </div>
            <el-input :disabled="checked" v-model="form.reward" placeholder="请输入奖励买家的金额" style="width: 15%"></el-input>元
        </div>
        <div class="item">
            <div class="itemTitle is-required">
                活动名称：
            </div>
            <el-input :disabled="checked" v-model="form.releaseTitle" placeholder="10个字内" style="width: 15%"></el-input> <span class="redText">标题一定要吸引您的老客户哦~</span>
        </div>
        <div class="item">
            <div class="itemTitle is-required">
                奖励赠品：
            </div>
            <el-upload :disabled="checked" class="avatar-uploader" action="http://www.test.com/api/Uploads/uploadImg/post" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" style="width: 20%; display:inline">
                <img v-if="form.presentImgUrl" :src="form.presentImgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"><span class="imgMsg">请上传赠品图片</span></i>
            </el-upload>
        </div>
        <div class="item">
            <div class="itemTitle is-required">
                赠品描述：
            </div>
            <el-input :disabled="checked" v-model="form.presentContent"
                type="textarea"
                style="width: 45%"
                placeholder="PS：没有足够吸引力的文字内容，怎么跳动老客户抢福利的热情呢？"
                :autosize="{ minRows: 5, maxRows: 9}">
            </el-input>
        </div>
        <div class="item">
            <div class="itemTitle is-required">
                发布时间段：
            </div>
            <div class="timeList">
            <div class="itemTime" v-for="(item, index) in timeBucket" :key="index">
            <div class="title">{{item.title}}</div>
                <el-input :disabled="!item.disable" type="text" minlength="1" v-model="timeBucket[index]['value']" v-on:input="keyPress(item,index)" :id="'input' + index" onkeyup="value=value.replace(/[^\d]/g,'')" @change="isChangedInput = true"></el-input>
            </div>
            </div>
        </div>
    </el-collapse-item>
            
  <!-- </div> -->
</template>

<script>

import DatePicker from '../../utility/datePicker.vue'
// import TimeList from './releaseTimes.vue'
import TimeData from '../../../../../data/timeBucket.json'
import bus from '../../../assets/Global.js'
import thirdFormVue from './thirdForm.vue';
export default {
    props: ['checked','group', 'form'],
    data() {
        return {
            timeBucket: [],
            tempallocate: 0,
            currentIndex: '',
            currentIndexValue: '',
        }
    },

    computed: {
        allocate() {
                var temp = 0;
            // 想想办法---reduce
            this.timeBucket.forEach(element => {
                temp = parseInt(element['value']) + temp;
            });
            // console.log('used---:', temp);
            // console.log('leave---:', this.form.releaseNum - temp);
            this.tempallocate = this.form.releaseNum - temp;
          return this.form.releaseNum - temp;
            
        },
        releaseTimes() {
            var arr = [];
            this.timeBucket.forEach((element) => {
                // console.log('------------');
                
                arr.push(element['value']);
            });
            return arr;
        }
    },

    watch: {
        form: function(newValue, oldValue) {
            for(var i = 0; i < 24; i++) {
                var key = 'count_' + i;
                this.timeBucket[i]['value'] = newValue.releaseTimes[key];

            }
        },
    },
    components: {
        DatePicker,
    },

    methods: {
        handleAvatarSuccess(res, file) {
            // 已拦截跨源请求：同源策略禁止读取位于 https://jsonplaceholder.typicode.com/posts/ 的远程资源。（原因：CORS 头缺少 'Access-Control-Allow-Origin'）。
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log('end：', this.imageUrl);
        },

        beforeAvatarUpload(file) {
                    console.log('before');
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },

        uploadError(err, file, fileList) {
            console.log('error: ', err);
        },

        selectDate(val) {
            this.form.releaseDate = val;
            this.$emit('formParmsChange', this.form, 3); 
        },

        selectPlaceOrderDate(val) {
            this.form.payDate = val;
            this.$emit('formParmsChange', this.form, 3); 
        },


        updateValue: function (value) {
            var formattedValue = value
            // 删除两侧的空格符
            .trim()
    //         // 保留 2 位小数
            .slice(
            0,
          value.indexOf('.') === -1
            ? value.length
            : value.indexOf('.') + 3
        )
        //   // 如果值尚不合规，则手动覆盖为合规的值
            if (formattedValue !== value) {
                this.$refs.input.value = formattedValue
            }
            //   // 通过 input 事件带出数值
            this.$emit('input', Number(formattedValue))
        },
    
        keyPress(item, index) {
            var currentLocate = this.tempallocate;
            var t = item['value'].replace(/\b(0+)/gi,"");
            if (t.length === 0) t = 0;
            item['value'] = t;
            if (isNaN(item['value'])) { // 不是数字
                console.log('--nonumber--focus---value-:', item['value']);
                this.$nextTick(() => {
                    this.timeBucket[index]['value'] = 0;  //变成0
                })
            }
            if (this.currentIndex === index) { // 当前输入
                if ( this.allocate < 0) {
                    this.$nextTick(() => {
                        this.timeBucket[index]['value'] = parseInt(item['value']) + this.allocate; // 加上负的部分（得最大值
                    })
                }

            } else {
                if (currentLocate <= item['value']) { // 
                    this.$nextTick(() => {
                        this.timeBucket[index]['value'] = currentLocate;
                    })
                }
            }
            
            this.currentIndex = index;
        },

        changedInput() {
            console.log('changedInput--------');
            
        }
    

    },

    created() {
        this.timeBucket = TimeData;
                // console.log('---created---fourth---timeBucket length---:', TimeData.length);

    },  

    updated() {
        this.form.releaseTimes = this.releaseTimes;
        this.$emit('formParmsChange', this.form, 3); 
        
    }

}
</script>

<style scoped>
.timeList {
    display: inline-block;
    max-width: 760px;;
}
.timeList .itemTime {
    width: 70px;
    height: 60px;
    display: inline-block;
    text-align: center;
    margin-right: 12px;;
    /* border: 1px solid gainsboro; */
}
input {
	text-align: center;
}

</style>

