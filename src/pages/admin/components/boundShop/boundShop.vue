<template>
    <div class="mainPage">
        <div class="pageTitle">
            绑定店铺
        </div>
        <div class="contenArea">
            <!-- <div>
                注意：每个商家可免费绑定2个店铺，不限于天猫京东淘宝，增加绑定店铺及更换店铺绑定的话需要二位支付金额开头哦
                <a href="#">QQ在线联系</a>
            </div> -->
            <TableView :tableData="dataSource"></TableView>

            <div>
                <el-button type="success" @click="addBindingVisiable = true">增加绑定</el-button>
                <el-button type="warning" @click="changeShopVisiable = true">更换店铺</el-button>
                <el-dialog
                    title="绑定店铺"
                    :visible.sync="addBindingVisiable"
                    width="40%"
                    center>
                    <div>您还可以绑定{{form.number}}个店铺，需要支付{{form.pay}}元增加绑定</div>
                    <el-form :model="form">
                        <el-form-item label="店铺类型" :label-width="formLabelWidth">
                            <el-select v-model="form.shopType" placeholder="请选类型" style="width: 60%">
                                <el-option label="天猫" value="1"></el-option>
                                <el-option label="淘宝" value="2"></el-option>
                                <el-option label="京东" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="店铺掌柜旺旺" :label-width="formLabelWidth">
                        <el-input v-model="form.wwID" auto-complete="off" style="width: 60%"></el-input>
                        </el-form-item>
                        <el-form-item label="店铺名称" :label-width="formLabelWidth">
                        <el-input v-model="form.shopName" auto-complete="off" style="width: 60%"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="warning" @click="clickSureButton(0)">{{ alertButtonText }}</el-button>
                    </div>
                </el-dialog>
                <el-dialog
                    title="更换店铺"
                    :visible.sync="changeShopVisiable"
                    width="40%"
                    center>
                    <div>您可以更换店铺绑定，需要支付{{form.changePay}}元增加绑定</div>
                    <el-form :model="changeAlertValue">
                        <el-form-item label="选择要更改的店铺名称" label-width="160px">
                            <!-- <el-select v-model="changeAlertValue.activityShop" placeholder="请选店铺" style="width: 60%">
                                <el-option v-for="(value, index) in changeShopNames" :label="value" :key="index" :value="value.shopID"></el-option>
                            </el-select> -->
                            <Selector @shopNameChanged="shopNameChanged"></Selector>
                        </el-form-item>
                        <el-form-item label="新变更店铺掌柜旺旺" label-width="160px">
                        <el-input v-model="changeAlertValue.changeWwID" auto-complete="off" style="width: 60%"></el-input>
                        </el-form-item>
                        <el-form-item label="新变更店铺名称" label-width="160px">
                        <el-input v-model="changeAlertValue.newChangeShopName" auto-complete="off" style="width: 60%"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="warning" @click="clickSureButton(1)">支付{{ changePay }}元</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>

import TableView from './bindTableView.vue'
// import state from '../../../store/user'
import Selector from '../utility/selector.vue'
import {  ShowBindingShop, AddBindingShop, ModifyBindingShop } from "../../../../api/user";
import thirdFormVue from '../release/formGroup/thirdForm.vue';

export default {
    data() {
        return {
            result: {},
            dataSource: [],
            addBindingVisiable: false,
            changeShopVisiable: false,
            form: {
                    number: 0,
                    pay: 0,
                    chnagePay: 588,
                    wwID: '',
                    shopType: null,
                    shopName: ''
                },
            formLabelWidth: '100px',
            changeAlertValue: {
                changePay: NaN,
                changeWwID: null,
                newChangeShopName: '',
                activityShop: ''
            }
        };
    },
    computed: {
        alertButtonText() {
            return this.form.pay === 0 ? '确认' : '支付'+this.form.pay+'元';
        },
        // changeShopNames() {
        //     var arr = [];
        //     for (var i = 0; i < this.dataSource.length; i++) {
        //         console.log('datasource:', this.dataSource[i].name);
        //         var object = {text: '', shopID: ''};
        //         object.text = this.dataSource[i].name;
        //         object.shopID = this.dataSource[i].id;
        //         arr.push(object);
        //     }
        //     return arr;
        // },
        changePay() {
            return this.result.edit_price;
        }
    },
    methods: {
        clickSureButton(val) {
            console.log('pass value: ', val);
            if (val === 0) {
                AddBindingShop(this.form.shopType, this.form.shopName, this.form.wwID, (data) => {
                    this.addBindingVisiable = false;
                    this.updateDataSource();
                }, (errorMsg) => {
                    alert(errorMsg);
                }); 
            } else {
                ModifyBindingShop(this.changeAlertValue, (data) => {
                    this.changeShopVisiable = false;
                    this.updateDataSource();
                }, (errorMsg) => {
                    alert(errorMsg);
                }); 
            }
            
        },
        shopNameChanged(val) {
            this.changeAlertValue.activityShop = val;
        },
        updateDataSource() {
            ShowBindingShop((data)=> {
            this.result = data;
            this.form.number = data.count;
            this.form.pay = data.count !== 0 ? 0 : data.add_price;
            this.dataSource = data.results;
        })
        }
    },
    components: {
        TableView, Selector
    },

    mounted() {
        // console.log('userID: ', state.state.token);
        this.updateDataSource();
        
    },

    updated() {
        // console.log('12323');
        // ShowBindingShop((data)=> {
        //     console.log('data: ', data.count);
        //     this.form.number = data.count;
        //     this.form.pay = data.count === 0 ? '0' : data.add_price 
        // })
    }
}
</script>
