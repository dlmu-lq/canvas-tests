<!--根据宽高设置canvas的width height属性-->
<template>
        <canvas class="normal-canvas"
                :id="canvasProperties.id"
                :width="canvasProperties.width"
                :height="canvasProperties.height"></canvas>
</template>

<script lang="ts">
    import Vue from "vue"

    export default Vue.extend({
        name: "",
        data(){
            return{
                canvasProperties:{
                    id:"",
                    width:0,
                    height:0,
                }
            }
        },
        mounted(){
            this.canvasProperties.id = new Date().getTime();

        }
    })
</script>

<style scoped>

</style>
