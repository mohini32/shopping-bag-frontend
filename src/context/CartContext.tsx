"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Types
interface CartItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  stock: number;
}

interface CartContextType {
  // State
  cartItems: CartItem[];
  cartCount: number;
  loading: boolean;
  
  // Actions
  addToCart: (productId: number, quantity?: number) => Promise<boolean>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<boolean>;
  removeFromCart: (cartItemId: number) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  refreshCart: () => Promise<void>;
  
  // Computed values
  subtotal: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Computed values
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Load cart when user logs in
  useEffect(() => {
    if (user) {
      refreshCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  // 🔥 REFRESH CART - Get latest cart from server
  const refreshCart = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/cart', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Cart API response:', data); // Debug log

        // Map backend response to frontend format
        const mappedItems = (data.cart?.items || []).map((item: any) => ({
          id: item.id,
          product_id: item.product_id,
          name: item.product_name,
          price: parseFloat(item.product_price),
          quantity: item.quantity,
          imageUrl: item.product_image,
          stock: item.stock_available
        }));

        setCartItems(mappedItems);
      } else {
        console.log('Cart API failed:', response.status);
        setCartItems([]);
      }
    } catch (error) {
      console.error('Refresh cart error:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 ADD TO CART
  const addToCart = async (productId: number, quantity: number = 1): Promise<boolean> => {
    if (!user) {
      alert('Please login to add items to cart');
      return false;
    }

    try {
      console.log('Adding to cart:', { productId, quantity }); // Debug log

      const response = await fetch('http://localhost:5001/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity
        })
      });

      console.log('Add to cart response status:', response.status); // Debug log

      if (response.ok) {
        const result = await response.json();
        console.log('Add to cart success:', result); // Debug log
        await refreshCart(); // Refresh cart to get updated data
        return true;
      } else {
        const error = await response.json();
        console.error('Add to cart failed:', error);
        return false;
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      return false;
    }
  };

  // 🔥 UPDATE QUANTITY
  const updateQuantity = async (cartItemId: number, quantity: number): Promise<boolean> => {
    if (quantity < 1) {
      return removeFromCart(cartItemId);
    }

    try {
      const response = await fetch(`http://localhost:5001/api/cart/update/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ quantity })
      });

      if (response.ok) {
        // Optimistic update
        setCartItems(prev => prev.map(item => 
          item.id === cartItemId ? { ...item, quantity } : item
        ));
        return true;
      } else {
        await refreshCart(); // Refresh on error
        return false;
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      await refreshCart();
      return false;
    }
  };

  // 🔥 REMOVE FROM CART
  const removeFromCart = async (cartItemId: number): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:5001/api/cart/remove/${cartItemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Optimistic update
        setCartItems(prev => prev.filter(item => item.id !== cartItemId));
        return true;
      } else {
        await refreshCart(); // Refresh on error
        return false;
      }
    } catch (error) {
      console.error('Remove from cart error:', error);
      await refreshCart();
      return false;
    }
  };

  // 🔥 CLEAR CART
  const clearCart = async (): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5001/api/cart/clear', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setCartItems([]);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      return false;
    }
  };

  const value: CartContextType = {
    // State
    cartItems,
    cartCount,
    loading,
    
    // Actions
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
    
    // Computed values
    subtotal,
    total
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
