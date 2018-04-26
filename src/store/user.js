import Cookies from 'js-cookie';

var state = { 
    user_id: '',
    merchant_id: '',
    mobile: '',
    password: '',
    wechat: '',
    qq: '',
    register_time: '',
    late_login_time: '',
    level: '',
    is_use: '',
    invite: '',
    token: Cookies.get('Admin-Token'),
    expire_time: '',
    username: '',
}
  
  var getters = {
  
  }
  
  var mutations = {
    setUserData (state, payload) {
      state.merchant_id = 'merchant_id' in payload ? payload['merchant_id'] : '';
      state.username = 'username' in payload ? payload['username'] : '';
      Cookies.set('Admin-UserName', state.username);
      state.user_id = 'id' in payload ? payload['id'] : ''
      state.mobile = 'mobile' in payload ? payload['mobile'] : ''
      state.password = 'password' in payload ? payload['password'] : ''
      state.wechat = 'wechat' in payload ? payload['wechat'] : ''
      state.qq = 'qq' in payload ? payload['qq'] : ''
      state.register_time = 'register_time' in payload ? payload['register_time'] : ''
      state.late_login_time = 'late_login_time' in payload ? payload['late_login_time'] : ''
      state.level = 'level' in payload ? payload['level'] : ''
      state.is_use = 'is_use' in payload ? payload['is_use'] : ''
      state.invite = 'invite' in payload ? payload['invite'] : ''
      state.token = 'token' in payload ? payload['token'] : ''
      state.expire_time = 'expire_time' in payload ? payload['expire_time'] : ''
      console.log('setuserdata: ', state.user_id);
      
    },
    clearUserData (state) {
        state.merchant_id = ''
        state.username = ''
        state.user_id = ''
        state.mobile = ''
        state.password = ''
        state.wechat = ''
        state.qq = ''
        state.register_time = ''
        state.late_login_time = ''
        state.level = ''
        state.is_use = ''
        state.invite = ''
        state.token = ''
        state.expire_time = ''
    }
  }
  
  var actions = {
  
  }

  
  export default {
    state,
    getters,
    mutations,
    actions
  }