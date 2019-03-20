<!--绘制一个渐变颜色的矩形-->
<template>
    <div class="component-parent">
        <standard-canvas @mounted="init"></standard-canvas>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import StandardCanvas from "@/components/standard-canvas.vue";

    export default Vue.extend({
        name: "",
        components:{
            StandardCanvas
        },
        data(){
            return{}

        },
        mounted(){

        },
        methods:{
            init(canvasId){

            }
        }
    })
</script>

<style scoped>

</style>
