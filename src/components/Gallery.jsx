import useFetchPhotos from '../hooks/useFetchPhotos'
import PhotoCard from './PhotoCard'

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div
          role="status"
          aria-label="Loading photos"
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-rose-500"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <p className="font-medium">Couldn't load photos.</p>
        <p className="text-sm">{error}. Check your connection and refresh the page.</p>
      </div>
    )
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  )
}

export default Gallery
