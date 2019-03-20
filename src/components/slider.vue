<!-- input range 滑动条-->
<template>
    <div class="component-parent">
        <span>{{label}}</span>
        <input type="range"
               :value="value"
               :min="value"
               :max="value"
               @change="change"/>

    </div>
</template>

<script lang="ts">
    import Vue from "vue"

    export default Vue.extend({
        name: "",
        props:["value","min","max"],
        data(){

        },
        methods:{
            change(value){
                console.log(value);
            }
        }
    })
</script>

<style scoped>

</style>
