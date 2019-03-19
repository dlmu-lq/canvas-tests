<template>
    <div class="component-parent">
        <standard-canvas @mounted="canvasMounted" style="background-color: black"></standard-canvas>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import StandardCanvas from "@/components/standard-canvas.vue";
    import Gauge from "./gauge";

    export default Vue.extend({
        name: "",
        components:{
            StandardCanvas
        },
        data(){
            return{
                canvasId:"",
            }
        },
        mounted(){

        },
        methods:{
            canvasMounted(elId){
                this.canvasId = elId;
                new Gauge({
                    canvasId:elId,
                    changeCallBack:this.changeCallBack,
                    mouseControl:true
                });
            },

            changeCallBack(params){
                console.log(params);
            }
        }
    })
</script>

<style scoped>

</style>
