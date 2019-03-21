<!--绘制一个渐变颜色的矩形-->
<template>
    <div class="component-parent">
        <standard-canvas @mounted="init"></standard-canvas>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import StandardCanvas from "@/components/standard-canvas.vue";
    import GradientRect from "@/views/how-webgl-works/gradientRect";

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
                new GradientRect(canvasId).create();
            }
        }
    })
</script>

<style scoped>

</style>
