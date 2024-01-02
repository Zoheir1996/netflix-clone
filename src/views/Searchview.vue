<template>
  <div>
    <div
      class="fixed flex z-20 top-0 right-0 w-full h-[50%] bg-black pl-[120px] bg-clip-border"
    >
      <!-- Bouton "Back" avec un chevron gauche -->
      <div
        @click="goBack"
        class="absolute z-50 p-2 m-4 bg-white bg-opacity-50 rounded-full cursor-pointer"
      >
        <ChevronLeft fillColor="#FFFFFF" :size="30" />
      </div>
      <div
        class="fullscreen-video fixed z-30 bottom-0 right-0 w-full h-full pl-[120px] overflow-y-auto"
      >
        <SearchMovie />
        <div class="py-3">
          <div
            class="mb-2 text-5xl font-bold leading-none tracking-tighter dark:text-zinc-400 text-zinc-600 text-center"
          >
            Les dernieres sorties au cinéma
          </div>
          <div class="card-container" ref="cardContainer ">
            <div
              v-for="movie in sortedMovies"
              :key="movie.id"
              class="card-movie"
              style="margin-top: 20px"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import { getPlayedNow } from "../service/theimdb";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import SearchMovie from "../components/SearchMovie.vue";

export default {
  data() {
    return {
      movies: [],
    };
  },
  computed: {
    sortedMovies() {
      return [...this.movies].sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    },
  },
  methods: {
    formatNumber(number) {
      return number.toFixed(1);
    },
    formatFrenchDate(date) {
      return format(new Date(date), "dd MMMM yyyy", { locale: fr });
    },
    goBack() {
      window.history.back();
    },
  },
  components: { ChevronLeft, SearchMovie },
  async beforeMount() {
    this.movies = await getPlayedNow();
  },
};



</script>

<style>
.movie-details {
  position: absolute;
  bottom: 70px;
  left: 0;
  background: #3e4145;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 -5px 10px -5px #000;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
}
.card-movie:hover .movie-details {
  opacity: 1;
}

.sorted .card-movie {
  transition: transform 0.15s ease-in-out;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* Alignez les cartes de gauche à droite */
  padding: 8%;
  padding-top: 40px;
}

.card-movie {
  margin: 20px;
  background: #2a2d31;
  color: #fff;
  width: 250px;
  height: 350px;
  border-radius: 7px;
  box-shadow: 0 0 20px grey;
  overflow: hidden;
  transition: transform 0.15s ease-in-out;
  position: relative;
}

.card-movie:hover {
  transform: scale(1.1);
}

.card-thumb {
  width: 100%;
  height: 80%;
  object-fit: cover;
  transition: filter 0.3s ease-in-out; /* Ajout de l'effet de transition pour une expérience plus fluide */
}

.card-movie:hover .card-thumb {
  filter: brightness(70%); /* Assombrit l'image au survol */
}

.movie-vote {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 45px;
  height: 45px;
  background: #c82d47;
  border-radius: 50%;
  text-align: center;
  line-height: 45px;
  font-weight: 700;
  box-shadow: 0 0 20px #000;
}

.card-body {
  width: 100%;
  padding: 10px;
  text-align: center;
}

.movie-title {
  font-size: 1rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.movie-date {
  margin: 0;
  font-size: 0.85rem;
  color: grey;
}
.movie-details p {
  font-size: 0.7rem;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: start;
}
.titleInDetails {
  font-size: 0.9rem;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 700;
}
</style>
