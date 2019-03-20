<template>
    <div class="component-parent">
        <button-group :buttons="buttons"
                      :initActive="2"
                      @change="changeContent"></button-group>
        <standard-canvas @mounted="firstWebglCanvasMounted"></standard-canvas>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import StandardCanvas from "@/components/standard-canvas.vue"
    import ButtonGroup from "@/components/button-group.vue";
    import FirstWebGl from "./first";

    export default Vue.extend({
        name: "",
        components:{
            StandardCanvas,
            ButtonGroup
        },
        data(){
            return{
                firstWebGl:null as FirstWebGl,
                currentType:2,
                buttons:[
                    {type:0,label:"triangles"},
                    {type:1,label:"rectangle"},
                    {type:2,label:"rectangles"},
                ]
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
                    case 2:
                        this.firstWebGl.drawMore();
                        break;
                }
            }
        }
    })
</script>

<style scoped>

</style>
