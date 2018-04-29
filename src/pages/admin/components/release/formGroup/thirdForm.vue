<template>
    <el-collapse-item title="3请选择活动类型" name="3" class="chooseActivityType">
        <div class="item inShopType">
            <div class="itemTitle is-required">选择进店方式：</div>
            <RadioOptional radioType="inShopType" :normalValue="form.inShopType" @selectRadio="selectRadio"></RadioOptional>
        </div>
        <div class="item" v-show="form.inShopType === 1" style="overflow:hidden">
            <div class="caonima is-required ">关键词：</div>
            <div class="keywords">
            <template v-for="item in keywordsNumber">
                <el-input :disabled="checked" placeholder="请输入宝贝关键词" v-model="keyword[item-1]" :key="item" @change="didAddKeywords"></el-input>
            </template>
            
            <el-button type="primary" @click="addKeyword">添加关键词</el-button>
            </div>
        </div>

        <div class="item" v-show="form.inShopType === 2">
            <div class="itemTitle is-required">淘口令：</div>
                <el-input :disabled="checked"
                    type="textarea"
                    placeholder="请输入淘口令"
                    :autosize="{ minRows: 2, maxRows: 3}"
                    v-model="form.taoCommand" style="width:50%">
                </el-input>
        </div>

        <div class="item" v-show="form.inShopType === 3">
            <div class="itemTitle is-required">上传二维码：</div>
            <el-upload :disabled="checked" class="avatar-uploader" action="#" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" style="width: 20%; display:inline">
                <img v-if="form.QRCode" :src="form.QRCode" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"><span class="imgMsg">请上传二维码图片</span></i>
            </el-upload>
        </div>
        
        <div class="item inlineBlock" v-show="form.inShopType === 1">
            <div class="itemTitle is-required">上传SKU截图：</div>
            <el-upload :disabled="checked"
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-error="uploadError"
                :before-upload="beforeAvatarUpload"
                style="width: 20%; display:inline">
                <img v-if="form.SKUImg" :src="form.SKUImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"><span class="imgMsg">请上传SKU截图</span></i>
            </el-upload>

        </div>
        <div class="item inlineBlock" v-show="form.inShopType === 1">
            <div class="itemTitle">上传卡条件截图：</div>
            <el-upload :disabled="checked" class="avatar-uploader" action="#" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" style="width: 20%; display:inline">
                <img v-if="form.cardConImg" :src="form.cardConImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"><span class="imgMsg">请上传卡条件截图</span></i>
            </el-upload>
        </div>
        <div class="item">
            <div class="itemTitle">轨迹加权：</div>
            <MultipleOptional multipleOptioalType="activityRequirement" @selectorOptional="selectorOptional" :originValue="form.weight"></MultipleOptional>
        </div>
        <div class="item">
            <div class="itemTitle">老客户上次购物时间：</div>
                <el-date-picker
                    v-model="form.latestTimes"
                    @change="didSelectDate"
                    type="daterange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
        </div>

        <div class="imem">
            <div class="itemTitle">定向店铺人群：</div>
            <Selector @shopNameChanged="shopNameChanged" :originValue="form.directionalShop"></Selector>
        </div>

        <div class="item">
            <div class="itemTitle">注意事项：</div>
            <el-input :disabled="checked"
                type="textarea"
                style="width: 45%"
                placeholder="任务有什么特别说明需要交代的"
                :autosize="{ minRows: 5, maxRows: 9}"
                v-model="form.attentionMsg">
            </el-input>
        </div>
    </el-collapse-item>
</template>

<style>

.caonima {
	width: 130px;
	text-align: right;
    margin-right: 10px;
    display: inline-block;
}

.keywords {
    display: inline-block;
    width: 80%;
}

.keywords .el-input {
    width: 150px;
}
.inShopType .el-radio-button.is-active::before {
    content: '';
    position: absolute;
    border: 8px solid rgba(0,0,0,0);
    border-top-color: #147ce8;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
}

</style>


<script>
import Selector from '../../utility/selector.vue'
import RadioOptional from '../../utility/radioOptional.vue'
import MultipleOptional from '../../utility/multipleOptional.vue'

export default {
    props: ['checked', 'form'],
    data() {
        return {
            needWw: 0,
            taoCommand: '',
            imageUrl: '',
            keyword: [
                '',
                '',
                '',
                '',
                ''
            ],
            keywordsNumber: 1,
            value: ''
        }
    },
    components: {
      Selector, RadioOptional, MultipleOptional
    },

    watch:  {
        form: function(newValue, oldValue) {
            this.keyword = newValue.keywords;
            this.keywordsNumber = this.keyword.length;
            
        }
    },

    methods: {
        addKeyword() {
            if (this.keywordsNumber < 5) this.keywordsNumber++;
            // if (this.keywordsNumber === 5) {
                console.log('keywords: ', this.keyword);
                
            // }
        },
        didAddKeywords() {
        
            this.form.keywords = this.keyword.slice(0, this.keywordsNumber);
            console.log('init inshop type: ', this.form.keywords);
            this.$emit('formParmsChange', this.form, 2);
        },

        handlePictureCardPreview() {
            console.log('handlePictureCardPreview');
            
        },
        handleRemove() {

        },
        selectRadio(val) {
            console.log('selectRadio', val.radioType);
            console.log('form tiem: ', this.form.latestTimes );
            if (val.radioType === 'wwType') {
                this.needWw = val.index;           
            } else if (val.radioType == 'inShopType') {
                this.form.inShopType = val.index;
            } else {

            }

        },
        selectInShop(val) {
            this.form.inShopType = val.index;
            console.log('form: ', this.form.latestTimes );
            
        },

        shopNameChanged(val) {
            this.form.directionalShop = val;
        },

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

        //  加权
      selectorOptional(arr) {
          console.log('arr: ', arr);
          this.form.weight = arr;
          this.$emit('formParmsChange', this.form, 2);
      },

      didSelectDate() {
        console.log('didSelectDate third!:', this.form.latestTimes);
        this.$emit('formParmsChange', this.form, 2);
      }

    },
    updated() {
        // console.log('init inshop type: ', this.value);
        this.$emit('formParmsChange', this.form, 2);
    }

}
</script>
