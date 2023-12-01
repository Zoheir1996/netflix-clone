<script setup>
import { onMounted, ref } from "vue";
import Magnify from "vue-material-design-icons/Magnify.vue";
import HomeOutline from "vue-material-design-icons/HomeOutline.vue";
import TrendingUp from "vue-material-design-icons/TrendingUp.vue";
import Television from "vue-material-design-icons/Television.vue";
import MovieOutline from "vue-material-design-icons/MovieOutline.vue";
import Plus from "vue-material-design-icons/Plus.vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";

import { useMovieStore } from "./stores/movie";
import { storeToRefs } from "pinia";
const useMovie = useMovieStore();

const { movies, showFullVideo } = storeToRefs(useMovie);
// Une fois que le composant Vue est monté (c'est-à-dire après que le composant a été rendu et ajouté au DOM
onMounted(() => {
  // nous définissons un délai (timeout) de 100 millisecondes.
  setTimeout(() => (movies.value = movie[0][0]), 100);
});
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
      <img
        class="absolute top-0 w-[35px] mt-10 ml-10"
        src="/images/netflix-logo.png"
      />
      <div>
        <div class="py-2 mx-10 my-6">
          <Magnify fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
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
      <div
        class="fixed flex z-20 top-0 right-0 w-full h-[50] bg-black pl-[120px] bg-clip-border"
      >
        <video
          v-if="movie"
          :src="'/videos/' + movie.name + ' .mp4'"
          autoplay
          loop
        />
      </div>
    </div>
  </div>
</template>
