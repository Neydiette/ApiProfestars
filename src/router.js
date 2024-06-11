// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import CrearEstrategia from './components/CrearEstrategia.vue';
import EstrategiaView from './components/EstrategiaView.vue';
import HomeView from './components/HomeView.vue'
import LoginView from './components/LoginView.vue'
import RegisterView from './components/RegisterView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/crear', component: CrearEstrategia },
    { path: '/estrategia/:id', component: EstrategiaView },
    { path: '/login', component: LoginView },
    { path: '/registro', component: RegisterView },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
