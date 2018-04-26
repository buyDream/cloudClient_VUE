<template>
    <div class="timeList">
        <!-- <form action=""></form> -->
        <div class="item" v-for="(item, index) in timeBucket" :key="index">
            <div class="title">{{item.title}}</div>
                <div class="inputValue">
                    <el-input :disabled="!item.disable" type="text" minlength="1" @change="inputedValue(item)" v-model.number="item.value" @input="keyPress(index)" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                </div>
        </div>
        
    </div>
</template>


<script>
// import tableFormat from '../data/tableFormat.json'
import timeBucket from '../../../data/timeBucket.json'
export default {
    props: ['total', 'dataSource'],
    data() {
        return {
            timeBucket: []
        }
    },

    computed: {
        allocate() {
            // for (var i = 0; i < this.timeBucket.length; i++) {

            // }
            var temp = 0;
            this.timeBucket.forEach(element => {
                temp = parseInt(element.value) + temp;
            });
            // var used = this.timeBucket.reduce(function (x, y) {
            //     console.log('value: ', x.value);
                
            //     return parseInt(x.value) + parseInt(y.value);
            // });
          return this.total - temp;
        }
    },

    methods: {
        inputedValue(index) {
            // console.log('inputedValue inputs: ', this.allocate);
            // console.log('----focus----:', typeof(this.inputs[index]));
            // if ( typeof(this.inputs[index]) !== 'number') {
            //     console.log('----inputedValue--:');
            //     this.inputs[index] = 0;
            // }
            // if (this.allocate <= 0) return false;
            
            // this.$emit('inputTimes', {allocate: this.allocate, inputs: this.inputs})
        },
        keyPress(val) {
            // this.inputs[val] = parseInt(this.inputs[val]);
            console.log('----focus---index-:', val);
            console.log('----focus---value-:', this.timeBucket[val].value);
            var x = this.timeBucket[val].value;
            if (this.allocate < 0 ) {
                console.log('-------:', x);
                this.timeBucket[val].value = 0;
            } else if (this.allocate === 0 && x > 0) {

            }
            this.$emit('inputTimes', {allocate: this.allocate, inputs: this.timeBucket});
        },

        onkeyup(value) {
            console.log('----onkeyup---value-:', value);
        }
    },

    mounted() {
        // this.inputedValue();
        console.log('---------------------mounted----timeBucket---');
        
        this.timeBucket = timeBucket;

        
        if (this.dataSource !== undefined) {
            var tempDic = timeBucket;
            console.log('tiems: ', this.dataSource);
            
        }
        console.log('tiems: ', this.dataSource);
    },

    updated() {
        console.log('updated---tiems: ', this.dataSource);
    }
}
</script>

<style scoped>
.timeList {
    display: inline-block;
    max-width: 760px;;
}
.timeList .item {
    width: 70px;
    height: 60px;
    display: inline-block;
    text-align: center;
    margin-right: 12px;;
    /* border: 1px solid gainsboro; */
}
.timeList .item .el-input__inner {
    text-align: center;
}
/* input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"]{
  -moz-appearance: textfield;
} */

</style>
