import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("gorgorlou_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("gorgorlou_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success(`Quantité mise à jour : ${product.name}`, {
          description: "L'article est déjà dans votre panier.",
          icon: <Plus size={16} />,
        });
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      toast.custom((t) => (
        <div className="bg-white dark:bg-zinc-900 border border-primary/20 p-4 rounded-3xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-full duration-500">
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Ajouté au panier</p>
            <p className="font-heading font-bold text-sm line-clamp-1">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.price}</p>
          </div>
          <button 
            onClick={() => toast.dismiss(t)}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
          >
            <X size={16} />
          </button>
        </div>
      ), { duration: 3000, position: "bottom-right" });

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.info("Article retiré du panier");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce((sum, item) => {
    const priceStr = item.price.replace(/[^0-9]/g, "");
    return sum + parseInt(priceStr) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
