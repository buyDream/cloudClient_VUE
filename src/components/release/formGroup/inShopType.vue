<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="item">
        <div class="itemTitle is-required">
            {{title}}：
        </div>
            <ul>
                <li v-if="parm === 'inshop'" is="shop_check_item" v-for="(item, index) in buttonItems" :key="item.name" :name="item.name" :imageName="item.imgName" :class="{tbSelected: item.isChecked}" @selectedItem="selectedItem(index)"></li>
                <!-- <li v-else is="check_item" v-for="(item, index) in buttonItems" :key="item.value" :name="item.name" :class="{tbSelected: item.isChecked}" @selectedItem="selectedItem(index)"> -->
                <!-- </li> -->
            </ul>
    </div>
</template>


<style>

.item ul {
	/* margin: 0;
    padding: 0; */
    display: inline;
	list-style: none;
}
.item li {
	/* float: left; */
	position: relative;
	margin: 0 4px 4px 10px;
	line-height: 20px;
	vertical-align: middle;
    padding: 1px;
    font-size: 11px;
    /* border: 1px solid #FF0036; */
}

.item li span:hover {
    border: 1px solid #FF0036;
    /* margin: -1px; */
}

.item li.tbSelected span{
    border: 1px solid #FF0036;
    margin: -1px;
}
.item li.tbSelected i {
	background-image: url(../../../assets/selectPlatform.png);
}

.item li {
	float: left;
	position: relative;
	margin: 0 4px 4px 0;
	line-height: 28px;
	/* vertical-align: middle; */
	padding: 1px;
}

.item li span {
	float: left;
	background-color: #fff;
	white-space: nowrap;
	width: auto !important;
	min-width: 10px;
	padding: 0 9px;
	text-align: center;
	border: 1px solid #b8b7bd;
    border-radius: 2px;
	color: #000;
	text-decoration: none;
}
/* .item img {
    width: 49px;
    height: 49px;
} */
.item i {
	position: absolute;
	bottom: 40px;
	right: 0px;
	width: 18px;
	height: 18px;
	overflow: hidden;
	text-indent: -99em;
	display: block;
	background-repeat: no-repeat;
	background-position: 0 0;
}
</style>

<script>
import ages from './../../../data/age.json'
import area from './../../../data/area.json'
import payPreference from './../../../data/payPreference.json'

import check_item from './../../utility/checkListItem.vue'
import shop_check_item from './inShopTypeList.vue'
export default {
  props: ['title', 'parm', 'normalValue'],
  data: function () {
    return {
      checkId: 0,
      buttonItems: [],
    //   isSelected: true
        todos: [{
                id: 1,
                title: 'Do the dishes',
                isChecked: true
            },
            {
                id: 2,
                title: 'Take out the trash',
                isChecked: false
            },
            {
                id: 3,
                title: 'Mow the lawn',
                isChecked: false
            }
        ],
    }
  },
//   computed: {
//       copButtonItems: function() {
//           return ages;
//       }
//   },

  components: {
      shop_check_item, check_item
  },

//   children

  methods: {
    //   getJson() {
    //     this.buttonItems = ages;
    //   },
      selectedItem(index) {
          console.log("key:", index);
        //  // 先取消所有选中项
        this.buttonItems.forEach((item) => {
            item.isChecked = false;
        });
        //再设置当前点击项选中
        this.checkId = this.buttonItems[index].value;
        // // 设置值，以供传递
        this.buttonItems[index].isChecked = true;
        this.$emit('selected', index);
      },

      clickItem() {
        //   this
      }
  },
    created() {
        console.log('-----normalValue: ', this.normalValue);
        
        if (this.parm === 'age') {
            this.buttonItems = ages;    
        } else if (this.parm === 'area') {
            this.buttonItems = area;
        } else if (this.parm === 'payPreference') {
            this.buttonItems = payPreference;
        } else {
            this.buttonItems = [
                {name: '手机淘宝', imgName: 'taobao', isChecked: false},
                {name: '电脑淘宝', imgName: 'pc_taobao', isChecked: false},
                {name: '手机天猫', imgName: 'tmall', isChecked: false},
                {name: '电脑天猫', imgName: 'pc_tmall', isChecked: false},
                {name: '手机京东', imgName: 'jd', isChecked: false},
                {name: '电脑京东', imgName: 'pc_jd', isChecked: false},
            ];
            this.buttonItems[this.normalValue-1].isChecked = true;
        }
        
  },

}
</script>
