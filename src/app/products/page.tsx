"use client";

import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductList } from '@/components/products/ProductList';
import { ProductPagination } from '@/components/products/ProductPagination';
import { useState, useEffect } from 'react';

// Define Product type
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
    limit: 12
  });
  const [totalProducts, setTotalProducts] = useState(0);
  const fetchProducts = async () => {
    try {
      setLoading(true);

      // Build query parameters
      const queryParams = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        search: filters.search,
        sortBy: 'createdAt',
        sortOrder: 'DESC'
      });

      // Add optional parameters only if they have values
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);

      const response = await fetch(`http://localhost:5001/api/products?${queryParams}`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data.products || []);
      setTotalProducts(data.pagination?.totalProducts || 0);
    } catch (error) {
      console.error('Fetch products error:', error);
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [filters]); // Re-fetch when filters change

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 })); // Reset to page 1
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };
  return (
    <div className="container mx-auto p-4">
      {/* Pass data and handlers to children */}
      <ProductFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        loading={loading}
      />
      
      <ProductList 
        products={products}
        loading={loading}
      />
      
      <ProductPagination 
        currentPage={filters.page}
        totalProducts={totalProducts}
        productsPerPage={filters.limit}
        onPageChange={handlePageChange}
      />
    </div>
  );
};


export default ProductsPage