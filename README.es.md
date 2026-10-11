# Star Wars Blog

[English](README.md) | [Español](README.es.md)

Ejercicio frontend de 4Geeks Academy, desarrollado con React, Bootstrap 5, React Router y Context API con useReducer. No requiere backend ni clave de API.

## Funcionalidades

- Lista los primeros 10 personajes, planetas y vehículos de SWAPI.tech.
- Tarjetas con imágenes, información básica y un enlace a los detalles de cada recurso.
- Detalles con nombres de recursos relacionados en lugar de enlaces a la API.
- Favoritos globales: añadir o eliminar elementos desde las tarjetas, los detalles y la barra de navegación.
- Interfaz oscura y adaptable, con barra de navegación clara y textos en inglés.
- Mensajes de carga y error, además de una alternativa para imágenes no disponibles.

Los favoritos se mantienen en memoria y se reinician al recargar la página. La búsqueda y los favoritos persistentes quedan fuera del alcance de este ejercicio.

## Ejecutar localmente

Utiliza Node.js 20 o superior.

```sh
npm install
npm run start
```

Abre la dirección local indicada por Vite (normalmente http://localhost:3000). No se necesita un archivo .env.

```sh
npm run lint
npm run build
npm run preview
```

La compilación se genera en `dist`. El alojamiento de producción debe servir `index.html` para rutas frontend como `/details/people/1`.

## Datos e imágenes

- Datos: [SWAPI.tech](https://www.swapi.tech/), mediante sus endpoints de personajes, planetas y vehículos.
- Imágenes: [breatheco-de/swapi-images](https://github.com/breatheco-de/swapi-images), cargadas directamente desde `public/images/people`, `planets` y `vehicles`. Este repositorio recopila imágenes de Wookieepedia; es independiente de la plantilla y se eligió como fuente externa de imágenes.
- Las URL de imágenes se construyen en `src/utils/getEntityImage.js` usando la categoría y el ID del recurso de SWAPI. No se utiliza Akabab.

Las API y los servidores de imágenes externos requieren conexión a internet y pueden no estar disponibles temporalmente. Una compilación o revisión de lint correcta no verifica su disponibilidad real.

## Créditos

Basado en la plantilla avanzada de React de 4Geeks Academy. Ejercicio: [Star Wars Blog Reading List](https://github.com/breatheco-de/exercise-starwars-blog-reading-list).
