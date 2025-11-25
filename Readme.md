🚀 Introducción
Frontend de la aplicación de Workspaces estilo Slack, desarrollado con React. Permite a los usuarios autenticarse, crear y administrar workspaces, canales y mensajes, e interactuar con la API backend mediante llamadas HTTP.

🗂️ Estructura del proyecto
src/
 ├─ Components/     # Componentes reutilizables (botones, inputs, modales)
 ├─ config/         # Configuración global (API base)
 ├─ constant/       # Constantes e iconos
 ├─ Context/        # Context API (auth, workspace, channel)
 ├─ hooks/          # Custom hooks (useAuth, useFetch, etc.)
 ├─ Middleware/     # Validaciones y protección de rutas
 ├─ Screens/        # Vistas principales (Login, Register, Workspaces, Channels)
 ├─ App.jsx         # Componente raíz
 ├─ index.css       # Estilos globales
 ├─ main.jsx        # Punto de entrada

Flujo principal

🔑 Autenticación
Registro, login y verificación de email.
Manejo de JWT en localStorage.

🏢 Workspaces
Listado, creación, edición y eliminación.
Invitación de usuarios por email.

👥 Canales
Listado y creación dentro de cada workspace.
Mensajes
Envío y visualización de mensajes por canal.

📂 Integración con Backend
Todas las llamadas se realizan a través de fetch, utilizando la URL base definida en el archivo .env
El backend está documentado en la colección de Postman API_1.postman_collection.json.
Para acceder a rutas protegidas se requiere incluir el token JWT en el header Authorization: