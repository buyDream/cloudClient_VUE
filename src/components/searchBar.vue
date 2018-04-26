<template>
    <div id="searchBar">
        <el-form ref="form" label-width="100px" :inline="true" label-position="top">
            <template v-for="item in searItems">

                <template v-if="item.format === 'text'">
                    <el-form-item :label="item.showName + '：'" :key="item.name" style="width:20%">
                        <el-input :size="inputSize" v-model="format[item.name]"></el-input>
                    </el-form-item>
                </template>

                <template v-if="typeof item.format === 'object'">
                    <el-form-item :label="item.showName + '：'" :key="item.name" style="width:20%">
                        <template v-if="item.name === 'activityShop'">
                            <Selector @shopNameChanged="shopNameChanged"></Selector>
                        </template>

                    <template v-else>
                        <el-select v-model="format[item.name]" placeholder="全部" :size="inputSize" style="width: 100%" @change="selectorChanged">
                            <el-option
                            v-for="index in item.format"
                            :key="index.itemValue"
                            :label="index.itemName"
                            :value="index.itemValue">
                            </el-option>
                        </el-select>
                    </template>
                    </el-form-item>
                </template>

                <template v-if="item.format === 'dateRange'">
                    <el-form-item :label="item.showName + '：'" :key="item.name">
                        <el-date-picker
                            :size="inputSize"
                            v-model="format[item.name]"
                            type="daterange"
                            value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </template>

                <template v-if="item.format === 'date'">
                    <el-form-item :label="item.showName + '：'" :key="item.name" style="width:20%">
                        <el-date-picker
                            @change="selectDate"
                            :key="item.name"
                            v-model="format[item.name]"
                            type="date"
                            :size="inputSize"
                            value-format="timestamp"
                            placeholder="选择日期"  style="width: 100%">
                        </el-date-picker>
                    </el-form-item>
                </template>

                <template v-if="item.format === 'buttonVisiable'">
                    <el-form-item style="width: 98%" :key="item.name">
                        <div class="fr">
                            <el-button type="primary" @click="onSubmit" icon="el-icon-search">搜索</el-button>

                            <el-button type="success"  v-if="item.outputButton">导出</el-button>
                            <el-button type="info" @click="clearInput">清空条件</el-button>
                            <el-button v-if="item.batchSignButton">批量标记</el-button>
                            <el-button type="success" v-if="item.batchCheckButton" @click="batchProcessing">批量审核</el-button>
                        </div>
                    </el-form-item>

                </template>

            </template>
        </el-form>
    </div>
</template>

<script>
import tableFormat from '../data/tableFormat.json'
import { ShowUserDetail, GetShopName } from "../api/user";
import Selector from './utility/selector.vue'
export default {
    props: ['index'],
    data() {
        return {
            format: {
                'activityType': '', //活动类型
                'userName': '',     // 用户名
                'wwID': '',         // 旺旺名
                'gender': '',      // 性别
                'taoqiValue': '',  // 淘气值
                'wechatID': '',    // 微信号
                'phone': '',       // 手机号
                'rangeTime': [],   // 开始结束时间
                'activitySearchState': '',   // 搜索的活动状态
                'productID': '',     // 宝贝id
                'activityDate': '',  // 活动日期
                'jdID': '',        // 京东
                'activityShop': '',
                'orderID': '',
                'activityID': '',
                'activityGroupID': '',
                'returnType': '',
                'status': '',

            },
            searItems: [],
            inputSize: 'medium',
            shopNames: [],
        }
    },

    computed: {
        path () {
            return this.$route.path.split('?')[0]
        },

        
    },

    watch: {
        index: function(newValue, oldValue) {
            // this.requirement = newValue;
            
            const x = parseInt(newValue);
            if (x >= 0) {
                this.searItems = [];
                this.searItems = tableFormat[this.path][x];
                console.log('------search-----watch:', tableFormat[this.path].length);
            } else {
                this.searItems = tableFormat[this.path];
            }
        }
    },
    methods: {
        onSubmit() {
            this.$emit('updateTableView', this.format, true);
        },

        clearInput() {
            console.log('before clear!!!', this.format.wwID);
            // Object.assign(this.$data, this.$options.data.call(this));
            this.format.wwID = '';
            this.format.productID = '';
            this.format.activityDate = '';
            this.format.activityType = '';
            this.format.activitySearchState = '';
            this.format.activityShop = '';
            this.format.orderID = '';
            this.format.phone = '';
            this.format.activityID = '';
            this.format.jdID = '';
            this.format.activityGroupID = '';
            this.format.returnType = '';
            this.format.status = '';
            this.format.wechatID = '';
            this.format.rangeTime = [];
            this.format.gender = '';
            this.format.taoqiValue = '';
            this.format.userName = '';
            console.log('after clear!!!', this.format.wwID);
        },

        selectDate(val) {
            // this.format.activityType = val;
            console.log('selectDate', val);
            console.log('selectDate', this.format.activityDate);
        },

        selectorChanged(val) {
            console.log('111111selectorChanged: ', this.format.activitySearchState);
            this.$emit('updateTableView', this.format, false);
        },

        // 批量审核
        batchProcessing() {
            this.$emit('batchProcessing');
        },

        shopNameChanged(val) {
            // this.form.directionalShop = val;
            this.format.activityShop = val;
        },
    },

    mounted() {
        const index = parseInt(this.index);
            if (index >= 0) {
                this.searItems = tableFormat[this.path][index];
            } else {
                this.searItems = tableFormat[this.path];
            }
            
    },
    created() {
        this.defaultData = JSON.parse(JSON.stringify(this.$data));
        // GetShopName((success) => {
        //     console.log('success data:', success.shop_name);
        //     success.shop_name.forEach(element => {
        //         var shopItem = {"itemName": element.name};
        //         this.shopNames.push(shopItem);
        //     });
            
        // }, (failed) => {

        // });
    },

    updated() {
        this.$emit('updateTableView', this.format, false);
         console.log('------search------：:', this.format.phone);
    },

    components: {
        Selector
    }
    
}
</script>
