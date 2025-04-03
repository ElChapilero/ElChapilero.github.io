// Variables para manejar el estado de la sesión
let isLoggedIn = false; // Estado inicial: usuario no logueado

// Elementos del DOM
const profileName = document.getElementById("profile-name");
const dropdownMenu = document.querySelector(".dropdown-menu");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");

// Función para verificar sesión en el backend
function checkSession() {
    fetch('http://localhost:3000/checkSession') // Endpoint para verificar la sesión
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al verificar la sesión');
            }
            return response.json();
        })
        .then(data => {
            if (data.isLoggedIn) {
                // Usuario logueado: mostrar "Cerrar Sesión", ocultar "Iniciar Sesión" y "Crear Cuenta"
                isLoggedIn = true;
                profileName.textContent = data.nombreUsuario; // Colocar el nombre del usuario
                loginBtn.style.display = 'none'; // Ocultar "Iniciar Sesión"
                registerBtn.style.display = 'none'; // Ocultar "Crear Cuenta"
                logoutBtn.style.display = 'block'; // Mostrar "Cerrar Sesión"
            } else {
                // Usuario no logueado: mostrar "Iniciar Sesión" y "Crear Cuenta", ocultar "Cerrar Sesión"
                isLoggedIn = false;
                profileName.textContent = 'Perfil'; // Texto por defecto si no hay usuario logueado
                loginBtn.style.display = 'block'; // Mostrar "Iniciar Sesión"
                registerBtn.style.display = 'block'; // Mostrar "Crear Cuenta"
                logoutBtn.style.display = 'none'; // Ocultar "Cerrar Sesión"
            }
        })
        .catch(error => {
            console.error('Error al verificar la sesión:', error);
        });
}

// Llamar a la función de verificación al cargar la página
document.addEventListener("DOMContentLoaded", checkSession);

// Función para mostrar/ocultar el menú desplegable al hacer clic en "Perfil"
profileName.addEventListener("click", () => {
    dropdownMenu.classList.toggle("active"); // Alterna la clase 'active' para mostrar u ocultar el menú
});

// Cerrar el menú desplegable al hacer clic fuera de él
document.addEventListener("click", (event) => {
    if (!profileName.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove("active");
    }
});

// Función de cierre de sesión
logoutBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevenir comportamiento por defecto
    fetch('http://localhost:3000/logout', { method: 'POST' }) // Endpoint para cerrar la sesión
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cerrar la sesión');
            }
            return response.json();
        })
        .then(() => {
            isLoggedIn = false;
            profileName.textContent = 'Perfil'; // Resetear el nombre del perfil
            loginBtn.style.display = 'block'; // Mostrar "Iniciar Sesión"
            registerBtn.style.display = 'block'; // Mostrar "Crear Cuenta"
            logoutBtn.style.display = 'none'; // Ocultar "Cerrar Sesión"
            dropdownMenu.classList.remove('active'); // Cerrar el menú desplegable
            showNotification(`¡Has cerrado sesión exitosamente!`);
        })
        .catch(error => {
            console.error('Error al cerrar la sesión:', error);
            showNotification(`¡Ocurrió un error al cerrar la sesión!`);
        });
});
