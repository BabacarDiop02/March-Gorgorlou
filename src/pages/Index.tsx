import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Zap, 
  Smartphone, 
  Home as HomeIcon, 
  Heart, 
  Star, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  MessageCircle,
  Menu,
  Search,
  User,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";

const Index = () => {
  const [flashProducts, setFlashProducts] = useState<any[]>([]);
  const [bestOffers, setBestOffers] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 0 });

  useEffect(() => {
    // Simuler le chargement des produits
    fetchHomeData();
    
    // Décompte Ventes Flash
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchHomeData = async () => {
    try {
      // Pour l'instant, on simule avec des données statiques si l'API n'est pas prête
      // Mais on garde la structure pour le futur
      setFlashProducts([
        { id: 1, name: "Téléviseur Smart LED 55'", price: 295000, oldPrice: 450000, discount: 34, img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format", badge: "OFFICIEL", stock: 5 },
        { id: 2, name: "T-shirt Premium Coton", price: 7500, oldPrice: 12000, discount: 38, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format", badge: "HOT", stock: 12 },
        { id: 3, name: "Sac à dos Urban Black", price: 15000, oldPrice: 22000, discount: 32, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format", badge: "TOP", stock: 3 },
      ]);

      setBestOffers([
        { id: 4, name: "Friteuse Air Fryer 8L", price: 45000, discount: 36, img: "https://images.unsplash.com/photo-1585121234028-06b8c8d45369?w=500&auto=format", badge: "PROMO" },
        { id: 5, name: "Bouilloire Électrique Inox", price: 8500, discount: 29, img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&auto=format", badge: "BEST" },
        { id: 6, name: "Aspirateur Sans Fil 3-en-1", price: 89000, discount: 34, img: "https://images.unsplash.com/photo-1558317374-067df5f15430?w=500&auto=format", badge: "HOT" },
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF2] text-[#432818] font-sans selection:bg-[#F97316] selection:text-white">
      
      {/* Header Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#F97316] rounded-xl flex items-center justify-center text-white shadow-lg">
                <ShoppingBag size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase italic">Gorgorlou</span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-6 text-sm font-bold uppercase tracking-widest text-[#432818]/60">
              <a href="#" className="hover:text-[#F97316] transition-colors">Teranga</a>
              <a href="#" className="hover:text-[#F97316] transition-colors">Boutiques</a>
              <a href="#" className="hover:text-[#F97316] transition-colors">Aide</a>
            </nav>
          </div>

          <div className="flex-1 max-w-md mx-10 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Chercher un produit, une marque..." 
                className="w-full h-11 bg-slate-100 rounded-full pl-10 pr-4 outline-none border-2 border-transparent focus:border-[#F97316] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full"><User size={20} /></Button>
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F97316] text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
            </Button>
            <Button className="bg-[#F97316] hover:bg-[#ea580c] rounded-full px-6 font-bold uppercase text-xs tracking-widest">Woor</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        
        {/* Hero Section */}
        <section className="px-6 py-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 relative rounded-[2rem] overflow-hidden group h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Banner"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-12 text-white">
                <Badge className="w-fit mb-4 bg-[#F97316] border-none text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1">Exclusivité Dakar</Badge>
                <h1 className="text-6xl font-black leading-none mb-6 max-w-md">Vivez la Teranga Digitale</h1>
                <p className="text-lg opacity-80 mb-8 max-w-sm">Les meilleures offres de la semaine livrées "Gaw Gaw" chez vous.</p>
                <Button className="w-fit bg-white text-[#F97316] hover:bg-[#F97316] hover:text-white rounded-full px-8 h-14 font-black uppercase text-sm tracking-widest transition-all">Diayma</Button>
              </div>
            </div>
            
            <div className="lg:col-span-4 grid grid-rows-2 gap-6">
              <div className="bg-orange-500 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                   <h3 className="text-3xl font-black leading-tight mb-2 uppercase">Tech & <br/>Gadgets</h3>
                   <Button variant="ghost" className="p-0 h-auto text-white hover:bg-transparent font-bold underline flex items-center gap-2">Découvrir <ArrowRight size={16} /></Button>
                </div>
                <Smartphone size={120} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" />
              </div>
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                   <h3 className="text-3xl font-black leading-tight mb-2 uppercase">Maison & <br/>Confort</h3>
                   <Button variant="ghost" className="p-0 h-auto text-white hover:bg-transparent font-bold underline flex items-center gap-2">Découvrir <ArrowRight size={16} /></Button>
                </div>
                <HomeIcon size={120} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </section>

        {/* Ventes Flash - Style Jumia Rouge */}
        <section className="px-6 py-6 max-w-7xl mx-auto">
          <div className="bg-[#E31B23] rounded-2xl overflow-hidden shadow-xl shadow-red-600/20">
            <div className="px-8 py-4 flex items-center justify-between text-white border-b border-white/10">
               <div className="flex items-center gap-4">
                  <Zap size={24} className="fill-white" />
                  <h2 className="text-xl font-black uppercase tracking-tight">Ventes Flash — Maintenant</h2>
                  <div className="hidden md:flex items-center gap-2 ml-6 bg-black/20 px-4 py-1.5 rounded-full text-sm font-bold">
                     <Clock size={16} />
                     Termine dans : <span className="font-mono text-white">{String(timeLeft.h).padStart(2, '0')}h : {String(timeLeft.m).padStart(2, '0')}m : {String(timeLeft.s).padStart(2, '0')}s</span>
                  </div>
               </div>
               <Link to="#" className="text-sm font-bold flex items-center gap-2 hover:underline">Voir plus <ArrowRight size={14} /></Link>
            </div>
            
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 bg-white">
              {flashProducts.map(p => (
                <div key={p.id} className="group cursor-pointer">
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-slate-50 border border-slate-100">
                    <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <Badge className="absolute top-2 left-2 bg-[#F97316] text-white border-none text-[8px] font-black">{p.badge}</Badge>
                    <Badge className="absolute top-2 right-2 bg-yellow-400 text-black border-none text-[8px] font-black">-{p.discount}%</Badge>
                  </div>
                  <h4 className="text-xs font-bold text-slate-700 line-clamp-2 mb-1 h-8">{p.name}</h4>
                  <p className="text-sm font-black text-[#F97316]">{p.price.toLocaleString()} FCFA</p>
                  <p className="text-[10px] text-slate-400 line-through mb-2">{p.oldPrice.toLocaleString()} FCFA</p>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-red-500 rounded-full" style={{width: `${(p.stock / 20) * 100}%`}}></div>
                  </div>
                  <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">Stock restant : {p.stock}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid Univers */}
        <section className="px-6 py-10 max-w-7xl mx-auto">
          <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">Explorez nos Univers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]">
            <div className="md:col-span-2 md:row-span-2 bg-[#F97316] rounded-3xl p-10 text-white relative overflow-hidden group">
               <div className="relative z-10">
                  <h3 className="text-5xl font-black uppercase mb-4 leading-none">Maison & <br/>Design</h3>
                  <p className="max-w-xs opacity-80 mb-6 font-medium">Tout pour transformer votre intérieur en havre de Teranga.</p>
                  <Button className="bg-white text-[#F97316] rounded-full font-bold">Explorer</Button>
               </div>
               <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="bg-[#432818] rounded-3xl p-8 text-white relative overflow-hidden group">
               <h3 className="text-2xl font-black uppercase relative z-10">Tech Elite</h3>
               <img src="https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500&auto=format" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="bg-yellow-400 rounded-3xl p-8 text-[#432818] relative overflow-hidden group">
               <h3 className="text-2xl font-black uppercase relative z-10">Mode Afro</h3>
               <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="md:col-span-2 bg-white border-2 border-orange-100 rounded-3xl p-8 flex items-center justify-between group overflow-hidden">
               <div className="max-w-xs">
                  <h3 className="text-2xl font-black uppercase mb-2">Beauté Gorgorlou</h3>
                  <p className="text-sm text-slate-500 font-medium">Soins naturels et cosmétiques de prestige.</p>
               </div>
               <div className="w-32 h-32 bg-orange-50 rounded-2xl rotate-12 group-hover:rotate-0 transition-transform"></div>
            </div>
          </div>
        </section>

        {/* Meilleures Offres */}
        <section className="px-6 py-10 max-w-7xl mx-auto">
          <div className="bg-orange-500 rounded-2xl p-4 flex items-center justify-between text-white mb-6">
             <h2 className="text-2xl font-black uppercase italic tracking-tighter">Gorgorlou Kheweul - Meilleures offres</h2>
             <Button variant="ghost" className="text-white hover:bg-white/10 font-bold flex items-center gap-2">Voir plus <ChevronRight size={18} /></Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {bestOffers.map(p => (
              <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all group scale-up-center">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-slate-50">
                  <img src={p.img} className="w-full h-full object-cover" />
                  <Badge className="absolute top-2 left-2 bg-[#F97316] border-none text-[8px] font-black">{p.badge}</Badge>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <Button className="bg-[#F97316] rounded-full p-3 h-12 w-12"><ShoppingBag size={20} /></Button>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-[#432818] line-clamp-1 mb-1">{p.name}</h4>
                <p className="text-lg font-black text-[#F97316]">{p.price.toLocaleString()} FCFA</p>
                <div className="flex items-center gap-2 mt-2">
                   <Star size={12} className="fill-yellow-400 text-yellow-400" />
                   <span className="text-[10px] font-bold text-slate-400">4.9 (120 avis)</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sécurité & Chantier - Style Industriel */}
        <section className="px-6 py-16 bg-[#0f172a] my-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FACC15]/5 -skew-x-12 translate-x-1/2"></div>
           <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                 <div>
                    <Badge className="bg-[#FACC15] text-black font-black uppercase px-4 py-1 mb-4">Gamme Pro B2B/B2C</Badge>
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Sécurité & <br/><span className="text-[#FACC15]">Chantier</span></h2>
                 </div>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest border-r border-white/10 pr-6">
                       <ShieldCheck className="text-[#FACC15]" size={20} /> Normes ISO/CE
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                       <Truck className="text-[#FACC15]" size={20} /> Livraison Grue
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { title: "Casque Haute Résistance", price: 12500, img: "https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=500&auto=format" },
                   { title: "Bottes de Sécurité S3", price: 35000, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format" },
                   { title: "Gilet de Signalisation", price: 4500, img: "https://images.unsplash.com/photo-1595111101533-43f06111816c?w=500&auto=format" }
                 ].map((item, i) => (
                   <div key={i} className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:border-[#FACC15]/50">
                      <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-black">
                         <img src={item.img} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2 uppercase">{item.title}</h4>
                      <p className="text-[#FACC15] text-2xl font-black">{item.price.toLocaleString()} FCFA</p>
                      <Button className="w-full mt-6 bg-[#FACC15] hover:bg-yellow-500 text-black font-black uppercase text-xs tracking-widest">Devis Rapide</Button>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Footer Skyline Dakar */}
        <footer className="pt-20 bg-[#FFFDF2] border-t border-orange-100 overflow-hidden relative">
           <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 relative z-10 pb-20">
              <div className="col-span-1 md:col-span-2">
                 <Link to="/" className="flex items-center gap-2 mb-8">
                    <div className="w-10 h-10 bg-[#F97316] rounded-xl flex items-center justify-center text-white shadow-lg">
                      <ShoppingBag size={24} />
                    </div>
                    <span className="text-2xl font-black tracking-tighter uppercase italic">Gorgorlou</span>
                 </Link>
                 <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
                    La destination n°1 au Sénégal pour tous vos achats. Qualité, Rapidité et Confiance (Woor) sont au cœur de notre Teranga.
                 </p>
                 <div className="flex gap-4">
                    <Button variant="outline" size="icon" className="rounded-full border-orange-200 text-[#F97316]"><MessageCircle size={20} /></Button>
                    <Button variant="outline" size="icon" className="rounded-full border-orange-200 text-[#F97316]"><Star size={20} /></Button>
                 </div>
              </div>
              <div>
                 <h4 className="font-black uppercase tracking-widest text-xs mb-8">Navigation</h4>
                 <ul className="space-y-4 text-sm text-slate-500 font-medium">
                    <li><a href="#" className="hover:text-[#F97316] transition-colors">Ventes Flash</a></li>
                    <li><a href="#" className="hover:text-[#F97316] transition-colors">Nouveautés</a></li>
                    <li><a href="#" className="hover:text-[#F97316] transition-colors">Boutiques</a></li>
                    <li><a href="#" className="hover:text-[#F97316] transition-colors">Service Client</a></li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-black uppercase tracking-widest text-xs mb-8">Nous contacter</h4>
                 <ul className="space-y-4 text-sm text-slate-500 font-medium">
                    <li>Dakar, Plateau Avenue Lamine Gueye</li>
                    <li>+221 33 800 00 00</li>
                    <li>contact@gorgorlou.sn</li>
                    <li>7j/7 - 24h/24</li>
                 </ul>
              </div>
           </div>

           {/* Dakar Skyline Illustration - Simplified vector look */}
           <div className="h-40 w-full relative opacity-10 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-full flex items-end justify-center gap-2">
                 <div className="w-20 h-40 bg-[#432818] rounded-t-lg"></div>
                 <div className="w-16 h-32 bg-[#432818] rounded-t-lg"></div>
                 <div className="w-24 h-48 bg-[#432818] rounded-t-lg"></div>
                 <div className="w-12 h-24 bg-[#432818] rounded-t-lg"></div>
                 <div className="w-32 h-60 bg-[#432818] rounded-t-lg flex items-center justify-center"><div className="w-1 h-20 bg-white/20"></div></div>
                 <div className="w-16 h-40 bg-[#432818] rounded-t-lg"></div>
                 <div className="w-20 h-32 bg-[#432818] rounded-t-lg"></div>
              </div>
           </div>

           <div className="bg-[#0f172a] py-6 text-center text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
              © 2026 GORGORLOU MARKET - Design by BABACAR DIOP
           </div>
        </footer>
      </main>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/221770000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-[100] animate-bounce"
      >
        <MessageCircle size={32} />
      </a>

    </div>
  );
};

export default Index;
