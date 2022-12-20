import { createWebHistory, createRouter } from "vue-router";

const history = createWebHistory();

const routes = [
  { 
    path: '/', 
    name: 'home', 
    component: () => import('./components/Home.vue')
  },
  { 
    path: '/iso', 
    name: 'iso', 
    component: () => import('./components/TestIsotope.vue')
  },
  { 
    path: '/project/:name', 
    name: 'project' , 
    component: () => import('./components/Project.vue')
  },
  // aliases
  { path: "/:catchAll(.*)", redirect: '/404' }
] ; 

const Router_ = createRouter({ history, routes });

export default Router_ ; 