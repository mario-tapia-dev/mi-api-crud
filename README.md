# API RESTful para Gestión de Tareas

Este es un proyecto de portafolio que implementa una API RESTful completa para gestionar una lista de tareas (CRUD).

## Tech Stack

* **Backend:** Node.js, Express, TypeScript
* **Base de Datos:** PostgreSQL
* **ORM:** Prisma
* **Documentación:** Postman

---

## Estado del Proyecto

**Archivado.** La API que estaba desplegada en Render ha sido desactivada para liberar recursos de la capa gratuita para nuevos proyectos. El código de este repositorio permanece público por si a alguien le sirve para checar algún error y para documentar mi progreso en el desarrollo BackEnd.

### Cómo ejecutarlo localmente

Si deseas probar esta API, puedes clonar el repositorio y ejecutarlo en tu propia máquina siguiendo estos pasos:

1.  Clona el repositorio: `git clone https://github.com/your-repo`
2.  Instala las dependencias: `npm install`
3.  Crea un archivo `.env` y añade la URL de conexión a tu propia base de datos PostgreSQL.
4.  Aplica las migraciones: `npx prisma migrate dev`
5.  Inicia el servidor: `npm run dev`