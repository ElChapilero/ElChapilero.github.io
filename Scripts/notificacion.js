function showNotification(message, duration = 1500) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');

    // Actualiza el texto del mensaje
    notificationMessage.textContent = message;

    // Muestra la notificación
    notification.classList.remove('hidden');
    notification.classList.add('visible');

    // Oculta la notificación después de un tiempo
    setTimeout(() => {
        notification.classList.remove('visible');
        notification.classList.add('hidden');
    }, duration);
}

