<template>
	<div class="mainPage">
	  	<div class="pageTitle">
            用户总览
        </div>
    	<div class="contenArea">
			<div class="overViewRow bottomBorder">
				<h5>买家总览表：</h5>
				<Item v-for="item in buyerOverviewDataSource" :title="item.title" :value="item.count" :key="item.title"></Item>
			</div>
			<div class="overViewRow bottomBorder">
				<h5>性别：</h5>
					<Item v-for="item in genderDataSource" :title="item.title" :value="item.count" :key="item.title"></Item>
			</div>
			<div class="overViewRow bottomBorder">
				<h5>淘气值：</h5>
					<Item v-for="item in taoqiValueDataSource" :title="item.title" :value="item.count" :key="item.title"></Item>
			</div>
			<div class="overViewRow">
				<h5>年龄：</h5>
					<Item v-for="item in ageDataSource" :title="item.title" :value="item.count" :key="item.title"></Item>
			</div>

			<div class="overViewRow red">
				<div class="attention warning">
					注意
				</div>
				<div class="warning" >
					<ol style="padding-left: 18px">
						<li>总数=正常+拉黑+待审核+审核被拒绝</li>
						<li>已购买标签指该买家做完活动后，商家可获得该买家资料并增加在买家栏中</li>
					</ol>
				</div>
				
			</div>
    	</div>
	</div>
</template>

<style>

.overViewRow {
	margin-left: 20px;
}

.red.overViewRow {
	color: red;
	padding-top: 10px;
	/* display: inline-block; */
}

.attention.warning {
	padding-top: 18px;
	vertical-align: top;
}

.warning {
	display: inline-block;
}

.bottomBorder {
	border-bottom: 1px solid rgb(228, 229, 230);
}

</style>

<script>

import Item from './subCompoents/overViewItem.vue'
import { ShowUserOverview } from "../../api/user";
export default {
	components: {
		Item,
	},
	data() {
		return {
			buyerOverviewDataSource: [
				{title: '总数', value: '6200'},
				{title: '正常', value: '4200'},
				{title: '拉黑', value: '110'},
				{title: '待审核', value: '200'},
				{title: '审核被拒绝', value: '1200'},
				{title: '活跃', value: '20'},
				{title: '已接过单', value: '100'},
			],
			genderDataSource: [
				{title: '男', value: '6200'},
				{title: '女', value: '4200'},
			],
			taoqiValueDataSource: [
				{title: '400以下', value: '6200'},
				{title: '401-500', value: '4200'},
				{title: '501-600', value: '110'},
				{title: '601-800', value: '200'},
				{title: '801-1000', value: '1200'},
				{title: '1000+', value: '20'},
			],
			ageDataSource: [
				{title: '0-17岁', value: '6200'},
				{title: '18-25岁', value: '4200'},
				{title: '26-60岁', value: '110'},
				{title: '31-35岁', value: '200'},
				{title: '36-40岁', value: '1200'},
				{title: '41-50岁', value: '20'},
				{title: '51岁以上', value: '100'},
			],
		}
	},

	mounted() {
		ShowUserOverview((data) => {
			this.buyerOverviewDataSource = data.count;
			this.genderDataSource = data.sex;
			this.taoqiValueDataSource = data.credit;
			this.ageDataSource = data.age;
			console.log(data.count);
			
		}, (error) => {

		});
	}

}
</script>

