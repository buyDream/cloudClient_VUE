<template>
    <div class="bodyPage">
        <div style="padding-top:10px">
            <mt-cell>
                <div slot="title">
                    公众号推送<span style="font-size:12px"> (根据活动状态推送消息)</span>
                </div>
                <mt-switch v-model="value2" @change="handleChange" class="greenBgSwitch"></mt-switch>
            </mt-cell>
        </div>

        <mt-cell class="logout">
            <div class="logoutButton">退出当前账号</div>
        </mt-cell>
    </div>
</template>

<style>
    .bodyPage .logout {
        text-align: center;
    }

    .bodyPage .logout .mint-cell-title {
        flex: initial;
    }

    .bodyPage .logout .mint-cell-value {
        width: 100%;
    }

    .bodyPage .logout .logoutButton {
        width: 100%;
    }

    .bodyPage .mint-cell {
        /* margin: 10px 0px; */
        /* padding-top: 10px; */
        margin-bottom: 10px;
    }

    .mint-switch-input:checked + .mint-switch-core {
        border-color: rgb(120, 213, 118);
        background-color: rgb(120, 213, 118);
    }

    .mint-switch-core {
        background-color: rgb(120, 213, 118);
    }
</style>
