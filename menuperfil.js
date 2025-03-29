// Variables para manejar el estado de la sesión
let isLoggedIn = false; // Estado inicial: usuario no logueado

// Elementos del DOM
const profileName = document.getElementById("profile-name");
const dropdownMenu = document.querySelector(".dropdown-menu");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");

// Función para mostrar/ocultar el menú desplegable al hacer clic en "Perfil"
profileName.addEventListener("click", () => {
    dropdownMenu.classList.toggle("active"); // Alterna la clase 'active' para mostrar u ocultar el menú
});

document.addEventListener("click", (event) => {
    if (!profileName.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove("active");
    }
});