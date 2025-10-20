# Vicman Technologies - Sistema de Gestión de Biblioteca

Sistema frontend desarrollado con React 19 + Vite para la gestión de libros y autores, incluyendo funcionalidades de préstamos. Este proyecto forma parte de la prueba técnica de Vicman Technologies.

## 📑 Tabla de Contenido

- [Descripción](#-descripción)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Comandos Disponibles](#️-comandos-disponibles)
- [Características Principales](#-características-principales)
- [Convenciones de Código](#-convenciones-de-código)
- [Integración con Backend](#-integración-con-backend)
- [Configuración de Producción](#-configuración-de-producción)
- [IA](#-ia)

## 📖 Descripción

Aplicación web SPA (Single Page Application) que permite administrar una biblioteca digital con las siguientes características:

- Gestión completa de libros (CRUD)
- Gestión completa de autores (CRUD)
- Sistema de préstamos de libros
- Autenticación de usuarios
- Integración con Open Library API para portadas de libros
- Scroll infinito para paginación
- Modo claro/oscuro

## 🛠️ Tecnologías Utilizadas

### Core
- **React 18.2.0** - Biblioteca de interfaz de usuario
- **Vite 7.1.7** - Herramienta de compilación y servidor de desarrollo
- **React Router DOM 7.9.4** - Enrutamiento del lado del cliente

### Estilos y UI
- **Tailwind CSS 3.4.17** - Framework de CSS utilitario
- **Flowbite 3.1.2** - Componentes UI basados en Tailwind
- **Flowbite React 0.12.9** - Componentes React de Flowbite
- **Bootstrap Icons 1.13.1** - Iconos

### Estado y Comunicación
- **Axios 1.12.2** - Cliente HTTP
- **react-hooks-global-state 2.1.0** - Gestión de estado global
- **laravel-precognition-react 0.7.2** - Validación en tiempo real

### Herramientas de Desarrollo
- **ESLint 9.36.0** - Linter de código
- **PostCSS 8.5.6** - Procesamiento de CSS
- **Autoprefixer 10.4.21** - Autoprefijos CSS

## 📋 Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- Backend API de Laravel configurado y en ejecución

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd vicman-technologies-technical-test-client
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Editar el archivo `.env` con tus valores:
```env
VITE_API_URL=http://localhost:8000
VITE_API_CSRF_TOKEN_URL=${VITE_API_URL}/sanctum/csrf-cookie
VITE_OPEN_LIBRARY_COVERS_BASE_URL=https://covers.openlibrary.org
VITE_SPA_URL=http://localhost:5173
VITE_SPA_REQUEST_TIMEOUT=600000
VITE_SPA_SESSION=vicman_technologies_technical_test_session
VITE_SPA_NAME="Vicman Technologies"
```

## ⌨️ Comandos Disponibles

```bash
# Iniciar servidor de desarrollo (http://localhost:5173)
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## ✨ Características Principales

### Autenticación
- Sistema de login y registro
- Protección de rutas mediante interceptores de Axios
- Gestión automática de tokens XSRF
- Cierre de sesión

### Gestión de Libros
- Listar libros con scroll infinito
- Crear nuevos libros
- Editar libros existentes
- Eliminar libros
- Registrar préstamos
- Integración con Open Library para portadas
- Información de unidades disponibles

### Gestión de Autores
- Listar autores con scroll infinito
- Crear nuevos autores
- Editar autores existentes
- Eliminar autores
- Visualización de biografías

### Interfaz de Usuario
- Diseño responsive
- Tema claro/oscuro
- Componentes modales para CRUD
- Spinner de carga
- Navegación intuitiva

## 📝 Convenciones de Código

- Usar extensión `.jsx` para componentes de React
- Componentes de función con hooks (no clases)
- Cada componente debe estar en su propio directorio: `src/components/NombreComponente/NombreComponente.jsx`
- Estilos específicos del componente en el mismo directorio
- Componentes preconstruidos de shadcn/Flowbite

## 🔌 Integración con Backend

La aplicación espera un backend Laravel con:
- Laravel Sanctum configurado para autenticación
- Endpoints REST en `/api`:
  - `GET /me` - Validar sesión actual
  - `POST /login` - Iniciar sesión
  - `POST /register` - Registrar usuario
  - `POST /logout` - Cerrar sesión
  - `GET /books` - Listar libros (con paginación)
  - `POST /books` - Crear libro
  - `PUT /books/{id}` - Actualizar libro
  - `DELETE /books/{id}` - Eliminar libro
  - `GET /authors` - Listar autores (con paginación)
  - `POST /authors` - Crear autor
  - `PUT /authors/{id}` - Actualizar autor
  - `DELETE /authors/{id}` - Eliminar autor
  - `POST /loans` - Registrar préstamo

## 🏭 Configuración de Producción

1. Construir la aplicación:
```bash
npm run build
```

2. Los archivos generados estarán en el directorio `dist/`

3. Servir los archivos estáticos con tu servidor web preferido (Nginx, Apache, etc.)

4. Asegurarse de configurar las variables de entorno de producción correctamente

## 🤖 IA

Este proyecto fue desarrollado con la asistencia de **Claude Code**, un asistente de codificación impulsado por inteligencia artificial de Anthropic. Claude Code fue utilizado para:

- Resolver problemas técnicos complejos (como el bucle infinito de redirecciones)
- Proporcionar recomendaciones de arquitectura y mejores prácticas
- Acelerar el desarrollo mediante sugerencias de código
- Mejorar la calidad del código con revisiones automáticas
- Generar documentación clara y completa

El uso de herramientas de IA como asistentes de codificación permite:
- Mayor productividad en el desarrollo
- Reducción de errores comunes
- Aprendizaje continuo de mejores prácticas
- Documentación más consistente y detallada

### Archivo de Contexto para Claude Code

El proyecto incluye un archivo `CLAUDE.md` en la raíz del repositorio que sirve como contextualizador para Claude Code. Este archivo contiene:

- Descripción del proyecto y su arquitectura
- Comandos de desarrollo disponibles
- Convenciones de código y estándares del proyecto
- Estructura de componentes y estilos
- Guías específicas para trabajar con este codebase

Este archivo permite que Claude Code comprenda mejor el contexto del proyecto y proporcione asistencia más precisa y alineada con las convenciones establecidas.

---

**Desarrollado por:** Fahibram Cárcamo
**Proyecto:** Prueba Técnica para la empresa Vicman Technologies
