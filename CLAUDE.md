# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 + Vite frontend application for Vicman Technologies technical test. The project uses modern React with JSX (not TypeScript) and is configured with ESLint for code quality.

## Development Commands

- `npm run dev` - Start development server with HMR (Hot Module Replacement)
- `npm run build` - Build production bundle to `dist/` directory
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint on all files

## Architecture

**Build Tool**: Vite 7 with the official React plugin using Babel for Fast Refresh

**Entry Points**:
- `index.html` - HTML entry point that loads `/src/main.jsx`
- `src/main.jsx` - React application entry that renders `App` component into `#root` div with StrictMode enabled
- `src/App.jsx` - Main application component

**Code Style**:
- ESLint configuration extends recommended rules for React Hooks and React Refresh
- Custom rule: `no-unused-vars` allows uppercase constants (pattern `^[A-Z_]`)
- ECMAScript 2020 syntax with JSX support
- Browser globals enabled

## Project Conventions

- Use `.jsx` extension for React components
- The project uses JavaScript (not TypeScript)
- React 19 is installed with the latest features available
- All React components should use function components with hooks
