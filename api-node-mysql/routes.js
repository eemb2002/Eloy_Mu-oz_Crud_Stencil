const express = require('express');
const routes = express.Router();

// Leer todas las actividades
routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('SELECT * FROM actividades', (err, rows) => {
            if (err) return res.send(err);

            res.json(rows);
        });
    });
});

// Leer una actividad específica por ID
routes.get('/:id', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('SELECT * FROM actividades WHERE id_actividad = ?', [id], (err, rows) => {
            if (err) return res.send(err);

            res.json(rows[0]);
        });
    });
});

// Crear una nueva actividad
routes.post('/', (req, res) => {
    const actividad = req.body;
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('INSERT INTO actividades SET ?', [actividad], (err, rows) => {
            if (err) return res.send(err);

            res.send('Actividad creada');
        });
    });
});

// Actualizar una actividad existente
routes.put('/:id', (req, res) => {
    const { id } = req.params;
    const actividad = req.body;
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('UPDATE actividades SET ? WHERE id_actividad = ?', [actividad, id], (err, rows) => {
            if (err) return res.send(err);

            res.send('Actividad actualizada');
        });
    });
});

// Eliminar una actividad
routes.delete('/:id', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('DELETE FROM actividades WHERE id_actividad = ?', [id], (err, rows) => {
            if (err) return res.send(err);

            res.send('Actividad eliminada');
        });
    });
});

module.exports = routes;
