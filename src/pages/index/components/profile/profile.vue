<template>
	<div class="profile bodyPage">
		<!-- <mt-header fixed title="我的主页" class="music-header">
    </mt-header> -->
	<!-- <div class="page-title"></div> -->
		<mt-cell class="profileHeader">
			<div class="headProfile">
				<img slot="icon" src="../../assets/profile.png" width="60px" height="60px">
			</div>

			<div class="headerContent">
				<div class="headerContentTitle">
					奈德丽kjd_88
				</div>
				<div class="headerContentSubTitle" @click="$router.push('/privateInfo')">
					先完善资料才能抢福利哦 >
				</div>
			</div>
		</mt-cell>

		<div class="profileNum">
			<div class="numItem">
				<div class="numItemCount themePurple">5689.89</div>
				<div class="numItemTitle">累计获得佣金（元）</div>
			</div>
			<div class="numSeparation"></div>
			<div class="numItem">
				<div class="numItemCount themePurple">56</div>
				<div class="numItemTitle">累计抢福利次数（次）</div>
			</div>
		</div>

		<div class="profileItem subCenter">
			<div class="msgCenter inlineBlock">
				
				<img src="../../assets/messageCenter.png" alt="" srcset="" width="24px">
				<div>
					消息中心
				</div>
				<mt-badge size="small" type="error">3</mt-badge>
			</div>
			<div class="msgContent inlineBlock">
				本周还可以领取活动<span style="color:red">3</span>次
			</div>
		</div>

		<mt-cell title="我的活动" value="查看全部活动" class="profileItem" is-link :to="{ name: 'MyActivity' }"></mt-cell>
		<div class="profileItem">
			<mt-cell title="我的服务" class=""></mt-cell>
			<div class="server borderGrayColor">
				<div class="serverItem inlineBlock" v-for="(item, index) in serverArr" :key="index" @click="clickMyServer(item.routeLink)">
					<div class="serverItemImg">
						<img :src="item.serverImg" alt="" srcset="" width="24px">
						<template v-if="index === 0">
							<mt-badge size="small" type="error">5</mt-badge>
						</template>
						<template v-else>
							<mt-badge size="small" type="error" style="width:5px; padding:0px;height:5px;border-radius:50%"></mt-badge>
						</template>
						
					</div>
					{{item.serverTitle}}
				</div>
			</div>
		</div>
		

	</div>
</template>

<script>
export default {
	data() {
		return {
			serverArr: [
				{ serverTitle: '消息提醒', serverImg: require('../../assets/messageRemind.png'), routeLink: '/msgRemind' },
				{ serverTitle: '个人资料', serverImg: require('../../assets/personalInfo.png'), routeLink: '/privateInfo' },
				{ serverTitle: '  设置 ', serverImg: require('../../assets/profileSetting.png'), routeLink: '/setting' },
			]
		}
	},

	methods: {
		clickMyServer(linker) {
			this.$router.push(linker);
		}
	}
}
</script>


<style>

.profile {
	background: rgb(246, 247, 248);
}

.profile .profileItem {
	text-align: left;
	background: white;
	margin-top: 10px;
	/* display: flex; */
}
.profile .subCenter {
	display: flex;
}

.profile .profileItem .mint-cell-wrapper {
	background-image: initial;
}

.profile .profileItem .mint-cell-value {
	font-size: 13px;
}

.profile .profileHeader {
	/* background: rgb(46, 58, 83); */
	background-image: url(../../assets/profile_bg@2x.png);
}

.profile .profileHeader .mint-cell-title {
	flex: initial;

}

.profile .profileHeader .mint-cell-value {
    padding: 20px 0px;
}

.profile .profileHeader .headProfile img {
	border-radius: 50%;
	border: 1.5px solid white;
}

.profile .profileHeader .headerContent {
	text-align: left;
	padding-left: 20px;
}

.profile .profileHeader .headerContent .headerContentTitle {
	color: white;
	padding-bottom: 8px;
}

.profile .profileHeader .headerContent .headerContentSubTitle {
	background: white;
	border-radius: 3px;
	font-size: 10px;
	padding: 4px 5px 3px 5px;
	color: rgb(46, 58, 83);
}
.profile .profileNum {
	padding-top: 10px;
	padding-bottom: 10px;
	background: white;
	text-align: center;
}
.profile .profileNum .numItem {
	width: 45%;
	display: inline-block;
}

.profile .profileNum .numSeparation {
	background: powderblue;
	min-width: 1px;
	display: inline-block;
	/* line-height: 20px; */
	/* margin: auto; */
	height: 30px;
}

.profile .profileNum .numItem .numItemCount {
	margin-bottom: 10px;
	/* color: rgb(0, 96, 225); */
}

.profile .profileNum .numItem .numItemTitle {
	font-size: 13px;
}

.profile .profileItem .msgCenter {
	background: rgb(230, 236, 248);
	padding: 10px;
	text-align: center;
	font-size: 12px;
	position: relative;
}

.profile .profileItem .msgCenter .mint-badge {
	position: absolute;
	top: 12px;
	right: 26px;
	/* width: 10px;
	height: 10px; */
	transform:translateY(-50%) translateX(100%);
}

.profile .profileItem .mint-badge.is-size-small {
	border-radius: 6px;
	font-size: 12px;
	width: 10px;
	height: 10px;
	padding: 0px 1px 2px 1px;
}

.profile .profileItem .msgContent {
	font-size: 14px;
	margin: auto;
	margin-left: 10px;
	
}

.profile .profileItem .server {
	border-top: 1px solid;
}

.profile .profileItem .server .serverItem {
	text-align: center;
	/* display: inline-block; */
	margin: 5px 10px 10px 10px;
	font-size: 13px;
	width: 52px;
}

.profile .profileItem .server .serverItemImg {
	margin: 10px auto;
	position: relative;
}

.profile .profileItem .server .serverItemImg .mint-badge {
	position: absolute;
	top: 0px;
	right: 12px;
	transform:translateY(-50%) translateX(100%);
}


</style>
