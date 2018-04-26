<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="item">
        <div class="itemTitle">
            {{title}}：
        </div>
            <ul>
                <li is="check_item" v-for="(item, index) in buttonItems" :key="item.value" :name="item.name" :class="{tbSelected: item.isChecked}" @selectedItem="selectedItem(index)">
                </li>
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
	margin: 0 4px 4px 0;
	line-height: 20px;
	vertical-align: middle;
	padding: 1px;
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
	background-image: url(../../assets/selectedImg.png);
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

.item i {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 12px;
	height: 12px;
	overflow: hidden;
	text-indent: -99em;
	display: block;
	background-repeat: no-repeat;
	background-position: 0 0;
}
</style>

<script>
import ages from './../../data/age.json'
import area from './../../data/area.json'
import payPreference from './../../data/payPreference.json'

import check_item from './checkListItem.vue'
export default {
  props: ['title', 'parm'],
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
      check_item
  },

//   children

  methods: {
    //   getJson() {
    //     this.buttonItems = ages;
    //   },
      selectedItem(index) {
        //   console.log("key:", index);
        //  // 先取消所有选中项
        this.buttonItems.forEach((item) => {
            item.isChecked = false;
        });
        //再设置当前点击项选中
        this.checkId = this.buttonItems[index].value;
        // // 设置值，以供传递
        this.buttonItems[index].isChecked = true;
        // console.log(this.buttonItems);
        // this.buttonItems[index].isChecked = !this.buttonItems[index].isChecked;
        // var newValue = this.buttonItems[index];
        // newValue.name = 'nima';
        // console.log('current item: ', newValue);
        // this.buttonItems.splice(index, 1, newValue);
      },

      clickItem() {
        //   this
      }
  },
    created() {
        if (this.parm === 'age') {
            this.buttonItems = ages;    
        } else if (this.parm === 'area') {
            this.buttonItems = area;
        } else if (this.parm === 'payPreference') {
            this.buttonItems = payPreference;
        }
        
  },

}
</script>
