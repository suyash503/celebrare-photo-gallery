# Photo Gallery

A small React app that loads 30 photos from the [Picsum Photos API](https://picsum.photos), shows them in a responsive grid, filters them by author as you type, and lets you mark favourites that are saved in localStorage.

Built with React, Vite and Tailwind CSS. No other UI libraries.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Project structure

```
src/
  main.jsx                 entry point
  App.jsx                  page layout and title
  components/
    Gallery.jsx            search state, filtering, loading / error / grid
    SearchBar.jsx          search input (wrapped in memo)
    PhotoCard.jsx          photo, author name and heart button
  hooks/
    useFetchPhotos.js      fetches the photos, returns { photos, loading, error }
    useFavourites.js       favourites reducer + localStorage
```

## How the requirements are covered

| Requirement | Where |
|---|---|
| React + Vite + Tailwind | `vite.config.js`, `src/index.css` |
| Fetch 30 photos, spinner, error message | `useFetchPhotos.js`, `Gallery.jsx` |
| Grid: 1 column mobile, 2 tablet, 4 desktop | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` in `Gallery.jsx` |
| Real-time search by author, no API call | `filteredPhotos` in `Gallery.jsx` |
| Favourites with useReducer + localStorage | `useFavourites.js` |
| Custom hook `useFetchPhotos` | `useFetchPhotos.js`, used by `Gallery.jsx` |
| useCallback + useMemo | `handleSearch` and `filteredPhotos` in `Gallery.jsx` |

## Notes

- The API's `download_url` points to the original image (up to 5000px wide, roughly 300 to 500 KB each). The cards load a 600x400 copy from `https://picsum.photos/id/{id}/600/400` instead, which is about 27 KB.
- Saved favourites are read in `useReducer`'s initializer, not in a `useEffect`, so the first render already has them and the save effect never overwrites them with an empty list.
- In development React's StrictMode runs effects twice, so the first fetch is cancelled with an `AbortController` and only one response is used.
