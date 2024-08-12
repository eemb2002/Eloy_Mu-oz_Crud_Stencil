-- Crear la base de datos
CREATE DATABASE tareasD;
USE tareasD;

-- Crear la tabla actividades
CREATE TABLE actividades (
  id_actividad INT AUTO_INCREMENT PRIMARY KEY,
  nombre_actividad VARCHAR(100) NOT NULL,
  descripcion_actividad TEXT,
  fecha_inicio DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  fecha_fin DATE,
  hora_fin TIME,
  estado ENUM('Pendiente', 'En Proceso', 'Completada') DEFAULT 'Pendiente',
  prioridad ENUM('Baja', 'Media', 'Alta') DEFAULT 'Media',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO actividades (nombre_actividad, descripcion_actividad, fecha_inicio, hora_inicio, fecha_fin, hora_fin, estado, prioridad) VALUES 
('Revisar el presupuesto', 'Analizar y ajustar el presupuesto mensual para ahorrar más.', '2024-08-13', '08:00:00', '2024-08-13', '09:00:00', 'Pendiente', 'Alta'),
('Comprar suministros', 'Adquirir materiales necesarios para el proyecto de bricolaje.', '2024-08-13', '11:00:00', '2024-08-13', '12:00:00', 'Pendiente', 'Media'),
('Actualizar software', 'Instalar las actualizaciones más recientes en todos los dispositivos.', '2024-08-14', '13:00:00', '2024-08-14', '14:30:00', 'Pendiente', 'Alta'),
('Escribir informe', 'Redactar el informe mensual sobre el rendimiento del equipo.', '2024-08-14', '15:00:00', '2024-08-14', '17:00:00', 'Pendiente', 'Alta'),
('Limpiar la casa', 'Realizar una limpieza profunda de la casa, incluyendo aspirar y desempolvar.', '2024-08-15', '09:00:00', '2024-08-15', '11:00:00', 'Pendiente', 'Media'),
('Reunión de equipo', 'Reunión semanal con el equipo para discutir el progreso del proyecto.', '2024-08-15', '14:00:00', '2024-08-15', '15:00:00', 'Pendiente', 'Alta'),
('Cita médica', 'Visitar al médico para un chequeo de rutina.', '2024-08-16', '10:00:00', '2024-08-16', '11:00:00', 'Pendiente', 'Alta'),
('Organizar escritorio', 'Ordenar y organizar el escritorio para mejorar la productividad.', '2024-08-16', '16:00:00', '2024-08-16', '17:00:00', 'Pendiente', 'Baja'),
('Preparar presentación', 'Desarrollar la presentación para la reunión con el cliente.', '2024-08-17', '13:00:00', '2024-08-17', '15:00:00', 'Pendiente', 'Alta'),
('Hacer yoga', 'Participar en una sesión de yoga para relajarse y estirarse.', '2024-08-17', '07:00:00', '2024-08-17', '08:00:00', 'Pendiente', 'Media'),
('Leer un libro', 'Dedicar tiempo a la lectura de un libro de desarrollo personal.', '2024-08-18', '20:00:00', '2024-08-18', '21:00:00', 'Pendiente', 'Baja'),
('Revisar correos', 'Verificar y responder a los correos electrónicos pendientes.', '2024-08-18', '09:00:00', '2024-08-18', '10:00:00', 'Pendiente', 'Media'),
('Investigar nuevas tecnologías', 'Investigar sobre las últimas tecnologías en el campo de la inteligencia artificial.', '2024-08-19', '11:00:00', '2024-08-19', '13:00:00', 'Pendiente', 'Alta'),
('Hacer jardinería', 'Cuidar las plantas del jardín y plantar nuevas flores.', '2024-08-19', '16:00:00', '2024-08-19', '17:30:00', 'Pendiente', 'Media'),
('Cenar en familia', 'Pasar tiempo de calidad cenando con la familia en casa.', '2024-08-20', '19:00:00', '2024-08-20', '20:30:00', 'Pendiente', 'Alta'),
('Planificar vacaciones', 'Organizar y planificar las próximas vacaciones familiares.', '2024-08-20', '14:00:00', '2024-08-20', '15:30:00', 'Pendiente', 'Alta'),
('Asistir a un curso online', 'Participar en un curso online sobre gestión de proyectos.', '2024-08-21', '10:00:00', '2024-08-21', '12:00:00', 'Pendiente', 'Alta'),
('Preparar cena especial', 'Cocinar una cena especial para celebrar un evento importante.', '2024-08-21', '18:00:00', '2024-08-21', '20:00:00', 'Pendiente', 'Alta'),
('Revisar finanzas', 'Verificar las finanzas personales y planificar el ahorro.', '2024-08-22', '08:00:00', '2024-08-22', '09:30:00', 'Pendiente', 'Alta'),
('Practicar fotografía', 'Pasar tiempo practicando técnicas de fotografía al aire libre.', '2024-08-22', '16:00:00', '2024-08-22', '17:30:00', 'Pendiente', 'Media');