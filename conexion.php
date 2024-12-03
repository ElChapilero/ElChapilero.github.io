<?php
// Configuración de la conexión a la base de datos
$host = 'localhost';    
$db = 'registro_db';
$user = 'postgres';
$password = '5789';
// Conectar a la base de datos PostgreSQL
$conexion = pg_connect("host=$host dbname=$db user=$user password=$password");


if (!$conexion) {
    die("Error de conexión a la base de datos");
} else {
    echo "Conexión exitosa a la base de datos PostgreSQL";
}
?>

