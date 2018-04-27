<template id="check_item">
    <li>
        <span @click="$emit('selectedItem')"> {{ name }} </span>
        <i></i>
    </li>
</template>

<script>
export default {
    name: "check_item",
    props: ['name']
}
</script>
