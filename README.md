# Prueba Técnica – Fullstack (NestJS + Next.js)

## Contexto

Vas a construir una pequeña aplicación de lista de tareas ("Todo List") full-stack,
compuesta por dos proyectos ya inicializados en este repositorio:

- `todo-backend`: API REST en NestJS.
- `todo-frontend`: interfaz en Next.js (Pages Router).

Tienes **75 minutos** para completar la mayor cantidad posible de los requerimientos.
No es necesario que termines todo: valoramos más la calidad de lo que entregues y
tu forma de razonar que la cantidad.

Puedes usar la documentación oficial de NestJS y Next.js libremente.

## Modelo de datos

Trabajarás con una entidad `Todo` con los siguientes campos:

| Campo         | Tipo    | Notas               |
| ------------- | ------- | ------------------- |
| `id`          | number  | autogenerado        |
| `title`       | string  | requerido           |
| `description` | string  | opcional            |
| `completed`   | boolean | por defecto `false` |
| `createdAt`   | Date    | autogenerado        |

## Parte 1 — Backend (`todo-backend`)

Implementa una API REST en NestJS que persista los datos en **SQLite**
(usa TypeORM u otra herramienta que prefieras).

Endpoints requeridos:

- `GET /todos` — listar todas las tareas.
- `GET /todos/:id` — obtener una tarea por id.
- `POST /todos` — crear una tarea nueva.
- `PATCH /todos/:id` — actualizar una tarea (por ejemplo, marcarla como completada).
- `DELETE /todos/:id` — eliminar una tarea.

Requisitos adicionales:

- Valida el body de las peticiones (por ejemplo, `title` no puede estar vacío).
- Devuelve un error apropiado (404) si se intenta obtener, actualizar o eliminar
  una tarea que no existe.
- Habilita CORS para que el frontend pueda consumir la API sin problemas.

## Parte 2 — Frontend (`todo-frontend`)

Sobre el proyecto Next.js con Pages Router, construye una interfaz que consuma
la API anterior y permita:

- Ver el listado completo de tareas.
- Crear una nueva tarea desde un formulario.
- Marcar una tarea como completada / no completada.
- Eliminar una tarea.
- Reflejar los cambios en la interfaz sin necesidad de recargar la página manualmente.

No es necesario un diseño elaborado; prioriza que la funcionalidad esté completa
y el código sea claro.

## Qué se evaluará

- Que el CRUD funcione de extremo a extremo (frontend ↔ backend ↔ SQLite).
- Organización del código (separación de responsabilidades en NestJS:
  controller / service / entidad).
- Manejo de errores y validaciones básicas.
- Manejo del estado en el frontend tras cada acción.
- Capacidad de explicar las decisiones que tomaste durante el ejercicio.
- Autonomía para resolver bloqueos (leer errores, consultar documentación).

## Entrega

Al finalizar el tiempo, asegúrate de que el Pull Request esté abierto contra `main`
y deja ambos proyectos corriendo localmente (`npm run start:dev` en el backend,
`npm run dev` en el frontend). Comenta en voz alta qué quedó pendiente o qué
harías diferente con más tiempo.
