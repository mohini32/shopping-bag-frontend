import { useState } from 'react';
import { useCart } from '@/context/CartContext';

// Define Product type
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  // 🔥 ADD TO CART FUNCTION - Now using CartContext!
  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      setMessage('');

      const success = await addToCart(product.id, 1);

      if (success) {
        setMessage('Added to cart!');
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage('Failed to add to cart');
        setTimeout(() => setMessage(''), 3000);
      }

    } catch (error) {
      console.error('Add to cart error:', error);
      setMessage('Failed to add to cart');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={product.imageUrl || '/placeholder-product.jpg'}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-green-600">${product.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-3 py-1 rounded transition-colors ${
              isAdding
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`mt-2 text-sm text-center ${
            message.includes('Failed') ? 'text-red-500' : 'text-green-500'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};