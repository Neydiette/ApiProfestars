<template>
  <div
    class="flex flex-col justify-center items-center bg-gradient-to-r from-purple-600 to-purple-800 p-4 h-screen"
  >
    <div v-if="isVisible" class="fixed bg-black/30 inset-0 w-full h-full flex justify-center items-center">
      <div class="p-2 text-center mb-2 rounded-md bg-white text-emerald-500">Se creo exitosamente</div>
    </div>
    <div
      class="mx-auto max-w-md p-4 bg-gradient-to-br border from-sky-700 to-blue-800 rounded shadow-lg"
    >
      <h2 class="text-2xl font-semibold mb-4 text-white">Crear Estrategia</h2>
      <form @submit.prevent="crearEstrategia">
        <div class="mb-6">
          <label for="titulo" class="block text-sm font-medium text-white"
            >Título:</label
          >
          <input
            type="text"
            id="titulo"
            v-model="titulo"
            required
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-6">
          <label for="profesor" class="block text-sm font-medium text-white"
            >Profesor:</label
          >
          <select
            v-model="profesorId"
            required
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="" disabled selected>Selecciona un profesor</option>
            <option
              v-for="profesor in profesores"
              :key="profesor.id"
              :value="profesor.id"
            >
              {{ profesor.nombre_completo }}
            </option>
          </select>
        </div>
        <div class="mb-6">
          <label for="materia" class="block text-sm font-medium text-white"
            >Materia:</label
          >
          <select
            v-model="materiaId"
            required
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="" disabled selected>Selecciona una materia</option>
            <option
              v-for="materia in materias"
              :key="materia.id"
              :value="materia.id"
            >
              {{ materia.nombre }}
            </option>
          </select>
        </div>

        <div class="mb-6">
          <label for="semestre" class="block text-sm font-medium text-white"
            >Semestre:</label
          >
          <select
            id="semestre"
            v-model="semestre"
            required
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="" disabled selected>Selecciona el semestre</option>
            <option value="primer semestre">Primer semestre</option>
            <option value="segundo semestre">Segundo semestre</option>
            <option value="tercer semestre">Tercer semestre</option>
            <option value="cuarto semestre">Cuarto semestre</option>
            <option value="quinto semestre">Quinto semestre</option>
            <option value="sexto semestre">Sexto semestre</option>
            <option value="séptimo semestre">Séptimo semestre</option>
            <option value="octavo semestre">Octavo semestre</option>
            <option value="noveno semestre">Noveno semestre</option>
          </select>
        </div>

        <div class="mb-6">
          <label for="estrategia" class="block text-sm font-medium text-white"
            >Estrategia:</label
          >
          <textarea
            id="estrategia"
            v-model="estrategia"
            required
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div class="mb-6 relative">
          <label class="block text-sm font-medium text-white">Etiquetas:</label>
          <div class="flex flex-wrap z-10">
            <div
              v-for="etiqueta in etiquetasPredeterminadas"
              :key="etiqueta"
              class="flex items-center mr-4 mb-2"
            >
              <input
                type="checkbox"
                :id="etiqueta"
                v-model="etiquetasSeleccionadas"
                :value="etiqueta"
                @change="actualizarEtiquetas"
                class="mr-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label :for="etiqueta" class="text-sm text-white">{{
                etiqueta
              }}</label>
            </div>
          </div>
          <input
            v-model="etiquetasSeleccionadas"
            required
            type="text"
            class="opacity-0 pointer-events-none right-0 h-1 text-xs absolute bottom-2 z-0"
          />
        </div>
        <button
          type="submit"
          class="bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Crear Estrategia
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      titulo: "",
      profesorId: "",
      materiaId: "",
      semestre: "",
      estrategia: "",
      etiquetasSeleccionadas: [],
      etiquetasPredeterminadas: [
        "exito",
        "salvasemestre",
        "consejazo",
        "experiencia",
      ],
      profesores: [],
      materias: [],
      userId: null,
      isVisible: false,
    };
  },
  mounted() {
    this.obtenerProfesores();
    this.obtenerMaterias();
    this.userId = localStorage.getItem("userId");
  },
  methods: {
    async obtenerProfesores() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/profesores"
        );
        this.profesores = response.data;
      } catch (error) {
        console.error("Error al obtener la lista de profesores:", error);
      }
    },
    async obtenerMaterias() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/materias");
        this.materias = response.data;
      } catch (error) {
        console.error("Error al obtener la lista de materias:", error);
      }
    },
    async crearEstrategia() {
      const payload = {
        user_id: this.userId,
        titulo: this.titulo,
        profesor_id: this.profesorId,
        materia_id: this.materiaId,
        semestre: this.semestre,
        estrategia: this.estrategia,
        etiquetas: this.etiquetasSeleccionadas,
      };
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/estrategias/store",
          payload
        );
        console.log(response.data.message);

        this.titulo = "";
        this.profesorId = null;
        this.materiaId = null;
        this.semestre = "";
        this.estrategia = "";
        this.etiquetasSeleccionadas = [];

        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 1000); // 5000 ms = 5 segundos
      } catch (error) {
        console.error("Error al crear la estrategia:", error);
      }
    },
    actualizarEtiquetas() {
      this.etiquetas = this.etiquetasSeleccionadas;
    },
  },
};
</script>
