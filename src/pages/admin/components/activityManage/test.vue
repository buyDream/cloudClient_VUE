<template>
    <div class="mainPage">
        <div class="pageTitle">
            个人设置
        </div>
        <div class="contenArea">
            <div class="profileItem">
                <div class="profileItemTitle">
                个人信息
                </div>
            </div>
            <div class="profileItemContent">
                
                
            </div>

            <div class="profileItem">
                <div class="profileItemTitle">
                    买家设置
                </div>
            </div>
            <div class="profileItemContent">
                
            </div>
            
            <div class="profileItem">
                <div class="profileItemTitle">
                    商家介绍
                </div>
            </div>

            <div class="profileItemContent">
                
                
            </div>

            <div class="profileItem">
                <div class="profileItemTitle">
                    店铺推广海报：（上传个性海报有利于增加您的老客户粘性哦）
                </div>
            </div>

            <div class="profileItemContent">
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :before-upload="beforePosterUpload"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">点击上传750*345像素JPG格式图片</div>
                    <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {

    created() {
        console.log('created!!!!');
        
    }
  
}
</script>
