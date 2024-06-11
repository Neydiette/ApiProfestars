<template>
  <div class="overflow-hidden" style="height: calc(100vh - 3rem)">
    <div class="h-full w-full grid grid-cols-1 grid-rows-12 justify-items-center bg-gradient-to-r from-purple-600 to-purple-800">
      <h1
        class="text-2xl font-bold row-span-1 p-2 flex items-center justify-center text-white"
      >
        Estrategias
      </h1>
      <div v-if="loading" class="row-span-10 flex items-center justify-center text-gray-600 text-lg font-semibold">
        Cargando...
      </div>
      <div
        v-else
        class="row-span-10 overflow-y-auto md:w-1/2 w-full flex flex-col items-center justify-start p-2 gap-2"
      >
        <router-link :to="'/estrategia/' + strategy.id"
          v-for="(strategy, index) in strategies"
          :key="strategy.id"
          class="bg-gradient-to-br border from-sky-700 to-blue-800 cursor-pointer gap-2 flex flex-col justify-center items-center h-28 text-white shadow-md rounded-lg p-2 overflow-hidden w-full hover:shadow-xl transform transition duration-300"
          v-show="index < limit"
        >
          <h2 class="text-lg font-semibold">
            {{ strategy.titulo }}
          </h2>
          <p class="line-clamp-3 text-center text-xs">{{ strategy.estrategia }}</p>
        </router-link>
      </div>

      <div class="flex items-center justify-between row-span-1 p-2">
        <button
          @click="prevPage"
          :disabled="page === 1"
          class="bg-emerald-700 text-sm hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
        >
          Anterior
        </button>
        <span class="text-base mx-4 text-gray-200">Página {{ page }}</span>
        <button
          @click="nextPage"
          :disabled="!hasMore"
          class="bg-emerald-700 text-sm hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      strategies: [],
      loading: true,
      page: localStorage.getItem("currentPage") || 1, 
      limit: 5,
      hasMore: false,
    };
  },
  mounted() {
    this.fetchStrategies();
  },
  methods: {
    fetchStrategies() {
      this.loading = true;
      axios
        .get(
          `http://127.0.0.1:8000/api/estrategias?page=${this.page}&limit=${this.limit}`
        )
        .then((response) => {
          this.strategies = response.data.data;
          this.hasMore = response.data.current_page < response.data.last_page;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching strategies:", error);
          this.loading = false;
        });
    },
    nextPage() {
      if (this.hasMore) {
        this.page++;
        this.fetchStrategies();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchStrategies();
      }
    },
  },
  watch: {
    page(newPage) {
      localStorage.setItem("currentPage", newPage); 
    },
  },
};
</script>

