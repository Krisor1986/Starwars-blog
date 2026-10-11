# Star Wars Blog

[English](README.md) | [Español](README.es.md)

A frontend exercise for 4Geeks Academy, built with React, Bootstrap 5, React Router and Context API with useReducer. No backend or API key is required.

## Features

- Lists the first 10 characters, planets and vehicles from SWAPI.tech.
- Cards with images, basic information and a link to each resource's details.
- Details with related resource names instead of API links.
- Global favorites: add or remove items from cards, details and the navbar.
- Responsive dark interface with a light navbar and English text.
- Loading and error messages, plus a fallback for unavailable images.

Favorites are kept in memory and reset when the page is reloaded. Search and persistent favorites are outside this exercise's scope.

## Run locally

Use Node.js 20 or newer.

```sh
npm install
npm run start
```

Open the local address printed by Vite (normally http://localhost:3000). No .env file is needed.

```sh
npm run lint
npm run build
npm run preview
```

The build is generated in `dist`. Production hosting must serve `index.html` for frontend routes such as `/details/people/1`.

## Data and images

- Data: [SWAPI.tech](https://www.swapi.tech/), using its people, planets and vehicles endpoints.
- Images: [breatheco-de/swapi-images](https://github.com/breatheco-de/swapi-images), loaded directly from `public/images/people`, `planets` and `vehicles`. This repository collects images from Wookieepedia; it is separate from the template and was selected as an external image source.
- Image URLs are assembled in `src/utils/getEntityImage.js` using the category and SWAPI resource ID. Akabab is not used.

External APIs and image hosts require internet access and may be temporarily unavailable. A successful build or lint check does not verify their live availability.

## Credits

Based on the 4Geeks Academy React advanced template. Exercise: [Star Wars Blog Reading List](https://github.com/breatheco-de/exercise-starwars-blog-reading-list).
