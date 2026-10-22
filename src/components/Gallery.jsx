import { useCallback, useMemo, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import useFavourites from '../hooks/useFavourites'
import PhotoCard from './PhotoCard'
import SearchBar from './SearchBar'

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const { favourites, toggleFavourite } = useFavourites()
  const [query, setQuery] = useState('')

  // same function on every render, so the memoized SearchBar doesn't re-render for nothing
  const handleSearch = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

  // only re-filter when the photos or the search text change, not on every render
  const filteredPhotos = useMemo(() => {
    const search = query.trim().toLowerCase()
    return photos.filter((photo) => photo.author.toLowerCase().includes(search))
  }, [photos, query])

  let content

  if (loading) {
    content = (
      <div className="flex justify-center py-20">
        <div
          role="status"
          aria-label="Loading photos"
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-rose-500"
        />
      </div>
    )
  } else if (error) {
    content = (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <p className="font-medium">Couldn't load photos.</p>
        <p className="text-sm">{error}. Check your connection and refresh the page.</p>
      </div>
    )
  } else if (filteredPhotos.length === 0) {
    content = <p className="py-20 text-center text-gray-500">No photos found for "{query}".</p>
  } else {
    content = (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFavourite={favourites.includes(photo.id)}
            onToggleFavourite={toggleFavourite}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-6">
      <SearchBar value={query} onChange={handleSearch} />
      {content}
    </div>
  )
}

export default Gallery
