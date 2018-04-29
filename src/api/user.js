import {get, post, put, getList, exportExcel} from './common'
import Vue from 'vue';
import { request } from 'https';
import User from '../store/user'
const baseUrl = 'apis/api/Index/';
export function login(username, phonecode, password, success, error, complete) {
    post('apis/api/Index/login', {
      'code': phonecode,
      'mobile': username,
      'password': password
    }, success, error, complete)
}

export function GetVertificationCode(phone, success, error, complete) {
	post('apis/api/Index/getCode', {
		'mobile': phone
	}, success, error, complete)
}
export function StartRegister(username, phonecode, password, rpassword, wechat, qq, success, error, complete) {
    post('apis/api/Index/register', {
      'code': phonecode,
      'mobile': username,
	  'password': password,
	  'qq': qq,
	  'wechat': wechat,
	  'rpassword': rpassword
    }, success, error, complete)
}

// 绑定店铺

export function ShowBindingShop(success, error, complete) {
    post('apis/api/Shop/show', {
      'token': User.state.token,
      'merchant_id': User.state.merchant_id
    }, success, error, complete)
}

export function AddBindingShop(shopType, shopName, wwID, success, failed, error, complete) {
    post('apis/api/Shop/add', {
        'token': User.state.token,
        'name': shopName,
        'shop_type': shopType,
        'manager': wwID
    }, success,failed, error, complete)
}

export function ModifyBindingShop(parms, success, failed, error, complete) {
    post('apis/api/Shop/edit', {
        'token': User.state.token,
        'shop_id': parms.activityShop,
        'manager': parms.changeWwID,
        'wechat': parms.wechat,
        'name': parms.newChangeShopName,
        'mobile': parms.mobile
    }, success,failed, error, complete)
}

// 个人设置
export function GetProfile(success, failed, error, complete) {
    post('apis/api/Merchant/show', {
        'token': User.state.token,
    }, success,failed, error, complete)
}

export function ModifyProfile(parms, success, failed, error, complete) {
    post('apis/api/Merchant/edit', {
        'token': User.state.token,
        'username': parms.userName,
        'wechat': parms.wechatID,
        'mobile': parms.phone,
        'password': parms.password,
        'qq': parms.qqID,
        'poster_img': parms.postImg,
        'introduce': parms.shopIntro,
        'week_count': parms.weeklyLimit
    }, success,failed, error, complete)
}

// 商家发布通知
export function SendNotification(params, success, failed, error, complete) {
    post('apis/api/Merchant/sendMessage', {
        'token': User.state.token,
        'title': params.notificationTitle,
        'content': params.notificationMsg
    }, success,failed, error, complete)
}

export function EditNotification(params, success, failed, error, complete) {
    post('apis/api/Merchant/editMessage', {
        'token': User.state.token,
        'merchant_message_id': params.notificationID,
        'title': params.notificationTitle,
        'content': params.notificationMsg
    }, success,failed, error, complete)
}

// 商家通知列表
export function MerchantNotificationList( success, failed, error, complete) {
    post('apis/api/Merchant/showMessage', {
        'token': User.state.token,
    }, success,failed, error, complete)
}


// 发布活动
export function CheckMallLink(link, success, failed, error, complete) {
    post('apis/api/Task/getBaby', {
        'token': User.state.token,
        'baby_link': link
    }, success,failed, error, complete)
}

// 获取我的模板
// 我的模板
export function GetActivityModelsRelease(activityType, success, failed, error, complete) {
    post('apis/api/Task/taskModel', {
        'token': User.state.token,
        'type': activityType
    }, success,failed, error, complete)
}
export function GetActivityModels(activityModelID, success, failed, error, complete) {
    post('apis/api/Task/showModel', {
        'token': User.state.token,
        'task_model_id': activityModelID
    }, success,failed, error, complete)
}

export function ShowActivityModelDetail(activityModelID, success, failed, error, complete) {
    post('apis/api/Bill/showDetails', {
        'token': User.state.token,
        'task_bill_id': activityModelID
    }, success,failed, error, complete)
}


export function GetShopName(success, failed, error, complete) {
    post('apis/api/Shop/shopName', {
        'token': User.state.token,
    }, success,failed, error, complete)
}

export function ReleaseActivity(parms, saved, success, failed, error, complete) {
    if (parms.latestTimes === undefined) parms.latestTimes = [];
    post('apis/api/Task/add', {
        'token': User.state.token,

        'type': parms.activityType,

        'model': saved,
        'model_id': parms.activityID,
        'model_name': parms.modelName,
        'manager': parms.shopBossID,
        'baby_link': parms.productLink,
        'baby_title': parms.productTitle,
        'baby_name': parms.productName,
        'price': parms.price,
        'baby_img': parms.mainPicUrl,
        'baby_direct_img': parms.directImgUrl,
        'inlet': parms.entrance,

        'inlet_type': parms.inShopType,
        'keyword': parms.keywords,
        'sku_img': parms.SKUImg,
        'card_img': parms.cardConImg,
        'password': parms.taoCommand,
        'qr_code': parms.QRCode,
        'late_time_start': parms.latestTimes[0] * 0.001,
        'late_time_end': parms.latestTimes[1] * 0.001,
        'weighting': parms.weight,
        'orientation_shop': parms.directionalShop,
        'account': parms.attentionMsg,

        'count': parms.releaseNum,
        'date': parms.releaseDate * 0.001,
        'payment_time': parms.payDate * 0.001,
        'reward': parms.reward,
        'task_title': parms.releaseTitle,
        'gift_img': parms.presentImgUrl,
        'gift_text': parms.presentContent,
        'time_slot': parms.releaseTimes,
    }, success,failed, error, complete)
}

