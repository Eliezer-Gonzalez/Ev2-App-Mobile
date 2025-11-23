# Proyecto: Ev2 - Desarrollo Móvil

Esta es la segunda entrega del proyecto de Desarrollo Móvil (continuación de la EV1). La aplicación es una pequeña lista de tareas desarrollada con Expo y React Native, pensada para practicar navegación con `expo-router`, componentes reutilizables y manejo de medios (cámara). El objetivo principal es un prototipo funcional que permita crear, listar, completar y eliminar tareas, además de adjuntar una foto a cada tarea.

**Autores:** Eliezer Gonzalez, Grecia Vidal

--

**Resumen rápido**
- **Stack:** Expo, React Native, TypeScript
- **Entradas principales:** `app/` (rutas), `components/` (componentes reutilizables), `components/ui/` (UI primitives), `assets/` (imágenes), `constants/`, `utils/`.

--

**Qué hay en este repositorio**

- `app/` — Rutas de la aplicación usando `expo-router`. Aquí están las pantallas principales y la estructura de navegación en pestañas (`(tabs)`):
	- `app/(tabs)/index.tsx`: pantalla principal con la lista de tareas (Todo List). Implementa la lógica local de estados para los `todos`, botones para crear nuevas tareas y la integración con `TaskItem`.
	- `app/login.tsx`, otros archivos de rutas y layouts para navegación (si están presentes en la rama).

- `components/` — Componentes reutilizables:
	- `task-item.tsx`: componente que renderiza cada tarea, maneja el toggle de completado y la eliminación. Recibe props: `task`, `onToggle`, `onRemove`.
	- `external-link.tsx`: helper para abrir enlaces externos.
	- `haptic-tab.tsx`: utilidad para efectos hápticos en la UI.
	- `context/auth-context.tsx`: contexto simple para autenticación (si está implementado).

- `components/ui/` — Componentes de interfaz y formularios:
	- `title.tsx`: componente que renderiza títulos de sección.
	- `icon-symbol.tsx` / `icon-symbol.ios.tsx`: wrapper para iconos que unifica estilos por plataforma.
	- `collapsible.tsx`: componente para secciones colapsables.
	- `new-task.tsx`: formulario para crear una nueva tarea. Incluye manejo de cámara con `expo-image-picker` y campos para título y foto. Contiene validaciones básicas y evita re-render loops.
	- `button.tsx`: botón estilizado (variant `primary`, `outlined`, `danger`).

- `constants/` — Constantes y tipos:
	- `types.ts`: tipo `Task` y otros tipos globales.
	- `theme.ts`: paleta y tokens de diseño.

- `uitls/` — Utilidades (nota: `uitls` contiene un typo intencional en el nombre de la carpeta en este repo):
	- `generate-random-id.ts`: función para generar identificadores únicos para tareas.

- `assets/` — Imágenes y recursos estáticos.

--

**Comportamiento y flujos importantes**

- Lista de tareas (pantalla principal `app/(tabs)/index.tsx`):
	- Mantiene el estado local `todos: Task[]` con algunos ejemplos iniciales.
	- `toggleTodo(id)` cambia la propiedad `completed` de una tarea.
	- `removeTodo(id)` elimina una tarea del arreglo.
	- `addTodo(title)` crea una nueva tarea con `generateRandomId()` y la añade al arreglo.
	- Al crear una nueva tarea se muestra un formulario (`NewTask`) que permite tomar una foto y guardar la tarea.

- Crear/guardar tarea (`components/ui/new-task.tsx`):
	- Usa `expo-image-picker` para solicitar permisos y abrir la cámara (`requestCameraPermissionsAsync` y `launchCameraAsync`).
	- Guarda un `photoUri` en el estado cuando se captura una imagen.
	- Protege contra re-render loops usando banderas de estado (`isCapturingPhoto`, `isSaving`) y asegurándose de ejecutar todas las llamadas a `setState` dentro de funciones de evento, no durante el render.

--

**Notas de mantenimiento y errores arreglados**

- Se corrigió un error de sintaxis en `app/(tabs)/index.tsx` (una llave extra que provocaba pantalla en blanco). 
- Se resolvió un problema de re-render infinito en `components/ui/new-task.tsx` causado por código que ejecutaba `setState` fuera de una función de evento; la lógica de guardado fue movida dentro de `handleSaveTask`.
- Se añadió `expo-module-scripts` como dependencia de desarrollo para poder extender su `tsconfig.base` desde `tsconfig.json`.
