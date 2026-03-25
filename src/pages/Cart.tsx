import { useCart } from "@/hooks/useCart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShoppingCart } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { universDetails } from "@/lib/universData";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, itemCount, addToCart } = useCart();
  const navigate = useNavigate();

  // Suggestions logic
  const allProducts = Object.values(universDetails).flatMap(u => u.featuredProducts);
  const cartIds = new Set(cart.map(item => item.id));
  const suggestions = allProducts
    .filter(p => !cartIds.has(p.id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 font-body">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter mb-4">
                <ShoppingBag size={14} />
                Votre Sélection
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-black tracking-tight text-foreground">
                Mon Panier
              </h1>
            </div>
            {cart.length > 0 && (
              <p className="text-muted-foreground font-medium">
                <span className="text-primary font-bold">{itemCount}</span> article(s) prêts pour la commande
              </p>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-32 bg-white dark:bg-zinc-900 rounded-[3rem] shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 animate-fade-in-up">
              <div className="w-32 h-32 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <ShoppingBag className="text-zinc-300 dark:text-zinc-600" size={56} />
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold animate-bounce shadow-lg">0</div>
              </div>
              <h2 className="font-heading text-3xl font-bold mb-4">Votre panier est encore vide</h2>
              <p className="text-muted-foreground mb-12 max-w-sm mx-auto leading-relaxed">
                Ne repartez pas les mains vides ! Nos univers regorgent de pépites qui n'attendent que vous.
              </p>
              <Button 
                onClick={() => navigate("/")}
                className="rounded-2xl px-12 py-8 text-xl font-black group shadow-2xl shadow-primary/20 hover:scale-105 transition-all"
              >
                Découvrir le marché <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-12 animate-fade-in-up">
              {/* Items List */}
              <div className="lg:col-span-8 space-y-4">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="group flex flex-col sm:flex-row items-center gap-6 p-4 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:border-primary/20 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500"
                  >
                    <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-md">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    
                    <div className="flex-1 w-full pl-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-heading text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all rounded-xl"
                          aria-label="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                        <div className="flex items-center bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-1 border border-zinc-100 dark:border-zinc-700">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-700 rounded-xl transition-all text-muted-foreground hover:text-primary disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-700 rounded-xl transition-all text-muted-foreground hover:text-primary"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-black text-primary tracking-tight">
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => navigate("/")}
                  className="w-full py-6 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all font-bold flex items-center justify-center gap-3 group"
                >
                  <Plus className="group-hover:rotate-90 transition-transform" />
                  Continuer mes achats
                </button>
              </div>

              {/* Summary */}
              <div className="lg:col-span-4">
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-2xl shadow-primary/5 border border-primary/5 sticky top-32">
                  <h2 className="font-heading text-2xl font-black mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800">Récapitulatif</h2>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between items-center text-muted-foreground font-medium">
                      <span>Articles ({itemCount})</span>
                      <span className="text-foreground">{totalPrice.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground font-medium">
                      <span>Livraison</span>
                      <span className="text-green-500 font-bold px-3 py-1 bg-green-50 dark:bg-green-500/10 rounded-full text-xs">GRATUIT</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground font-medium">
                      <span>Frais de service</span>
                      <span className="text-foreground">0 FCFA</span>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl p-6 mb-8 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex justify-between items-end mb-1">
                      <span className="font-bold text-zinc-400 uppercase text-[10px] tracking-widest">Total à payer</span>
                    </div>
                    <p className="text-4xl font-heading font-black text-primary tracking-tighter">
                      {totalPrice.toLocaleString()} <span className="text-sm font-bold uppercase ml-1">FCFA</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-2 font-medium">TVA et taxes incluses dans le prix affiché.</p>
                  </div>

                  <Button 
                    onClick={() => navigate("/checkout")}
                    className="w-full rounded-2xl py-8 text-xl font-black group shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all hover:-translate-y-1"
                  >
                    Valider la commande <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                  
                  <div className="mt-8 flex items-center justify-center gap-6 saturate-0 opacity-40 hover:saturate-100 hover:opacity-100 transition-all duration-700">
                    <img src="/images/logos/Orange_Money.svg" alt="Orange Money" className="h-6 object-contain" />
                    <img src="/images/logos/Wave.png" alt="Wave" className="h-5 object-contain" />
                    <img src="/images/logos/Visa_Inc.svg" alt="Visa" className="h-4 object-contain" />
                    <img src="/images/logos/Mastercard.svg" alt="Mastercard" className="h-6 object-contain" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Suggestions Section */}
          <div className="mt-32 pt-20 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-heading text-3xl font-black tracking-tight">
                Complétez votre <span className="text-primary italic">bonheur</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {suggestions.map((product) => (
                <div key={product.id} className="group bg-white dark:bg-zinc-900 rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-zinc-100 dark:border-zinc-800">
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 shadow-lg group-hover:scale-105 transition-transform duration-700">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-primary font-black text-lg mb-6">{product.price}</p>
                  <Button 
                    variant="outline"
                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                    className="w-full rounded-2xl py-6 border-2 border-primary/10 hover:border-primary hover:bg-primary/5 font-bold group"
                  >
                    <ShoppingCart size={18} className="mr-2 group-hover:scale-125 transition-transform duration-500" />
                    Ajouter au panier
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
