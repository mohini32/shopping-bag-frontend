import { useState, useEffect } from "react";

interface ProductFiltersProps {
  filters: {
    search: string;
    minPrice: string;
    maxPrice: string;
  };
  onFilterChange: (filters: Partial<ProductFiltersProps['filters']>) => void;
  loading: boolean;
}

export const ProductFilters = ({ filters, onFilterChange, loading }: ProductFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Sync local state with parent state
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(localFilters); // Tell parent about filter changes
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={localFilters.search}
          onChange={(e) => setLocalFilters(prev => ({ ...prev, search: e.target.value }))}
          className="border rounded px-3 py-2 text-black"
          disabled={loading}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={localFilters.minPrice}
          onChange={(e) => setLocalFilters(prev => ({ ...prev, minPrice: e.target.value }))}
          className="border rounded px-3 py-2 text-black"
          disabled={loading}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={localFilters.maxPrice}
          onChange={(e) => setLocalFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
          className="border rounded px-3 py-2"
          disabled={loading}
        />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Apply Filters'}
      </button>
    </form>
  );
};