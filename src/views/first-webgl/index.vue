<template>
    <div class="component-parent">
        <standard-canvas @mounted="firstWebglCanvasMounted"></standard-canvas>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import StandardCanvas from "@/components/standard-canvas.vue"
    import FirstWebGl from "./first";

    export default Vue.extend({
        name: "",
        components:{
            StandardCanvas
        },
        methods:{
            firstWebglCanvasMounted(canvasId){
                console.log(canvasId);
                let firstWebgl = new FirstWebGl(canvasId);
                firstWebgl.drawFirstTriangle();
            }
        }
    })
</script>

<style scoped>

</style>
