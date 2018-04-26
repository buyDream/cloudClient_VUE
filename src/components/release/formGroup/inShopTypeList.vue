<template id="shop_check_item">
    <li>
        <img :src="image" alt="" srcset="" @click="$emit('selectedItem')">
        <!-- <span @click="$emit('selectedItem')"> {{ name }} </span> -->
        <i></i>
        <div>
            {{ name }}
        </div>
        
    </li>
</template>


<script>
export default {
    name: "shop_check_item",
    props: ['name', 'imageName'],

    data() {
        return {
            image: require('../../../assets/' + this.imageName + '.png')
        }
    }
}
</script>
