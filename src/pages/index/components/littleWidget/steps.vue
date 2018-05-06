<template>
    <!-- <div style="height: 300px;">
                <div class="el-steps">
                    <div class="el-step" style="flex-basis: 50%;">
                        <div class="el-step__head is-finish">
                            <div class="el-step__line" style="margin-right: 0px;">
                                <i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 1px; height: 100%;"></i>
                            </div>
                            <div class="el-step__icon is-text">
                                <div class="el-step__icon-inner"></div>
                            </div>
                        </div>

                        <div class="el-step__main">
                            <div class="el-step__title is-finish">活动说明</div>
                            <div class="el-step__description is-finish">
                                <div class="div">
                                    <div>请找到图示的宝贝</div>
                                    <div style="background:red;width:80px;height:90px;"></div>
                                </div>
                                <div class="div">
                                    <div>搜索截图图示</div>
                                    <div style="background:red;width:80px;height:90px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="el-step" style="flex-basis: 50%;">
                        <div class="el-step__head is-process">
                            <div class="el-step__line" style="margin-right: 0px;">
                                <i class="el-step__line-inner" style="transition-delay: -150ms; border-width: 0px; height: 0%;"></i>
                            </div>
                            <div class="el-step__icon is-text">
                                <div class="el-step__icon-inner"></div>
                            </div>
                        </div>
                        <div class="el-step__main">
                            <div class="el-step__title is-process">第一步</div>
                            <div class="el-step__description is-process">这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字</div>
                        </div>
                    </div>

                 <div class="el-step is-flex" style="flex-basis: 50%;">
                    <div class="el-step__head is-wait">
                <div class="el-step__icon is-text">
                    <div class="el-step__icon-inner">
                    </div>
                </div>
                </div>
                <div class="el-step__main">
                    <div class="el-step__title is-wait">
                    步骤 3</div>
                <div class="el-step__description is-wait">
                    这是一段很长很长很长的描述性文字</div>
                </div>
                </div>
                </div>
    </div> -->
    <div style="height: 300px;">
            <el-steps direction="vertical" :active="1">
                <el-step title="123">
                    <!-- <div slot="title">
                        <span class="activityStep">活动说明</span>
                    </div> -->
                </el-step>
                <el-step title="第一步"></el-step>
                <el-step title="第二步" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="第三步"></el-step>
                <el-step title="第四步"></el-step>
            </el-steps>
            </div>
</template>

<style>

    .el-steps {
        display: flex;
        height: 100%;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-flow: column;
        flex-flow: column;
    }

    .el-step__head.is-finish {
        color: rgb(218, 66, 150);
        border-color:rgb(218, 66, 150);
    }

    .el-step__head {
        position: relative;
        width: 100%;
        -webkit-box-flex: 0;
        -ms-flex-positive: 0;
        flex-grow: 0;
        width: 16px;
    }

    .el-step {
        display: flex;
        position: relative;
        -ms-flex-negative: 1;
        flex-shrink: 1;
    }

    .el-step__line {
        position: absolute;
        border-color: inherit;
        background-color: #c0c4cc;
        width: 2px;
        top: 0;
        bottom: 0;
        left: 7px;
    }

    .el-step__icon.is-text {
        border-radius: 50%;
        /* border: 2px solid; */
        border-color: inherit;
        background-color: rgb(218, 66, 150);
        /* color: #c0c4cc; */
    }

    .el-step__icon {
        position: relative;
        z-index: 1;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 16px;
        height: 16px;
        font-size: 14px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
        -webkit-transition: .15s ease-out;
        transition: .15s ease-out;
        /* background-color: rgb(218, 66, 150); */
    }

    .el-step__icon-inner {
        display: inline-block;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
        font-weight: 700;
        line-height: 0;
        color: inherit;
    }

    .el-step__main {
        white-space: normal;
        text-align: left;
        padding-left: 10px;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        padding-left: 10px;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
    }

    .el-step__title {
        font-size: 16px;
        line-height: 38px;
    }
    .el-step__title.is-finish {
        
        color: rgb(218, 66, 150);
    }

    .el-step .el-step__title {
        line-height: 24px;
        padding-bottom: 8px;
    }
    .el-step__description {
        padding-right: 10%;
        margin-top: -5px;
        font-size: 12px;
        line-height: 20px;
        font-weight: 400;
    }

    .el-step__description.is-finish {
        color: rgb(218, 66, 150);
    }

    .el-step__line-inner {
        display: block;
        border-width: 1px;
        border-style: solid;
        border-color: inherit;
        -webkit-transition: .15s ease-out;
        transition: .15s ease-out;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 0;
        height: 0;
    }
    .el-step__head.is-finish .el-step__icon-inner {
        background-color: rgb(218, 66, 150);
    }

    .el-step__head.is-process {
        color: #c0c4cc;
        /* border-color: green; */
    }
    .el-step__head.is-process .el-step__icon.is-text {
        background-color: #c0c4cc;
    }

    .el-step__head.is-wait .el-step__icon.is-text {
        background-color: #c0c4cc;
        color: #c0c4cc;
    }

    .activityStep {
        background-color: rgb(218, 66, 150);
        color: rgb(254, 255, 255);
        border-radius: 5px;
        padding: 3px;
    }
</style>
