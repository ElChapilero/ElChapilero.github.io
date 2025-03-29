function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    if (navLinks) {
        // Alterna la clase active para mostrar u ocultar el menú
        navLinks.classList.toggle("active");
    } else {
        console.error("No se encontró el elemento con id 'navLinks'");
    }
};
document.addEventListener("click", (event) => {
    const navLinks = document.getElementById("navLinks");
    const menuToggle = document.querySelector(".menu-toggle");

    // Si el menú está activo y el clic no está dentro del botón o del menú
    if (navLinks.classList.contains("active") && 
        !navLinks.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        navLinks.classList.remove("active");
    }
});
