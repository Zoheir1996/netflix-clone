<template>
  <div>
    <div class="padding:10% mx-auto py-12 px-10 ">
      <div
        class="mb-2 text-5xl font-bold leading-none tracking-tighter dark:text-zinc-400 text-zinc-600"
      >
        Recherche
      </div>
      <div class="relative">
        <input
          v-model="query"
          @input="onInput"
          type="text"
          placeholder="Rechercher..."
          class="w-full px-3 py-3 font-bold border border-zinc-400 bg-zinc-600 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
        />
        <div
          v-if="searchResults.length > 0"
          class="card-container"
          ref="cardContainer"
          style="display: flex; flex-wrap; justify-content: flex-start; padding: 8%;"
        >
          <div
            v-for="movie in searchResults.filter(
              (movie) => movie.backdrop_path
            )"
            :key="movie.id"
            class="card-movie"
          >
            <img
              class="card-thumb"
              :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
              :alt="`Poster for ${movie.title}`"
            />
            <span class="movie-vote">{{
              formatNumber(movie.vote_average)
            }}</span>
            <div class="card-body">
              <p class="movie-title">{{ movie.title }}</p>
              <p class="movie-date">
                {{ formatFrenchDate(movie.release_date) }}
              </p>
              <div class="movie-details">
                <h3 class="titleInDetails">Resumé</h3>
                <p>{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="searchResults.length > 0"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { discoverMovie } from "../service/theimdb";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";

const query = ref("");
const searchResults = ref([]);

function formatNumber(number) {
  return number.toFixed(1);
}

function formatFrenchDate(date) {
  return format(new Date(date), "dd MMMM yyyy", { locale: fr });
}
const onInput = () => {
  // Réinitialiser les résultats de recherche si la requête est vide
  if (query.value.length === 0) {
    searchResults.value = [];
  }
  performSearch();
};

const performSearch = async () => {
  try {
    if (query.value.length > 0) {
      const results = await discoverMovie(query.value);
      console.log(results);
      searchResults.value = results;
    } else {
      // Réinitialiser les résultats de recherche si la requête est vide
      searchResults.value = [];
    }
  } catch (error) {
    console.error("Erreur lors de la recherche de films :", error.message);
  }
};
</script>
