<template>
  <div>
    <div class="max-w-lg mx-auto py-12 px-6">
      <div
        class="mb-2 text-5xl font-bold leading-none tracking-tighter dark:text-zinc-400 text-zinc-600"
      >
        Recherche
      </div>
      <div class="relative">
        <input
          v-model="query"
          @input="performSearch"
          type="text"
          placeholder="Rechercher..."
          class="w-full px-3 py-3 font-bold border border-zinc-400 bg-zinc-600 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
        />
        <div
          v-if="searchResults.length > 0"
          class="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10"
        >
          <ul>
            <li v-for="result in searchResults" :key="movie.id">
          <h3>{{ movie.title }}</h3>{
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { discoverMovie } from "../service/theimdb";

const query = ref("");
const searchResults = ref([]);

const performSearch = async () => {
  try {
    if (query.value.length > 0) {
      const response = await discoverMovie(query.value);

      console.log("Réponse de l'API:", response);

      if (response && response.results) {
        searchResults.value = response.results;
      } else {
        console.log("Aucun résultat de recherche trouvé");
      }
    } else {
      // Réinitialiser les résultats de recherche si la requête est vide
      searchResults.value = [];
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des résultats de recherche:",
      error
    );
  }
};
</script>
