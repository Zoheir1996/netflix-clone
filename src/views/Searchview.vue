<template>
  <div>
    <div
      class="fixed flex z-20 top-0 right-0 w-full h-[50%] bg-black pl-[120px] bg-clip-border"
    >
      <!-- Bouton "Back" avec un chevron gauche -->
      <button
        white
        @click="goBack"
        style="color: white; background: none; border: none; cursor: pointer"
      >
        <ChevronLeft size="40" />
        <!-- Caractère Unicode du chevron gauche -->
      </button>
      <div
        class="fullscreen-video fixed z-30 bottom-0 right-0 w-full h-full pl-[120px] overflow-y-auto"
      >
        <ul
          style="
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            color: white;
          "
        >
          <li
            v-for="movie in movies"
            :key="movie.id"
            style="position: relative"
          >
            <span
              style="position: absolute; z-index: 1000; right: 0; bottom: 24px"
              >{{ movie.vote_average }}</span
            >
            <img
              :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
            />
            {{ movie.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import { getPlayedNow } from "../service/theimdb";
export default {
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    goBack() {
      window.history.back();
    },
    search() {},
  },
  components: { ChevronLeft },
  async beforeMount() {
    this.movies = await getPlayedNow();
  },
};
</script>
