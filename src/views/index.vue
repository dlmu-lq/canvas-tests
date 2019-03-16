<template>
    <div class="view-index">
        <!--左侧菜单-->
        <div class="view-nav">
            <!--左上角放个图片吧-->
            <div class="logo flex-center">Canvas Tests</div>
            <!--菜单-->
            <div class="menu-parent">
                <div  v-for="item in menu"
                      :class="['menu-item',item.name===current?'menu-item-active':'']"
                      @click="changeCurrent(item)">
                    {{item.label}}
                </div>
            </div>
        </div>
        <!--右侧-->
        <div class="view-content">
            <div v-if="current === ''" class="content-text">选择左侧菜单查看</div>
            <router-view/>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import "./index.less";
    import menu, {MenuItem} from "../menu/menu";

    export default Vue.extend({
        name: "",
        data(){
            return{
                menu:menu as MenuItem[],
            }
        },
        methods:{
            changeCurrent(item){
                if(this.current != item.name){
                    this.$router.push({name:item.name});
                }
            }
        },
        computed:{
            current(){
                return this.$store.state.routerName;
            }
        }
    })
</script>

<style scoped>

</style>
