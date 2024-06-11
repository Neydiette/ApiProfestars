<template>
  <div
    class="bg-emerald-500 h-12 flex items-center justify-between overflow-hidden shadow-lg"
  >
    <router-link
      to="/"
      class="md:text-xl text-base text-white hover:text-yellow-300 focus:outline-none h-full flex justify-center items-center p-3"
    >
      Profestars
    </router-link>
    <div
      class="flex justify-center items-center h-full text-white font-semibold"
    >
      <router-link
        to="/"
        class="h-full p-2 md:text-base text-xs hover:bg-emerald-400 hover:text-white active:bg-emerald-600 active:text-white focus:outline-none"
      >
        Home
      </router-link>
      <!-- Mostrar el botón de inicio de sesión solo si el usuario no ha iniciado sesión -->
      <router-link
        to="/login"
        v-if="!isLoggedIn"
        class="h-full p-2 md:text-base text-xs hover:bg-emerald-400 hover:text-white active:bg-emerald-600 active:text-white focus:outline-none"
      >
        Iniciar sesión
      </router-link>
      <!-- Mostrar el botón de registro solo si el usuario no ha iniciado sesión -->
      <router-link
        to="/registro"
        v-if="!isLoggedIn"
        class="h-full p-2 md:text-base text-xs hover:bg-emerald-400 hover:text-white active:bg-emerald-600 active:text-white focus:outline-none"
      >
        Registro
      </router-link>
      <!-- Mostrar el botón de logout solo si el usuario ha iniciado sesión -->
      <router-link
        to="/crear"
        v-if="isLoggedIn"
        class="h-full p-2 md:text-base text-xs hover:bg-emerald-400 hover:text-white active:bg-emerald-600 active:text-white focus:outline-none"
      >
        Crear
      </router-link>
      <button
        v-if="isLoggedIn"
        @click="logout"
        class="h-full p-2 md:text-base text-xs hover:bg-emerald-400 hover:text-white active:bg-emerald-600 active:text-white focus:outline-none"
      >
        Cerrar sesión
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = localStorage.getItem("userId") !== null;
    },
    logout() { 
      localStorage.removeItem("userId");
      this.isLoggedIn = false;
      this.$router.push("/login");
    },
  },
  watch: {
    $route() {
      this.checkLoginStatus();
    },
  },
};
</script>
