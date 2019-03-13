import {RouteConfig} from "vue-router";
import Gauge from "@/views/gauge/index.vue";

export default <Array<RouteConfig>> [
    {
        path:"gauge",
        component:Gauge
    }
];
