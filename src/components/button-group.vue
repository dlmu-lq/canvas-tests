<template>
    <div class="context-button-group">
        <div v-for="item in buttons"
             @click="changeContent(item.type)"
             :class="{'active':active === item.type}">{{item.label}}</div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"

    export default Vue.extend({
        name: "",
        props:['buttons','initActive'], // {type:"",label:""}
        data(){
            return{
                active:this.initActive,
            }
        },
        methods:{
            changeContent(type){
                this.active = type;
                this.$emit("change",type);
            }
        }
    })
</script>

<style scoped>

</style>
