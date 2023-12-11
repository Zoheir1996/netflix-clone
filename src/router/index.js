import { createRouter, createWebHistory } from "vue-router";
import Homeview from "../views/Homeview.vue";
import Searchview from "../views/Searchview.vue";

const routes = [
  {
    path: "/",
    component: Homeview,
    meta: {
      enterClass: "animate__animated animate__fadeInleft",
      leaveClass: "animate__animated animate__fadeOutleft",
    },
  },
  {
    path: "/search",
    component: Searchview,
    meta: {
      enterClass: "animate__animated animate__fadeInleft",
      leaveClass: "animate__animated animate__fadeOutleft",
    },
  },
  // Ajoutez d'autres routes selon vos besoins
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
