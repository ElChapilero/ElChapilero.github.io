const inputs = document.querySelectorAll('.solo-positivos');

inputs.forEach(input => {
    input.addEventListener('keydown', function (e) {
        const allowedKeys = [
            'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End',
            '.', // permitir punto decimal
        ];

        // Permitir números del 0 al 9
        if ((e.key >= '0' && e.key <= '9') || allowedKeys.includes(e.key)) {
            return;
        }

        // Bloquear todo lo demás
        e.preventDefault();
    });

    input.addEventListener('paste', function (e) {
        const pasted = e.clipboardData.getData('text');
        if (!/^\d*\.?\d*$/.test(pasted)) {
            e.preventDefault();
        }
    });
});
