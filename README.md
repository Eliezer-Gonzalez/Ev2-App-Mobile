# Proyecto: Ev2 - Desarrollo Móvil

Esta es la segunda entrega del proyecto de Desarrollo Móvil (continuación de la EV1). La aplicación es una lista simple de tareas construida con Expo y React-Native pensada para practicar rutas con `expo-router`, manejo de estado local, cámara y permisos, y persistencia básica en `AsyncStorage`.

**Autores:** Eliezer Gonzalez, Grecia Vidal

---

## Resumen rápido
- **Stack:** Expo, React Native, TypeScript
- **Carpeta principal:** `app/` (rutas + pantallas)
- **Componentes UI:** `components/` y `components/ui/`
- **Persistencia local:** `uitls/storage.ts` (AsyncStorage)

---

## Estructura y archivos importantes

- `app/` — Rutas de la app usando `expo-router`:
	- `app/(tabs)/index.tsx`: pantalla principal con la lista de tareas. Aquí se cargan los todos desde almacenamiento y se persisten los cambios (crear, eliminar, marcar).
	- `app/login.tsx`: pantalla de login (ahora envuelta con `BlurView` para mejorar apariencia).
	- `app/(tabs)/profile.tsx`: pantalla de perfil con ejemplo de uso del `Button`.

- `components/` — Componentes reutilizables:
	- `task-item.tsx`: renderiza cada tarea; soporta título, imagen, coordenadas y eliminación. Al marcar como completada el título se tacha y la imagen se atenúa.
	- `context/auth-context.tsx`: contexto para login/logout (sesión guardada en AsyncStorage).

- `components/ui/` — Componentes de UI y formularios:
	- `new-task.tsx`: formulario para crear tareas. Maneja cámara (`expo-image-picker`), obtiene coordenadas opcionales (`expo-location`) sólo cuando hay foto, muestra coordenadas bajo la imagen y evita re-render loops.
	- `button.tsx`: botón reutilizable que acepta `style` (para el contenedor) y `textStyle` (para personalizar el texto, p. ej. `fontSize`).
	- `title.tsx`, `icon-symbol.*`, `collapsible.tsx`, etc.

- `uitls/storage.ts` — Lectura/escritura de `todos` y `session` usando `@react-native-async-storage/async-storage`.

---

## Últimas implementaciones relevantes

- Fotos y coordenadas:
	- Si el usuario sólo escribe un título y no toma foto, la app no solicita coordenadas.

- UX del formulario (`NewTask`):
	- Los botones de acción (Agregar / Cancelar) están posicionados en el pie de la pantalla. Se anclan para permanecer en la misma posición incluso cuando aparece el teclado.

- `task-item` mejorado:
	- Si la tarea tiene imagen, la imagen se atenúa (menor opacidad) y se superpone una capa gris ligera para indicar estado "completado".

- `login` con Blur:
	- `app/login.tsx` ahora usa `BlurView` (expo-blur) para mejorar la estética del formulario sobre el fondo.

- `Button` mejorado:
	- El componente `Button` acepta ahora `textStyle` para poder cambiar el tamaño del texto y otras propiedades de tipografía desde cada uso.

-  `UX remodelado`:
	- Se rediseño completamente toda la interfaz de la APP. (Se espera en un futuro mejorarla más.)

---
## Pruebas y comprobaciones rápidas

- Crear una tarea con foto: toma una foto, acepta permisos de ubicación si se solicitan, guarda la tarea. La tarea guardada debe incluir `photoUri` y `coordinates` (si se pudo obtener).
- Crear una tarea sin foto: escribe el título y guarda; la tarea no debe solicitar permisos de ubicación ni incluir coordenadas.
- Eliminar una tarea: al eliminarla, cerrar sesión y volver a iniciar sesión, asi como cerrar y abrir la app, mantiene la lista actualizada (las tareas eliminadas no reaparecerán).

---

## Utilización de la IA

- Se utilizó para solucionar problemas con el Blur del `LOGIN`.
- Se ulitizó para investigar librerías compatibles con EXPO. EJ: `expo-linear-gradient`.
- Se utilizó para solucionar problema con el `Node_Modules`.
- Se utilizó para completaciones de Código (Revisamos y aprobamos manualmente todos los cambios antes de aplicarlos.)