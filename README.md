# Proyecto: Ev1 - Desarrollo Móvil -  ELIEZER GONZALEZ - SECCIÓN 50

## Objetivo

Este trabajo es una pequeña aplicación móvil de ejemplo creada con Expo y React Native para demostrar:
- Autenticación básica usando un contexto (AuthProvider).
- Navegación basada en archivo con `expo-router` (pantillas de `Stack` y `Tabs`).
- Componentes de UI sencillos y flujo de login/logout.

La idea es entregar una mini-app educativa que muestre el flujo de inicio de sesión, navegación entre pestañas y una pantalla modal.

## Tecnologías usadas

- React Native
- Expo (Expo Router)
- TypeScript / TSX
- React Navigation (usada a través de Expo Router)
- Hooks y Context API de React
- Dependencias de desarrollo: ESLint y configuración básica (según `eslint.config.js`).

## Requisitos previos

- Node.js (>= 14 recommended)
- npm o yarn
- Expo CLI (opcional): `npm install -g expo-cli` o usar `npx expo`
- Un emulador Android/iOS o la app Expo Go para probar en dispositivo físico.

## Funcionalidades principales

- Pantalla de Login (`app/login.tsx`): permite ingresar credenciales y autenticarse contra un conjunto de usuarios en memoria.
- Contexto de autenticación (`components/context/auth-context.tsx`): provee `login`, `logout` y el objeto `user` a la aplicación.
- Navegación basada en archivos (`app/_layout.tsx`, `app/(tabs)/_layout.tsx`): define las entradas principales de la app, ancla inicial a la pantalla de `login` y pantallas de pestañas y modal.
- Pantalla principal / home (`app/(tabs)/index.tsx`): muestra un saludo al usuario autenticado, un contador local, botones para abrir un modal y cerrar sesión.
- Pestaña Explore (`app/(tabs)/explore.tsx`): actualmente muestra una pantalla simple "Under Construction".
- Modal (`app/modal.tsx`): ejemplo de pantalla presentada como modal.

Credenciales de prueba incluidas (usar solo en entorno de desarrollo):

- Usuario: `User1234` / Contraseña: `Pass1234`
- Usuario: `Admin` / Contraseña: `Admin`

## Cambios realizados (resumen técnico)

Los cambios principales implementados en este commit/entrega son:

- Se agregó un proveedor de autenticación: `components/context/auth-context.tsx`.
- Se creó la pantalla de login: `app/login.tsx` y se integró en el layout raíz para que sea la pantalla inicial.
- Se actualizó el layout raíz `app/_layout.tsx` para envolver la app con `AuthProvider` y exponer las pantallas: `login`, `(tabs)` y `modal`.
- Se simplificaron las pantallas de las pestañas (`app/(tabs)/index.tsx`, `app/(tabs)/explore.tsx`) para mostrar interfaces básicas (contador, mensajes, estado "Under Construction").
- Se eliminaron (o simplificaron) componentes de ejemplo avanzados para acortar la plantilla y evitar dependencias complejas: `components/hello-wave.tsx`, `components/parallax-scroll-view.tsx`, `components/themed-text.tsx`, `components/themed-view.tsx`, y hooks relacionados con temas. Estos cambios son visibles en el historial del repositorio.
- `app/modal.tsx` fue simplificado para usar vistas y textos nativos.

Archivos destacados modificados/añadidos:

- `components/context/auth-context.tsx` (nuevo)
- `app/login.tsx` (nuevo)
- `app/_layout.tsx` (modificado)
- `app/(tabs)/index.tsx` (modificado)
- `app/(tabs)/explore.tsx` (modificado)
- `app/modal.tsx` (modificado)


## Notas finales

Se usó COPILOT para poder completar codigo y CHATGPT para solucionar problemas con los estilos de la APP.

