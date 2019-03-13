import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index.vue';
import examples from "@/router/examples";

Vue.use(Router);

export default new Router({
  routes: examples
})
