import { createContext, useEffect, useState } from "react";
import products from "../data/products.js";

const CartContext = createContext(null);
const STORAGE_KEY = "morrow-and-moss-cart";

function readSavedCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);
    if (!Array.isArray(parsedCart)) {
      console.warn("Saved cart data was not an array. Starting with an empty cart.");
      return [];
    }

    return parsedCart.reduce((validItems, item) => {
      const product = products.find((entry) => entry.id === item.id);
      const quantity = Number(item.quantity);

      if (product && Number.isInteger(quantity) && quantity > 0) {
        validItems.push({
          ...product,
          quantity: Math.min(quantity, product.stock),
        });
      }

      return validItems;
    }, []);
  } catch (error) {
    console.warn("Saved cart data could not be read. Starting with an empty cart.", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readSavedCart);

  useEffect(() => {
    try {
      const savedCart = cart.map(({ id, quantity }) => ({ id, quantity }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCart));
    } catch (error) {
      console.error("The cart could not be saved to localStorage.", error);
    }
  }, [cart]);

  function addToCart(product, quantity = 1) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) => {
          if (item.id !== product.id) return item;

          return {
            ...item,
            quantity: Math.min(item.quantity + quantity, product.stock),
          };
        });
      }

      return [
        ...currentCart,
        { ...product, quantity: Math.min(quantity, product.stock) },
      ];
    });
  }

  function updateQuantity(productId, nextQuantity) {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id !== productId) return item;

        return {
          ...item,
          quantity: Math.max(1, Math.min(nextQuantity, item.stock)),
        };
      }),
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
