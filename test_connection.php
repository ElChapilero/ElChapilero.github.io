<?php
$host = 'localhost';  // Dirección del servidor (si es local, usa 'localhost')
$db = 'registro_db';  // Nombre de la base de datos
$user = 'postgres';   // Usuario de la base de datos
$password = '5789'; // Contraseña de la base de datos

// Intentar conectarse a la base de datos
$conexion = pg_connect("host=$host dbname=$db user=$user password=$password");

if ($conexion) {
    echo "Conexión exitosa a la base de datos PostgreSQL";
} else {
    echo "Error de conexión a la base de datos: " . pg_last_error();
}
?>

