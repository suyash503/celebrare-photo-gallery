import { memo } from 'react'

function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      placeholder="Search by author..."
      aria-label="Search photos by author"
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 sm:max-w-sm"
    />
  )
}

// memo skips the re-render when value and onChange are the same as last time.
// That only works because Gallery keeps onChange stable with useCallback.
export default memo(SearchBar)
