import {RouteConfig} from "vue-router";

export default <Array<MenuItem>> [
    {
        label:"2d gauge",
        name:"2dGauge",
        basePath:"",
        path:"/2dGauge",
        children:[],
    },
    {
        label:"test page",
        name:"testPage",
        basePath:"",
        path:"/tetPage",
        children:[],
    },
    {
        label:"first webgl triangle",
        name:"firstWebgl",
        basePath:"",
        path:"/firstWebgl",
        children:[],
    },
]

export interface MenuItem {
    label:string;
    name:string;
    basePath:string;
    path:string; // 跳转路由path
    children:Array<MenuItem>;
}
