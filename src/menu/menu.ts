import {RouteConfig} from "vue-router";

export default <Array<MenuItem>> [
    {
        label:"2d gauge",
        basePath:"",
        path:"/gauge",
        children:[],
    }
]

export interface MenuItem {
    label:string;
    basePath:string;
    path:string; // 跳转路由path
    children:Array<MenuItem>;
}
