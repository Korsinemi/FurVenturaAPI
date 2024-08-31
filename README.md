# FurVentura API

La base de datos de [FurVentura](https://github.com/Korsinemi/FurVenturaSite)

## Changelog

¡Claro! Parece que estás haciendo un gran progreso en tu proyecto. Vamos a crear una nueva versión basada en tus indicaciones:

### v1.3.0 - 2024-09-03

> **General**
- Se han realizado varias mejoras en la estructura y seguridad del código.
- Se ha actualizado la documentación para reflejar los cambios.

> **Autenticación y Seguridad**
- Se ha implementado un sistema de autenticación robusto utilizando JSON Web Tokens (JWT) y bcrypt.
  - Los usuarios ahora pueden registrarse, iniciar sesión y recibir tokens de acceso.
  - Se ha creado un middleware para verificar la autenticidad de las solicitudes.
- Se ha añadido una capa de seguridad adicional para proteger las rutas sensibles.

> **Deprecaciones**
- **Type de Events**: Se ha marcado como deprecado y se eliminará completamente en futuras versiones.
- **GameRoutes y CharacterControllers**: Estos módulos también se han marcado como deprecados. Se está realizando la transición hacia UserRoutes y UserControllers.

> **Corrección de Rutas**
- Se han solucionado problemas de conexión en algunas rutas que no funcionaban correctamente.
- Se ha mejorado la coherencia en la estructura de las rutas.

> **Módulos Nuevos**
- **Logros (Arch)**: Se ha iniciado la creación del módulo de logros. Los usuarios podrán desbloquear logros y recibir recompensas.
- **Inventario (Inventory)**: Se ha creado el esqueleto del módulo de inventario. Los usuarios podrán gestionar sus objetos y recursos.


### v1.1.0 - 2024-08-27

> **General**
- Se eliminó el uso de `body-parser` en favor de `express.json()` para el manejo de datos JSON.
- Se separaron los controladores de las rutas, creando dos módulos distintos: `routes` y `controllers`.
- Se integró Mongoose y se crearon los modelos correspondientes.

> **Nuevas Funcionalidades**
- **Animals Endpoint**: Se agregó un nuevo endpoint para gestionar datos de animales.
  - Funciones de búsqueda, modificación, eliminación y adición de datos.
  - Se está trabajando en la carga de sprites para los animales.
- **Events Endpoint**: Similar al anterior, se creó un endpoint para eventos con las mismas funcionalidades.

> **Mejoras**
- Se refactorizó el código para adaptarlo a la base de datos y mejorar la eficiencia.
- Se está implementando autenticación para evitar cambios no autorizados en los datos.
- Se está organizando el control de roles (Admin, Mod, etc.).
- Se añadieron variables de entorno

### v1.0.1 - 2024-08-23

> **General**
- Se cambió de repositorio debido a problemas de compilación.

> **Novedades**
- **Nuevo**: Implementación de la API para gestionar jugadores.
  - Endpoints para crear, leer, actualizar y eliminar jugadores.
  - Endpoint para buscar jugadores por ID.

> **Mejoras**
- **Mejora**: Manejo de errores mejorado con mensajes de advertencia en la consola.

> **Correcciones**
- **Corrección**: Solucionado el problema de respuesta de la API cuando no se encuentra el jugador.

### v1.0.0 - 2024-08-20

> **Lanzamiento**
- Lanzamiento inicial: Configuración básica de la API.
  - Estructura del proyecto con Express.
  - Endpoints iniciales para pruebas.

Creado con amor por Korsinemi
- Proyecto final ADSO SENA 2024