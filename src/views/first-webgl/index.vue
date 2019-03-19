<template>
    <div class="component-parent">
        <div class="context-button-group">
            <div @click="changeContent(0)"
                 :class="{'active':currentType === 0}">triangles</div>
            <div @click="changeContent(1)"
                 :class="{'active':currentType === 1}">rectangle</div>
            <div @click="changeContent(2)"
                 :class="{'active':currentType === 2}">rectangles</div>
        </div>
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
        data(){
            return{
                firstWebGl:null as FirstWebGl,
                currentType:2,
            }
        },
        methods:{
            firstWebglCanvasMounted(canvasId){
                console.log(canvasId);
                this.firstWebGl = new FirstWebGl(canvasId);
                this.firstWebGl.drawMore();
            },
            changeContent(type){
                this.currentType = type;
                switch (type) {
                    case 0:
                        this.firstWebGl.drawFirst();
                        break;
                    case 1:
                        this.firstWebGl.drawSecond();
                        break;
                    default:
                        this.firstWebGl.drawMore();
                        break;
                }
            }
        }
    })
</script>

<style scoped>

</style>
