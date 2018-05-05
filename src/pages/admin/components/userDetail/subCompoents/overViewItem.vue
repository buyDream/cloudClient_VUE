<template>
    <div class="item">
        <div class="valueTitle">
            {{value}}
        </div>
        <div class="value">
            {{title}}
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'value']
}
</script>

<style scoped>
.item {
    margin-left: 30px;
    width: 10%;
    display: inline-block;
    text-align: center;
}

.item .valueTitle {
    font-size: 40px;
    color: darkturquoise;
}
</style>
