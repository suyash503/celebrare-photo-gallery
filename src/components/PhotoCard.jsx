function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  // download_url is the full size image (up to 5000px wide), so ask picsum for a smaller copy
  const imageUrl = `https://picsum.photos/id/${photo.id}/600/400`

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <img
        src={imageUrl}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="aspect-[3/2] w-full object-cover"
      />
      <div className="flex items-center justify-between p-3">
        <p className="truncate font-medium text-gray-800">{photo.author}</p>
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFavourite}
          className={`rounded-full p-1 hover:bg-gray-100 ${isFavourite ? 'text-rose-500' : 'text-gray-400'}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s-7.5-4.6-9.5-9.3C1.2 8.4 3.3 5 6.8 5c2 0 3.6 1.1 4.4 2.6h1.6C13.6 6.1 15.2 5 17.2 5c3.5 0 5.6 3.4 4.3 6.7C19.5 16.4 12 21 12 21z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PhotoCard
