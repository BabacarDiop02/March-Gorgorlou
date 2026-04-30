import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ShoppingBag, 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  MessageCircle, 
  Star,
  ChevronRight,
  Plus,
  Minus,
  MapPin,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import api from "@/services/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement du produit
    setTimeout(() => {
      setProduct({
        id: id,
        name: "Téléviseur Smart LED 4K 55' avec HDR10+",
        description: "Découvrez une immersion totale avec le téléviseur Gorgorlou Smart LED. Profitez d'une résolution 4K exceptionnelle, de couleurs vibrantes et d'une fluidité parfaite pour vos films et jeux. Inclus : Télécommande intelligente et abonnement IPTV offert pendant 3 mois.",
        price: 295000,
        oldPrice: 450000,
        discount: 34,
        image_url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format",
        category: "Tech",
        badge: "GAW GAW",
        stock_remaining: 5,
        rating: 4.8,
        reviews_count: 85
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDF2]">
      <div className="w-10 h-10 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFFDF2] text-[#432818]">
      
      {/* Header Minimaliste */}
      <nav className="p-6 max-w-7xl mx-auto flex items-center justify-between">
         <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-[#F97316] transition-colors">
            <ArrowLeft size={20} />
            <span className="font-bold text-sm uppercase tracking-widest">Retour</span>
         </Link>
         <Link to="/" className="text-2xl font-black uppercase italic tracking-tighter">Gorgorlou</Link>
         <div className="w-20"></div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Section Image */}
          <div className="lg:col-span-7">
             <div className="sticky top-28 space-y-6">
                <div className="aspect-square bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-orange-100 group">
                   <img src={product.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                   {product.discount > 0 && (
                     <div className="absolute top-8 right-8 w-20 h-20 bg-red-600 rounded-full flex flex-col items-center justify-center text-white shadow-xl rotate-12">
                        <span className="text-xs font-bold uppercase">PROMO</span>
                        <span className="text-xl font-black">-{product.discount}%</span>
                     </div>
                   )}
                </div>
                <div className="grid grid-cols-4 gap-4">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="aspect-square bg-white rounded-2xl overflow-hidden border border-orange-50 cursor-pointer hover:border-[#F97316] transition-all">
                        <img src={product.image_url} className="w-full h-full object-cover opacity-50 hover:opacity-100" />
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Section Info & Checkout */}
          <div className="lg:col-span-5 space-y-10">
             <div>
                <div className="flex items-center gap-3 mb-4">
                   <Badge className="bg-[#F97316] text-white border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                      {product.badge}
                   </Badge>
                   <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={14} className="fill-current" />
                      <span className="text-sm font-black text-slate-900">{product.rating}</span>
                      <span className="text-xs text-slate-400 font-bold">({product.reviews_count} avis)</span>
                   </div>
                </div>
                <h1 className="text-4xl font-black leading-tight mb-4 tracking-tighter">{product.name}</h1>
                <p className="text-slate-500 leading-relaxed font-medium">
                   {product.description}
                </p>
             </div>

             <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-50 space-y-8">
                <div className="flex items-end justify-between">
                   <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Prix Promo</p>
                      <h2 className="text-4xl font-black text-[#F97316]">{product.price.toLocaleString()} FCFA</h2>
                      {product.oldPrice && (
                        <p className="text-sm text-slate-300 line-through font-bold">{product.oldPrice.toLocaleString()} FCFA</p>
                      )}
                   </div>
                   {product.stock_remaining <= 5 && (
                     <div className="bg-red-50 px-4 py-2 rounded-xl flex items-center gap-2 text-red-600 animate-pulse">
                        <Clock size={16} />
                        <span className="text-[10px] font-black uppercase">Plus que {product.stock_remaining} en stock !</span>
                     </div>
                   )}
                </div>

                <Separator className="bg-orange-50" />

                <div className="flex items-center gap-6">
                   <div className="flex items-center bg-slate-100 rounded-2xl p-1 h-14">
                      <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white text-slate-500" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></Button>
                      <span className="w-12 text-center font-black text-lg">{quantity}</span>
                      <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white text-slate-500" onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></Button>
                   </div>
                   <Button className="flex-1 h-14 bg-[#F97316] hover:bg-[#ea580c] text-white font-black uppercase text-sm tracking-[0.2em] rounded-2xl shadow-lg shadow-orange-500/20">
                      Ajouter au panier
                   </Button>
                </div>
             </div>

             {/* Sidebar Livraison */}
             <div className="space-y-6">
                <h4 className="font-black uppercase text-xs tracking-widest text-slate-400 flex items-center gap-2">
                   <MapPin size={14} className="text-[#F97316]" /> Options de Livraison
                </h4>
                <div className="grid gap-4">
                   <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-orange-50 group hover:border-[#F97316] transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#F97316]"><Truck size={20} /></div>
                      <div className="flex-1">
                         <p className="text-sm font-black uppercase">Dakar & Banlieue</p>
                         <p className="text-[10px] text-slate-500 font-bold italic">Livraison en 2h (Gaw Gaw)</p>
                      </div>
                      <p className="font-black text-sm">2 000 F</p>
                   </div>
                   <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-orange-50 group hover:border-[#F97316] transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><RotateCcw size={20} /></div>
                      <div className="flex-1">
                         <p className="text-sm font-black uppercase">Retours Gratuits</p>
                         <p className="text-[10px] text-slate-500 font-bold italic">Sous 7 jours après achat</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                   </div>
                </div>
             </div>

             <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-black uppercase text-xs tracking-widest gap-3 transition-all">
                <MessageCircle size={20} /> Commander via WhatsApp
             </Button>

             <div className="pt-6">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                   <ShieldCheck size={16} className="text-green-500" /> Paiement 100% sécurisé à la livraison
                </div>
             </div>
          </div>
        </div>

        {/* Produits Similaires */}
        <section className="mt-32">
           <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Vous aimerez aussi</h2>
              <Button variant="ghost" className="font-bold hover:text-[#F97316]">Voir tout <ChevronRight size={18} /></Button>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all group">
                   <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-50">
                      <img src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <h4 className="text-sm font-bold text-[#432818] mb-2">Produit Similaire #{i}</h4>
                   <p className="text-lg font-black text-[#F97316]">150 000 FCFA</p>
                </div>
              ))}
           </div>
        </section>
      </main>

      {/* Footer minimaliste */}
      <footer className="bg-white py-12 border-t border-orange-50 text-center">
         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">© 2026 GORGORLOU MARKET - PRODUIT AUTHENTIQUE</p>
      </footer>
    </div>
  );
};

export default ProductDetail;
