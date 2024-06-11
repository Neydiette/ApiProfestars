<template>
  <div class="flex flex-col justify-center items-center bg-gradient-to-r from-purple-600 to-purple-800" style="height: calc(100vh - 3rem);">
    <div v-if="loginError" class="mb-4 bg-red-500 text-white p-2 rounded">
      {{ loginError }}
    </div>
    <form
      class="bg-gradient-to-br border from-sky-700 to-blue-800 text-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-64"
      @submit.prevent="login"
    >
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2" for="email">Email</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          v-model="email"
          required
        />
        <span
          v-if="submitted && !isValidEmail"
          class="text-red-500 text-xs italic"
        >
          Por favor ingresa un correo electrónico válido
        </span>
      </div>
      <div class="mb-6">
        <label class="block text-sm font-bold mb-2" for="password"
          >Contraseña</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Contraseña"
          v-model="password"
          required
        />
        <span v-if="submitted && !password" class="text-red-500 text-xs italic">
          Por favor ingresa una contraseña
        </span>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Iniciar sesión
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      submitted: false, 
      loginError: null, 
    };
  },
  computed: {
    isValidEmail() {
      
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email);
    },
    isValidForm() {
      return this.email && this.isValidEmail && this.password;
    },
  },
  methods: {
    async login() {
      this.submitted = true;
      this.loginError = null; 

      if (!this.isValidForm) {
        
        console.error("Por favor completa el formulario correctamente");
        return;
      }
      var payload = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/login",
          payload
        );
        var data = response.data;
        console.log(data.message);
        localStorage.setItem('userId', data.id);
        
        this.$emit("login-successful");
        this.$router.push("/");
      } catch (error) {
        var dataerror = error.response.data;
        this.loginError = dataerror.message; 
        console.log(dataerror.message);
      }
    },
  },
};
</script>
