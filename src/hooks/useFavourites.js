import { useEffect, useReducer } from 'react'

const STORAGE_KEY = 'favourites'

// state is an array of favourite photo ids, e.g. ['0', '12']
function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE':
      if (state.includes(action.id)) {
        return state.filter((id) => id !== action.id)
      }
      return [...state, action.id]
    default:
      return state
  }
}

// runs once, when the reducer is created, so the first render already has the saved favourites
function loadFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    // stored value isn't valid JSON, start fresh
    return []
  }
}

function useFavourites() {
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  }, [favourites])

  function toggleFavourite(id) {
    dispatch({ type: 'TOGGLE_FAVOURITE', id })
  }

  return { favourites, toggleFavourite }
}

export default useFavourites
