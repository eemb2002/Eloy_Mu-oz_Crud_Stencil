import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'crud-component',
  styleUrl: 'crud-component.css',
  shadow: true,
})
export class CrudComponent {
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

  baseUrl = 'http://localhost:3000/actividades';


  // Método que se ejecuta antes de que el componente se monte, carga las actividades
  componentWillLoad() {
    this.fetchActividades();
  }


  // Función para obtener las actividades desde la API
  async fetchActividades() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error('Error al obtener las actividades');
      }
      const data = await response.json();
      this.actividades = data;
    } catch (error) {
      console.error('Error fetching actividades', error);
    }
  }

  // Función para crear una nueva actividad
  async createActividad() {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.actividad),
      });
      if (!response.ok) {
        throw new Error('Error al crear la actividad');
      }
      this.fetchActividades(); // Refresca la lista después de crear la actividad
      this.resetForm();
    } catch (error) {
      console.error('Error creating actividad', error);
    }
  }

  // Función para ver los detalles de una actividad
  async viewActividad(id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener la actividad');
      }
      const data = await response.json();
      this.selectedActividad = data;
      this.isEditing = false; // Ver detalles
      this.showDetails = true;
    } catch (error) {
      console.error('Error fetching actividad details', error);
    }
  }


  // Función para editar una actividad existente
  async editActividad(id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener la actividad');
      }
      const data = await response.json();
      this.actividad = data;
      this.isEditing = true;
      this.showDetails = true;
    } catch (error) {
      console.error('Error fetching actividad details for edit', error);
    }
  }
  // Función para cerrar el modal de detalles y resetear el formulario
  closeDetails() {
    this.showDetails = false;
    this.selectedActividad = null;
    this.resetForm();
  }

  // Función para actualizar una actividad existente
  async updateActividad() {
    try {
      await fetch(`${this.baseUrl}/${this.actividad.id_actividad}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.actividad),
      });
      this.fetchActividades(); // Refresca la lista después de actualizar la actividad
      this.closeDetails();
    } catch (error) {
      console.error('Error updating actividad', error);
    }
  }

  // Función para eliminar una actividad
  async deleteActividad(id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la actividad');
      }
      this.fetchActividades(); // Refresca la lista después de eliminar la actividad
    } catch (error) {
      console.error('Error deleting actividad', error);
    }
  }


  // Función para manejar los cambios en los inputs del formulario
  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    this.actividad = {
      ...this.actividad,
      [name]: value
    };
  }

    // Función para manejar los cambios en los select del formulario
  handleSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const { name, value } = target;
    this.actividad = {
      ...this.actividad,
      [name]: value
    };
  }

    // Función para manejar la edición de una actividad desde la lista
  handleEditActividad(actividad: any) {
    this.actividad = { ...actividad };
    this.isEditing = true;
  }

    //Función para resetear el formulario a sus valores predeterminados
  resetForm() {
    this.actividad = {
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
  }

  render() {
    return (
      <div>
        <h1>Lista de Actividades</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>ID para Crear y Actualizar</label>
          <input
            type="text"
            name="id_actividad"
            value={this.actividad.id_actividad}
            placeholder="Colocar ID para Crear y Actualizar"
            onInput={(event) => this.handleInputChange(event)}
          />
          <label>Nombre de la Tarea</label>
          <input
            type="text"
            name="nombre_actividad"
            value={this.actividad.nombre_actividad}
            placeholder="Nombre de la actividad"
            onInput={(event) => this.handleInputChange(event)}
          />
          <label>Descripción de la Tarea</label>
          <input
            type="text"
            name="descripcion_actividad"
            value={this.actividad.descripcion_actividad}
            placeholder="Descripción de la actividad"
            onInput={(event) => this.handleInputChange(event)}
          />
          <label>Fecha de Inicio</label>
          <input
            type="date"
            name="fecha_inicio"
            value={this.actividad.fecha_inicio}
            onInput={(event) => this.handleInputChange(event)}
          />
          <p>Hora de Inicio</p>
          <input
            type="time"
            name="hora_inicio"
            value={this.actividad.hora_inicio}
            onInput={(event) => this.handleInputChange(event)}
          />
          <label>Fecha de Fin</label>
          <input
            type="date"
            name="fecha_fin"
            value={this.actividad.fecha_fin}
            onInput={(event) => this.handleInputChange(event)}
          />
          <p>Hora final</p>
          <input
            type="time"
            name="hora_fin"
            value={this.actividad.hora_fin}
            onInput={(event) => this.handleInputChange(event)}
          />
          <select
            name="estado"
            onChange={(event) => this.handleSelectChange(event as Event)}>
            <option value="Pendiente" selected={this.actividad.estado === 'Pendiente'}>
              Pendiente
            </option>
            <option value="En Proceso" selected={this.actividad.estado === 'En Proceso'}>
              En Proceso
            </option>
            <option value="Completada" selected={this.actividad.estado === 'Completada'}>
              Completada
            </option>
          </select>
          <select
            name="prioridad"
            onChange={(event) => this.handleSelectChange(event as Event)}
            >
            <option value="Alta" selected={this.actividad.prioridad === 'Alta'}>
              Alta
            </option>
            <option value="Media" selected={this.actividad.prioridad === 'Media'}>
              Media
            </option>
            <option value="Baja" selected={this.actividad.prioridad === 'Baja'}>
              Baja
            </option>
          </select>
          <div class="button-group">
            <button
              type="button"
              class="create-button"
              onClick={() => this.createActividad()}
            >
              Crear Actividad
            </button>
            {this.actividad.id_actividad && (
              <button
                type="button"
                class="update-button"
                onClick={() => this.updateActividad()}
              >
                Actualizar Actividad
              </button>
            )}
          </div>
        </form>

  
        <table>
          <thead>
            <tr>
            <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha Inicio</th>
              <th>Hora Inicio</th>
              <th>Fecha Fin</th>
              <th>Hora Fin</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.actividades.map((actividad) => (
              <tr>
                <td>{actividad.id_actividad}</td>
                <td>{actividad.nombre_actividad}</td>
                <td>{actividad.descripcion_actividad}</td>
                <td>{actividad.fecha_inicio}</td>
                <td>{actividad.hora_inicio}</td>
                <td>{actividad.fecha_fin}</td>
                <td>{actividad.hora_fin}</td>
                <td>{actividad.estado}</td>
                <td>{actividad.prioridad}</td>
                <td>
                  <button onClick={() => this.viewActividad(actividad.id_actividad)}>
                    Ver
                  </button>
                  <button onClick={() => this.editActividad(actividad.id_actividad)}>
                    Editar
                  </button>
                  <button onClick={() => this.deleteActividad(actividad.id_actividad)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
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
  
}
