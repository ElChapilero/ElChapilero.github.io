let notificationTimeout; // Variable para almacenar el temporizador

function showNotification(message, imageUrl) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const notificationIcon = document.getElementById('notification-icon');

    notificationMessage.textContent = message;
    notificationIcon.src = imageUrl;
    notification.classList.remove('hidden');
    notification.style.display = 'flex';

    // Limpiar cualquier temporizador previo antes de iniciar uno nuevo
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }

    // Oculta la notificación después de 3 segundos
    notificationTimeout = setTimeout(() => {
        notification.classList.add('hidden');
        setTimeout(() => {
            notification.style.display = 'none';
        }, 200); // Espera a que la transición de opacidad termine
    }, 2000);
}
