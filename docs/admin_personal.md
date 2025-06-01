# Administración del Personal

## Modelo de Personal

El sistema cuenta con un modelo robusto para la gestión del personal administrativo que incluye:

### Campos Principales
- **Nombre y Apellido**: Información básica del empleado
- **Cargo**: Posición en la empresa
- **Descripción**: Biografía o descripción del rol
- **Foto**: Imagen del empleado (se almacena automáticamente en una estructura organizada)

### Campos de Redes Sociales
- LinkedIn
- Twitter
- Facebook
- Instagram

### Campos de Control
- **Orden**: Controla la posición de aparición en la página
- **Activo**: Permite ocultar/mostrar empleados sin eliminarlos
- **Timestamps**: Registro de creación y actualización

## Panel de Administración

Acceso a través de `/admin/properties/personal/`

Características:
- Gestión completa CRUD (Crear, Leer, Actualizar, Eliminar)
- Interfaz intuitiva para subir fotos
- Organización automática de archivos multimedia
- Control de permisos basado en roles

## API REST

Endpoint: `/api/personal/`

Características:
- Listado de personal activo
- Ordenamiento automático por posición y nombre
- Serialización de datos incluyendo URLs de imágenes
- Protección de endpoints de escritura (solo usuarios autenticados)

## Frontend

La información se muestra en la página "Sobre Nosotros" con:
- Diseño responsive en grid
- Carga dinámica de datos
- Visualización de redes sociales
- Optimización de imágenes

## Seguridad

- Validación de datos en backend
- Protección contra inyección SQL
- Manejo seguro de archivos multimedia
- Control de acceso basado en permisos