// ---删除活动模板
export function DeleteActivityModel(activityModelID, success, failed, error, complete) {
    post('apis/api/Task/delModel', {
        'token': User.state.token,
        'task_model_id': activityModelID
    }, success,failed, error, complete)
}

// ----- 活动管理 -------
// 我的活动
export function GetMyActivity(parms, success, failed, error, complete) {
    if (parms.rangeTime === undefined) parms.rangeTime = [];
    post('apis/api/Bill/show', {
        'token': User.state.token,
        'type': parms.activityType,
        // 'date': parms.activityDate * 0.001,
        'state': parms.activityStatus,
        'search_state': parms.activitySearchState,
        'shop_id': parms.activityShop,
        'id': parms.activityID, // 活动组ID
        'bill_id': parms.orderID,
        'wangwang': parms.wwID,
        // 'task_id': parms.activityGroupID, // 活动组id
        'baby_id': parms.productID,
        'jingdong': parms.jdID,
        'page': parms.currentPage,
        'list': parms.sizePage,
        'start_date': parms.rangeTime[0] * 0.001,
        'end_date': parms.rangeTime[1] * 0.001,
    }, success,failed, error, complete)
}



//  修改活动状态 --- 驳回、确认返款
export function ChangeActivityStatus(parms, success, failed, error, complete) {
    console.log('botton clickedActivityID', parms.activityID);
    post('apis/api/Bill/state', {
        'token': User.state.token,
        'type': parms.activityStatus,
        'id': parms.activityID,
        'reject_reason': parms.rejectReason
    }, success,failed, error, complete)
}

// 展示我的活动组
export function GetActivityGroups(parms, success, failed, error, complete) {    
    post('apis/api/Task/show', {
        'token': User.state.token,
        'type': parms.activityType,
        'date': parms.activityDate * 0.001,
        'shop_id': parms.activityShop,
        'id': parms.activityGroupID,
        'state': parms.activitySearchState,
        'page': parms.currentPage,
        'list': parms.sizePage,
    }, success,failed, error, complete)
}

// 停止我的活动组
export function StopActivityGroups(parms, success, failed, error, complete) {
    post('apis/api/Task/stop', {
        'token': User.state.token,
        'id': parms.groupID
    }, success,failed, error, complete)
}

// ----资金详情-----
// 展示资金
export function ShowAccoutDetail(parms, success, failed, error, complete) {
    console.log('2parms: ', parms.times);
    if (parms.rangeTime === undefined) parms.rangeTime = [];
    post('apis/api/Capital/show', {
        'token': User.state.token,
        'type': parms.activityType,
        'start_date': parms.rangeTime[0] * 0.001,
        'end_date': parms.rangeTime[1] * 0.001,
        'state': parms.returnType,
        'bill_id': parms.orderID,
        'wechat': parms.wechatID,
        'task_id': parms.activityGroupID,
        'task_bill_id': parms.activityID,
        'shop_id': parms.activityShop,
        'page': parms.currentPage,
        'list': parms.sizePage,
    }, success,failed, error, complete)
}


// -------用户总览 -------
export function ShowUserOverview(success, failed, error, complete) {
    post('apis/api/User/overview', {
        'token': User.state.token,
    }, success,failed, error, complete)
}

// status: true用户审核  or 用户管理
export function ShowUserDetail(parms, status, success, failed, error, complete) {
    post('apis/api/User/show', {
        'token': User.state.token,
        'stay': status,
        'openid': parms.openID, //用户id
        'nickname': parms.userName,
        'wangwang': parms.wwID,
        'sex': parms.gender,
        'credit': parms.taoqiValue,
        'wechat': parms.wechatID,
        'mobile': parms.phone,
        'state': parms.status, // 用户状态 --- 正常、拉黑、待审核eg。
        'page': parms.currentPage,
        'list': parms.sizePage,
    }, success,failed, error, complete)
}

export function EditUserInfo(parms, success, failed, error, complete) {
    post('apis/api/User/edit', {
        'token': User.state.token,
        'sex': parms.gender,
        'mobile': parms.phone,
        'wangwang': parms.wwID,
        'credit': parms.taoqiValue,
        'late_place_time': parms.latestOrder * 0.001,
        'openid': parms.openID,
        'shop_id': parms.shopName
    }, success,failed, error, complete)
}

// 更改用户状态
export function ChangeUserState(parms, success, failed, error, complete) {
    post('apis/api/User/state', {
        'token': User.state.token,
        'id': parms.buyerID,
        'type': parms.state, // 用户状态 --- 正常、拉黑、待审核eg。
    }, success,failed, error, complete)
}

// Vue.http.interceptors.push((request, next) => {
//     if (window.localStorage.getItem('token')) {
//         Vue.http.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')
//     }
//     next((response) => {
//         if (response.status === 401) {
//             del('token');
//             window.location.pathname = '/login';
//         }
//     })
// })

// profile