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

    // Preparar la consulta para insertar los datos
    $consulta = "INSERT INTO usuarios (usuario, correo, contraseña, telefono) VALUES ('$usuario', '$correo', '$contraseña', '$telefono')";

    // Ejecutar la consulta
    $resultado = pg_query($conexion, $consulta);

    if ($resultado) {
        // Redirigir a la página de inicio (index.php) después del registro exitoso
        header("Location: index.php");
        exit();  // Asegúrate de llamar a exit() después de la redirección
    } else {
        echo "Error al registrar el usuario: " . pg_last_error($conexion);
    }
    
    pg_close($conexion);
}
?>

