import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { MenuItem, CartItem } from '../types';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (dish: MenuItem, quantity?: number) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  discountCode: string;
  discountAmount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  gstAmount: number;
  deliveryFee: number;
  grandTotal: number;
}

const CART_STORAGE_KEY = 'saffron_stone_cart_v1';
const COUPON_STORAGE_KEY = 'saffron_stone_coupon_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState<string>('');

  // Initialize cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Read stored coupon
  useEffect(() => {
    try {
      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon) {
        setDiscountCode(storedCoupon);
      }
    } catch {
      // ignore
    }
  }, []);

  const addToCart = useCallback((dish: MenuItem, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.dish.id === dish.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, { dish, quantity }];
      }
    });

    showToast('Added to Dining Bag', `${dish.name} (x${quantity}) has been added.`);
  }, [showToast]);

  const removeFromCart = useCallback((dishId: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.dish.id === dishId);
      if (item) {
        showToast('Item Removed', `${item.dish.name} removed from your bag.`, 'info');
      }
      return prev.filter((i) => i.dish.id !== dishId);
    });
  }, [showToast]);

  const updateQuantity = useCallback((dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  }, [cart]);

  // Calculate discount based on active code
  const discountAmount = useMemo(() => {
    if (!discountCode || subtotal === 0) return 0;
    const cleanCode = discountCode.toUpperCase().trim();
    if (cleanCode === 'FAMILY25') {
      return Math.round(subtotal * 0.25);
    }
    if (cleanCode === 'ROMANCE20' || cleanCode === 'FESTIVAL20') {
      return Math.round(subtotal * 0.20);
    }
    if (cleanCode === 'SAFFRON10' || cleanCode === 'WELCOME10') {
      return Math.round(subtotal * 0.10);
    }
    if (cleanCode === 'BIRYANI999' && subtotal >= 999) {
      return 250;
    }
    return 0;
  }, [discountCode, subtotal]);

  const applyCoupon = useCallback((code: string): boolean => {
    const clean = code.toUpperCase().trim();
    const validCodes = ['FAMILY25', 'ROMANCE20', 'FESTIVAL20', 'SAFFRON10', 'WELCOME10', 'BIRYANI999'];
    if (validCodes.includes(clean)) {
      setDiscountCode(clean);
      localStorage.setItem(COUPON_STORAGE_KEY, clean);
      showToast('Promo Code Applied', `Code ${clean} applied to your order!`, 'success');
      return true;
    } else {
      showToast('Invalid Promo Code', 'Please check code spelling or offer terms.', 'error');
      return false;
    }
  }, [showToast]);

  const removeCoupon = useCallback(() => {
    setDiscountCode('');
    localStorage.removeItem(COUPON_STORAGE_KEY);
    showToast('Promo Code Removed', 'Discount removed.', 'info');
  }, [showToast]);

  const gstAmount = useMemo(() => {
    const taxable = Math.max(0, subtotal - discountAmount);
    return Math.round(taxable * 0.05); // 5% GST for restaurant
  }, [subtotal, discountAmount]);

  const deliveryFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 1500 ? 0 : 80;
  }, [subtotal]);

  const grandTotal = useMemo(() => {
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal - discountAmount) + gstAmount + deliveryFee;
  }, [subtotal, discountAmount, gstAmount, deliveryFee]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        discountCode,
        discountAmount,
        applyCoupon,
        removeCoupon,
        gstAmount,
        deliveryFee,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
