<template>
  <div
    class="p-4 bg-gradient-to-r from-purple-600 to-purple-800"
    style="height: calc(100vh - 3rem)"
  >
    <router-link to="/"
      class="text-white px-4 py-1 rounded-xl mb-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
    >
      Volver
    </router-link>
    <div v-if="!estrategia"> <!-- Verifica si estrategia es nulo -->
      <p class="text-white">No se ha seleccionado ninguna estrategia.</p>
    </div>
    <div v-else> <!-- Si estrategia está definido -->
      <div v-if="loading">Cargando...</div>
      <div
        v-else
        class="max-w-2xl mx-auto bg-gradient-to-br border from-sky-700 to-blue-800 text-white p-6 rounded-lg shadow-lg"
      >
        <h2 class="text-3xl font-bold mb-4">{{ estrategia.titulo }}</h2>
        <p class="text-lg mb-2">
          <strong>Profesor:</strong> {{ estrategia.profesor.nombre_completo }}
        </p>
        <p class="text-lg mb-2">
          <strong>Materia:</strong> {{ estrategia.materia.nombre }}
        </p>
        <p class="text-lg mb-2">
          <strong>Semestre:</strong> {{ estrategia.semestre }}
        </p>
        <div class="mb-4">
          <strong>Estratégia:</strong>
          <p>{{ estrategia.estrategia }}</p>
        </div>
        <div class="mb-4">
          <strong>Etiquetas:</strong>
          <ul class="list-disc list-inside">
            <li v-for="etiqueta in estrategia.etiquetas" :key="etiqueta">
              {{ etiqueta }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "EstrategiaView",
  data() {
    return {
      estrategia: null,
      loading: true,
    };
  },
  mounted() {
    this.fetchEstrategia();
  },
  methods: {
    fetchEstrategia() {
      const id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/estrategias/${id}`)
        .then((response) => {
          let estrategia = response.data;
          if (estrategia.etiquetas) {
            try {
              estrategia.etiquetas = JSON.parse(estrategia.etiquetas);
            } catch (e) {
              console.error("Error parsing etiquetas:", e);
              estrategia.etiquetas = [];
            }
          } else {
            estrategia.etiquetas = [];
          }
          this.estrategia = estrategia;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching estrategia details:", error);
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
button {
  display: block;
  margin-bottom: 1rem;
}
</style>
