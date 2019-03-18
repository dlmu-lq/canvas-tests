import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index.vue';
import examples from "@/router/examples";
import {mutationTypes} from "@/store";

Vue.use(Router);

const router = new Router({
  routes: [
      {
          path:"",
          name:"index",
          component:Index,
          children:examples
      }
  ]
});

router.afterEach((to,from)=>{
    const vm = router.app;
    if(vm && vm.$store.state){
        vm.$store.commit(mutationTypes.setRouterName,to.name)
    }
});

export default router;
