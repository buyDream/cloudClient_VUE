<template>
    <el-form-item :label="labelText + '：'">
            <!-- <el-input v-model="form.name"></el-input> -->
		<el-input :placeholder="placeholder" size="small"></el-input>
    </el-form-item>
</template>

<script>
export default {
    props: ['labelText'],
    data() {
        return {
            // labelText: labelText
        }
    },
    computed: {
        placeholder: function() {
            return "请输入" + this.labelText;
        }
    },

    mounted() {
        console.log(this.labelText);
        
    }
  
}
</script>
