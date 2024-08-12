# CRUD Component en StencilJS

Este componente es una implementación de un CRUD (Crear, Leer, Actualizar, Eliminar) en StencilJS que interactúa con una API REST. Permite la gestión de una lista de actividades.

## Funcionalidades

- **Crear una nueva actividad:** El formulario en la parte superior permite introducir los datos de una nueva actividad. Al enviar el formulario, se realiza una petición POST a la API.
- **Leer todas las actividades:** El componente realiza una petición GET a la API para obtener la lista de actividades y las muestra en una tabla.
- **Editar una actividad existente:** Al hacer clic en el botón "Editar", los datos de la actividad se cargan en el formulario. Al modificar y enviar el formulario, se realiza una petición PUT para actualizar la actividad.
- **Eliminar una actividad:** Al hacer clic en el botón "Eliminar", se realiza una petición DELETE para borrar la actividad.

## Estructura del Código

### 1. Estado del Componente

```typescript
@State() actividades: any[] = [];
@State() selectedActividad: any = null;
@State() showDetails: boolean = false;
@State() isEditing: boolean = false;
@State() actividad = {
  id_actividad: '',
  nombre_actividad: '',
  descripcion_actividad: '',
  fecha_inicio: '',
  hora_inicio: '',
  fecha_fin: '',
  hora_fin: '',
  estado: 'Pendiente',
  prioridad: 'Media',
};
actividades: Almacena la lista de actividades obtenida de la API.
selectedActividad: Almacena los detalles de la actividad seleccionada para ver o editar.
showDetails: Controla la visibilidad del modal de detalles de la actividad.
isEditing: Indica si se está editando una actividad.
actividad: Almacena los datos de la actividad actualmente en el formulario.
2. Ciclo de Vida del Componente
typescript
Copiar código
componentWillLoad() {
  this.fetchActividades();
}
componentWillLoad(): Método que se ejecuta antes de que el componente se cargue en la página. Llama a fetchActividades para obtener las actividades de la API.
3. Métodos Principales
fetchActividades(): Realiza una petición GET para obtener todas las actividades.
createActividad(): Realiza una petición POST para crear una nueva actividad.
viewActividad(id: string): Realiza una petición GET para obtener los detalles de una actividad.
editActividad(id: string): Realiza una petición GET para obtener los detalles de una actividad para su edición.
updateActividad(): Realiza una petición PUT para actualizar una actividad existente.
deleteActividad(id: string): Realiza una petición DELETE para eliminar una actividad.
handleInputChange(event: Event): Actualiza el estado actividad con los datos introducidos en el formulario.
handleSelectChange(event: Event): Actualiza el estado actividad con los datos seleccionados en los elementos <select>.
handleEditActividad(actividad: any): Carga los datos de una actividad en el formulario para su edición.
resetForm(): Resetea el formulario después de crear o actualizar una actividad.
closeDetails(): Cierra el modal de detalles y resetea el formulario.


4. Renderizado
render() {
  return (
    <div>
      <h1>Lista de Actividades</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        ...
      </form>

      <table>
        ...
      </table>

      {this.showDetails && this.selectedActividad && (
        <div class="details-modal">
          <div class="modal-content">
            <span class="close" onClick={() => this.closeDetails()}>&times;</span>
            <h2>Detalles de la Actividad</h2>
            <p><strong>ID:</strong> {this.selectedActividad.id_actividad}</p>
            <p><strong>Nombre:</strong> {this.selectedActividad.nombre_actividad}</p>
            <p><strong>Descripción:</strong> {this.selectedActividad.descripcion_actividad}</p>
            <p><strong>Hora de Inicio:</strong> {this.selectedActividad.hora_inicio}</p>
            <p><strong>Hora de Fin:</strong> {this.selectedActividad.hora_fin}</p>
            <p><strong>Estado:</strong> {this.selectedActividad.estado}</p>
            <p><strong>Prioridad:</strong> {this.selectedActividad.prioridad}</p>
          </div>
        </div>
      )}
    </div>
  );
}
El método render devuelve el JSX que se renderizará en la interfaz de usuario. Contiene el formulario para crear/editar actividades, la tabla que muestra todas las actividades y un modal para mostrar los detalles de una actividad seleccionada.

5. Interacción con la API
El componente interactúa con una API REST en http://localhost:3000/actividades. Las peticiones se hacen mediante fetch, utilizando los métodos HTTP apropiados (GET, POST, PUT, DELETE).

6. Manejo de Errores
Cada método que interactúa con la API tiene un bloque try-catch para manejar errores y evitar que el componente falle sin control.

Ejecución
Asegúrate de que la API esté corriendo en http://localhost:3000/actividades.
Inicia el servidor de desarrollo de StencilJS.
El componente debería cargar automáticamente las actividades desde la API y permitirte crear, editar, y eliminar actividades desde la interfaz.
Requisitos
API REST corriendo en http://localhost:3000/actividades