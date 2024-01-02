<script setup>
import { onMounted, ref } from "vue";
import movies from "./movies.json";
import Magnify from "vue-material-design-icons/Magnify.vue";
import HomeOutline from "vue-material-design-icons/HomeOutline.vue";
import TrendingUp from "vue-material-design-icons/TrendingUp.vue";
import Television from "vue-material-design-icons/Television.vue";
import MovieOutline from "vue-material-design-icons/MovieOutline.vue";
import Plus from "vue-material-design-icons/Plus.vue";

import { useMovieStore } from "./stores/movie";
import { storeToRefs } from "pinia";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
const useMovie = useMovieStore();

const { movie, showFullVideo } = storeToRefs(useMovie);
// Une fois que le composant Vue est monté (c'est-à-dire après que le composant a été rendu et ajouté au DOM
onMounted(() => {
  // nous définissons un délai (timeout) de 100 millisecondes.
  setTimeout(() => (movie.value = movies[0][0]), 100);
});
function hideTooltip() {
  const tooltip = document.querySelector(".tooltiptext");
  if (tooltip) {
    tooltip.style.visibility = "hidden";
  }
}
</script>

<template>
  <!-- Conteneur principal qui occupe toute la hauteur et la largeur de l'écran et a un fond noir -->
  <div class="fixed w-full h-screen bg-black">
    <!-- Ce div est affiché seulement si la propriété 'showFullVideo' est fausse. -->
    <div
      v-if="!showFullVideo"
      id="SideNav"
      class="flex z-40 items-center w-[120px] h-screen bg-black relative"
    >
      <router-link to="/">
        <img
          class="absolute top-0 w-[35px] mt-10 ml-10"
          src="/images/zedflix2.png"
        />
      </router-link>
      <div>
        <div class="py-2 mx-10 my-6">
          <router-link to="/search">
            <div class="tooltip">
              <Magnify
                v-if="!showFullVideo"
                fillColor="#FFFFFF"
                :size="40"
                class="cursor-pointer"
                @click="hideTooltip"
              />
              <span class="tooltiptext"> Regarde ici :p </span>
            </div>
          </router-link>
        </div>

        <div class="py-2 mx-10 my-6 border-b-4 border-b-red-500">
          <HomeOutline fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
        </div>
        <div class="py-2 mx-10 my-6">
          <TrendingUp fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
        </div>
        <div class="py-2 mx-10 my-6">
          <Television fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
        </div>
        <div class="py-2 mx-10 my-6">
          <MovieOutline fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
        </div>
        <div class="py-2 mx-10 my-6">
          <Plus fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
        </div>
      </div>
    </div>
    <div v-if="!showFullVideo">
      <RouterView class="router-view" v-slot="{ Component }">
        <Transition name="page-opacity" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>

    <div v-if="showFullVideo">
      <div
        @click="showFullVideo = false"
        class="absolute z-50 p-2 m-4 bg-white bg-opacity-50 rounded-full cursor-pointer"
      >
        <ChevronLeft fillColor="#FFFFFF" :size="30" />
      </div>
      <video
        :src="'/videos/' + movie.name + '.mp4'"
        autoplay
        loop
        controls
        class="absolute z-0 w-[100vw] h-full object-fit"
      />
    </div>
  </div>
</template>

<style>
.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: 600ms ease all;
}

.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: visible;
  width: 110px;
  background-color: rgb(255, 255, 255);
  color: #000000;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
  font-size: 10px;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: rgb(255, 255, 255) transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
