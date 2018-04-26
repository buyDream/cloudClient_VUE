<template>
    <div class="firstForm">
            <el-collapse-item title="*推广活动中的人群画像" name="0">
                <div class="item">
                    <div class="itemTitle">
                        性别：
                    </div>
                    <RadioOptional radioType="genderType" normalValue="genderRadio" @selectRadio="selectRadio"></RadioOptional>
                </div>
                    <checkButton title="年龄" parm="age"></checkButton>
                    <checkButton title="淘气值" parm="taoqivalue"></checkButton>
                    <checkButton title="地区" parm="area"></checkButton>
                    <checkButton title="职业" parm="taoqovalue"></checkButton>
                    <checkButton title="支付偏好" parm="payPreference"></checkButton>
                    <checkButton title="优惠偏好" parm="taoqovalue"></checkButton>
            </el-collapse-item>


    </div>
</template>

<script>
import checkButton from '../../utility/checkButton.vue'
import RadioOptional from '../../utility/radioOptional.vue'
export default {
  data() {
        return {
            genderRadio: 0,
        }
    },
    components: {
        checkButton, RadioOptional
    },
    methods: {
        handleChange(val) {
            console.log(val);
            
        },
        selectRadio(val) {
            console.log('selectRadio');
        }
    }
}
</script>

