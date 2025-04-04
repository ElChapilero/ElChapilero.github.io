function toggleProfileMenu(event) {
    event.preventDefault();
    const menu = document.getElementById("profileMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Cerrar el menú si se hace clic fuera de él
window.addEventListener("click", function(event) {
    const menu = document.getElementById("profileMenu");
    const profileLink = document.querySelector(".perfil");

    if (event.target !== profileLink && !profileLink.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = "none";
    }
});