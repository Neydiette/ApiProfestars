<template>
    <div class="flex flex-col justify-center items-center bg-gradient-to-r from-purple-600 to-purple-800"  style="height: calc(100vh - 3rem);">
        <div v-if="registerError" class="mb-4 bg-red-500 text-white p-2 rounded">
          {{ registerError }}
        </div>
      <form
        class="bg-gradient-to-br border from-sky-700 to-blue-800 text-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-64"
        @submit.prevent="register"
      >
  
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="name">Nombre</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Nombre"
            v-model="name"
            required
          />
        </div>
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
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="password">Contraseña</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Contraseña"
            v-model="password"
            required
            minlength="8"
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-bold mb-2" for="confirm-password">Confirmar Contraseña</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm-password"
            type="password"
            placeholder="Confirmar Contraseña"
            v-model="confirmPassword"
            required
            minlength="8"
          />
          <span v-if="password !== confirmPassword" class="text-red-500 text-xs italic">
            Las contraseñas no coinciden
          </span>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "RegisterForm",
    data() {
      return {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        registerError: null 
      };
    },
    methods: {
      async register() {
        if (this.password !== this.confirmPassword) {
          
          this.registerError = "Las contraseñas no coinciden";
          return;
        }
  
        const payload = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/register", payload);
          console.log(response.data.message);
          
          this.$emit("register-successful");
          
          this.loginAfterRegister();
        } catch (error) {
          this.registerError = error.response.data.message;
          console.error(error.response.data.message);
        }
      },
      async loginAfterRegister() {
        const payload = {
          email: this.email,
          password: this.password
        };
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/login", payload);
          var data = response.data;
          console.log(response.data.message);
          localStorage.setItem('userId', data.id);
          this.$emit("login-successful"); 
          this.$router.push("/");
        } catch (error) {
          console.error(error.response.data.message);
        }
      }
    }
  };
  </script>
  