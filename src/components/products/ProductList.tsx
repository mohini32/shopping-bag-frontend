import { ProductCard } from './productcard';

// Define Product type
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface ProductListProps {
  products: Product[];
  loading: boolean;
}

export const ProductList = ({ products, loading }: ProductListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Loading skeletons */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};