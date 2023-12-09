import { createRouter, createWebHistory } from "vue-router";
import Homeview from "../views/Homeview.vue";
import Searchview from "../views/Searchview.vue";

const routes = [
  { path: "/", component: Homeview },
  { path: "/search", component: Searchview },
  // Ajoutez d'autres routes selon vos besoins
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
