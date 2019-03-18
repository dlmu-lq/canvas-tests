import {RouteConfig} from "vue-router";
import Gauge from "@/views/gauge/index.vue";
import TestPage from "@/views/test-page/index.vue";

export default <Array<RouteConfig>> [
    {
        path:"2dGauge",
        name:"2dGauge",
        component:Gauge
    },
    {
        path:"testPage",
        name:"testPage",
        component:TestPage
    }
];
