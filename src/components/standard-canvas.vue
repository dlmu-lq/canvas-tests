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
                } as any
            }
        },
        mounted(){
            this.canvasProperties.id = new Date().getTime();
            this.$nextTick(()=>{
                let el = document.getElementById(this.canvasProperties.id);
                let width = el.getBoundingClientRect().width;
                let height = el.getBoundingClientRect().height;
                el.style.width = width + "px";
                el.style.height = height + "px";
                this.canvasProperties.width = width;
                this.canvasProperties.height = height;
                this.$nextTick(()=>{
                    this.$emit("mounted",this.canvasProperties.id);
                });
            });
        }
    })
</script>

<style scoped>

</style>
