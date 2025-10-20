# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) al trabajar con código en este repositorio.

## Descripción del Proyecto

Esta es una aplicación frontend de React 19 + Vite para la prueba técnica de Vicman Technologies. El proyecto utiliza React moderno con JSX (no TypeScript) y está configurado con ESLint para la calidad del código.

## Comandos de Desarrollo

- `npm run dev` - Iniciar servidor de desarrollo con HMR (Hot Module Replacement)
- `npm run build` - Construir bundle de producción en el directorio `dist/`
- `npm run preview` - Previsualizar build de producción localmente
- `npm run lint` - Ejecutar ESLint en todos los archivos

## Arquitectura

**Herramienta de Build**: Vite 7 con el plugin oficial de React usando Babel para Fast Refresh

**Puntos de Entrada**:
- `index.html` - Punto de entrada HTML que carga `/src/main.jsx`
- `src/main.jsx` - Entrada de la aplicación React.
- `src/styles/index.css` - Entrada de estilos de la aplicación React.

**Estilo de Código**:
- La configuración de ESLint extiende las reglas recomendadas para React Hooks y React Refresh
- Regla personalizada: `no-unused-vars` permite constantes en mayúsculas (patrón `^[A-Z_]`)
- Sintaxis ECMAScript 2020 con soporte JSX
- Globales de navegador habilitados

## Convenciones del Proyecto

- Usar extensión `.jsx` para componentes de React
- El proyecto usa JavaScript (no TypeScript)
- React 19 está instalado con las últimas características disponibles
- Todos los componentes de React deben usar componentes de función con hooks
- Cada componente debe estar dentro de un directorio con el mismo nombre del componente, por ejemplo, el componente `Chart.jsx` debe estar en la ruta 
  `src/components/Chart/Chart.jsx`.
- Los estilos que se apliquen exclusivamente a un componente en particular deben estar en un archivo `.css` dentro del mismo directorio del componente y el 
  archivo debe tener el mismo nombre que el del archivo `.jsx` del componente.
- El proyecto usa componentes preconstruidos de la librería [shadcn](https://ui.shadcn.com/).
