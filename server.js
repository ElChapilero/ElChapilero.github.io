const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

app.use(express.static(__dirname));

// Configuración de PostgreSQL
const client = new Client({
    host: 'localhost',         // Cambia esto si no estás en tu máquina local
    database: 'BD_ahorro_ de_energia', // Nombre de tu base de datos
    user: 'postgres',        // Usuario de PostgreSQL
    password: '5789', // Contraseña de PostgreSQL
    port: 5432,                // Puerto predeterminado
});

// Conectar a la base de datos
client.connect()
    .then(() => console.log('¡Conexión exitosa a PostgreSQL!'))
    .catch(err => console.error('Error al conectar a PostgreSQL:', err));

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para procesar datos del formulario

//// registro
app.post('/registrar', async (req, res) => {
    const { usuario, correo, contrasena } = req.body;

    try {
        // Cambia "cuentas" por "usuarios" en la query
        const query = 'INSERT INTO usuarios (nombre_usuario, correo, "contraseña") VALUES ($1, $2, $3)';
        const values = [usuario, correo, contrasena];
        await client.query(query, values);
        console.log(`¡Registro exitoso! para el usuario: ${usuario}`);
        res.redirect('sign_in.html');
    } catch (err) {
        console.error('Error al insertar datos:', err);
        res.status(500).send('Error al registrar usuario');
    }
});

//// inicio
app.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    try {
        // Consulta para verificar las credenciales
        const query = 'SELECT * FROM usuarios WHERE nombre_usuario = $1 AND "contraseña" = $2';
        const values = [usuario, contrasena];

        const result = await client.query(query, values);

        if (result.rows.length > 0) {
            console.log(`Inicio de sesión exitoso para el usuario: ${usuario}`);
            res.redirect('index.html');
        } else {
            console.log('Inicio de sesión fallido: Usuario o contraseña incorrectos');
            res.status(401).send('Usuario o contraseña incorrectos'); // Muestra error si las credenciales son incorrectas
        }
    } catch (err) {
        console.error('Error al verificar credenciales:', err);
        res.status(500).send('Error al iniciar sesión');
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
