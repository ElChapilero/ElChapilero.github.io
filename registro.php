<?php
$host = 'localhost'; // Dirección del servidor
$db = 'registro_db'; // Nombre de la base de datos
$user = 'postgres';  // Usuario de la base de datos
$password = 'tu_contraseña'; // Contraseña de la base de datos

// Conectar a la base de datos PostgreSQL
$conexion = pg_connect("host=$host dbname=$db user=$user password=$password");

if (!$conexion) {
    die("Error de conexión a la base de datos");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos del formulario
    $usuario = $_POST['usuario'];
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];
    $telefono = $_POST['telefono'];
    
    // Verificar si las contraseñas coinciden
    if ($contraseña != $_POST['confirmar_contraseña']) {
        die('Las contraseñas no coinciden');
    }

    // Preparar la consulta para insertar los datos
    $consulta = "INSERT INTO usuarios (usuario, correo, contraseña, telefono) VALUES ('$usuario', '$correo', '$contraseña', '$telefono')";

    // Ejecutar la consulta
    $resultado = pg_query($conexion, $consulta);

    if ($resultado) {
        echo "Usuario registrado con éxito";
    } else {
        echo "Error al registrar el usuario: " . pg_last_error($conexion);
    }
    
    pg_close($conexion);
}
?>
