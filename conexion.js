const { Client } = require('pg');

// Configuración de la conexión
const client = new Client({
  host: 'localhost',         // Cambia si tu base está en otro servidor
  database: 'BD_ahorro_ de_energia', // Nombre de tu base de datos
  user: 'postgres',        // Usuario de PostgreSQL
  password: '5789', // Contraseña de PostgreSQL
  port: 5432,                // Puerto predeterminado
});

// Probar la conexión
async function conectarDB() {
  try {
    await client.connect();
    console.log('¡Conexión exitosa a la base de datos!');

    // Ejecutar una consulta básica
    const res = await client.query('SELECT NOW();');
    console.log('Fecha y hora actual en la base de datos:', res.rows[0]);

    // Cierra la conexión
    await client.end();
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err);
  }
}

conectarDB();
