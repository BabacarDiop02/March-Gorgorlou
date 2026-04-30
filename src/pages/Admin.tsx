import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api, { uploadImage, STORAGE_URL } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  LogOut, 
  Plus, 
  Pencil, 
  Trash2, 
  Upload, 
  ExternalLink, 
  X, 
  Package, 
  Users, 
  MessageSquare,
  ChevronRight,
  RefreshCcw,
  Bell,
  Mail,
  Search,
  Eye,
  MoreVertical,
  Mic,
  HelpCircle,
  Filter
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Admin = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const BRAND_ORANGE = "#f97316"; // Orange vibrant du logo
  const BRAND_NAVY = "#0f172a";   // Bleu marine du logo

  // Fetch data
  const fetchData = async () => {
    try {
      const [cats, prods, tests, ords] = await Promise.all([
        api.get("/categories"),
        api.get("/products"),
        api.get("/testimonials"),
        api.get("/orders"),
      ]);
      setCategories(cats.data);
      setProducts(prods.data);
      setTestimonials(tests.data);
      setOrders(ords.data);
    } catch (e) {
      toast.error("Erreur lors du chargement des données.");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [isAuthenticated, navigate]);

  const handleDelete = async (type: "categories" | "products" | "testimonials" | "orders", id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
    try {
      await api.delete(`/${type}/${id}`);
      toast.success("Supprimé avec succès.");
      fetchData();
    } catch (e) {
      toast.error("Échec de la suppression.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900">
      {/* Sidebar - Style Institutionnel aux couleurs de Marché Gorgorlou */}
      <aside className="w-72 bg-[#0f172a] text-white flex flex-col shadow-2xl z-20 shrink-0">
        <div className="p-8 flex flex-col items-center border-b border-white/5 bg-white mb-6">
          <img src="/images/logos/logo_marche_gorgorlou.svg" alt="Logo" className="h-16 w-auto" />
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 space-y-8">
          <div>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Principal</p>
            <nav className="space-y-1">
              <NavItem icon={<LayoutDashboard size={18} />} label="Tableau de bord" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} orange={BRAND_ORANGE} />
            </nav>
          </div>

          <div>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Gestion Catalogue</p>
            <nav className="space-y-1">
              <NavItem icon={<Package size={18} />} label="Univers & Rayons" active={activeTab === "categories"} onClick={() => setActiveTab("categories")} orange={BRAND_ORANGE} />
              <NavItem icon={<ShoppingBag size={18} />} label="Articles Sécurité" active={activeTab === "products"} onClick={() => setActiveTab("products")} orange={BRAND_ORANGE} />
            </nav>
          </div>

          <div>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Relations Clients</p>
            <nav className="space-y-1">
              <NavItem icon={<ShoppingBag size={18} />} label="Commandes / Ventes" active={activeTab === "orders"} onClick={() => setActiveTab("orders")} orange={BRAND_ORANGE} />
              <NavItem icon={<MessageSquare size={18} />} label="Témoignages" active={activeTab === "testimonials"} onClick={() => setActiveTab("testimonials")} orange={BRAND_ORANGE} />
            </nav>
          </div>
        </div>

        <div className="p-6 border-t border-white/5">
          <Button variant="ghost" className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-xl h-12" onClick={logout}>
            <LogOut size={18} />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-base font-bold text-slate-700 tracking-tight">
              Administration Marché : <span className="font-normal text-slate-400 uppercase text-[10px] tracking-widest ml-2">Gorgorlou Digital Portal</span>
            </h2>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
             <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 rounded-full border border-orange-100">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                <span className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">Connecté</span>
             </div>
             <Mail size={20} className="hover:text-orange-500 cursor-pointer transition-colors" />
             <Bell size={20} className="hover:text-orange-500 cursor-pointer transition-colors" />
             <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white shadow-lg border-2 border-orange-500">
                {user?.username?.charAt(0).toUpperCase()}
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10">
          {activeTab === "dashboard" && (
            <div className="space-y-10">
               <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tableau de bord</h1>
                    <p className="text-slate-400 text-sm">Identité visuelle : <span className="text-orange-500 font-bold uppercase tracking-widest text-[10px]">Orange Marché</span></p>
                  </div>
                  <Button variant="outline" className="gap-2 h-10 px-4 rounded-lg bg-white border-slate-200" onClick={fetchData}>
                    <RefreshCcw size={14} /> Actualiser
                  </Button>
               </div>
               
               <div className="grid grid-cols-5 gap-6">
                  <StatCard icon={<Package className="text-orange-600" />} label="Univers" value={categories.length} color="bg-orange-50" />
                  <StatCard icon={<ShoppingBag className="text-orange-600" />} label="Produits" value={products.length} color="bg-orange-50" />
                  <StatCard icon={<Users className="text-orange-600" />} label="Commandes" value={orders.length} color="bg-orange-50" />
                  <StatCard icon={<MessageSquare className="text-orange-600" />} label="Avis" value={testimonials.length} color="bg-orange-50" />
                  <StatCard icon={<Bell className="text-red-600" />} label="Alertes" value={orders.filter(o => o.status === 'PENDING').length} color="bg-red-50" />
               </div>
            </div>
          )}

          {activeTab !== "dashboard" && (
            <div className="space-y-6">
               <div className="flex justify-between items-end mb-8">
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                        {activeTab === 'categories' ? 'Univers & Rayons' : activeTab === 'products' ? 'Articles Sécurité' : activeTab === 'testimonials' ? 'Témoignages' : 'Commandes'}
                    </h1>
                  </div>
                  <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Input 
                            placeholder="Rechercher..." 
                            className="pl-10 h-10 w-64 bg-white border-slate-200 rounded-lg shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <AddButton type={activeTab} onAdded={fetchData} orange={BRAND_ORANGE} />
                  </div>
               </div>

               <Card className="rounded-xl border-none shadow-xl overflow-hidden bg-white">
                  <CardContent className="p-0">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#f97316] text-white text-[11px] font-black uppercase tracking-widest">
                          <th className="px-6 py-4 w-24">Image</th>
                          <th className="px-6 py-4">Titre / Nom</th>
                          <th className="px-6 py-4">Catégorie / Groupe</th>
                          <th className="px-6 py-4">Type / Tag</th>
                          <th className="px-6 py-4 text-center">Validation</th>
                          <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {getListData(activeTab, categories, products, testimonials, orders).map((item: any) => (
                          <tr key={item.id} className="hover:bg-orange-50/30 transition-colors group">
                            <td className="px-6 py-3">
                                <div className="w-14 h-10 rounded-md bg-slate-100 overflow-hidden border border-slate-200">
                                    <img 
                                        src={getImageUrl(item, activeTab)} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </td>
                            <td className="px-6 py-3">
                                <p className="font-bold text-slate-700 text-sm line-clamp-1">{item.title || item.name}</p>
                                <p className="text-[10px] text-slate-400 italic">GORGORLOU-ID: #{item.id}</p>
                            </td>
                            <td className="px-6 py-3">
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-tighter">{getCategoryLabel(item, activeTab)}</span>
                            </td>
                            <td className="px-6 py-3">
                                <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-3 py-1 rounded-full uppercase tracking-wider">
                                    {item.type || item.badge || item.tagline || 'Contenu'}
                                </span>
                            </td>
                            <td className="px-6 py-3 text-center">
                                <span className={`text-[9px] font-black px-3 py-1 rounded uppercase tracking-[0.15em] ${
                                    item.status === 'CANCELLED' ? 'bg-red-100 text-red-600' : 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                                }`}>
                                    {item.status || 'En Ligne'}
                                </span>
                            </td>
                            <td className="px-6 py-3">
                                <div className="flex items-center justify-center gap-1">
                                    <EditDialog data={item} type={activeTab} onUpdate={fetchData} orange={BRAND_ORANGE} />
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500" onClick={() => handleDelete(activeTab as any, item.id)}>
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
               </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// -- Helpers --

const getListData = (tab: string, cats: any[], prods: any[], tests: any[], ords: any[]) => {
    if (tab === 'categories') return cats;
    if (tab === 'products') return prods;
    if (tab === 'testimonials') return tests;
    return ords;
};

const getImageUrl = (item: any, tab: string) => {
    if (tab === 'testimonials') return `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`;
    const img = item.img || item.image || '';
    return img.startsWith('/') ? `${STORAGE_URL}${img}` : img;
};

const getCategoryLabel = (item: any, tab: string) => {
    if (tab === 'categories') return 'Univers Global';
    if (tab === 'products') return 'Sécurité';
    if (tab === 'testimonials') return item.quartier;
    return 'Commande';
};

const NavItem = ({ icon, label, active, onClick, orange }: any) => (
  <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer rounded-lg transition-all ${active ? `bg-[${orange}] text-white shadow-lg shadow-orange-500/20` : 'text-slate-400 hover:text-white hover:bg-white/5'}`} style={active ? {backgroundColor: orange} : {}}>
    {icon}
    <span className="text-sm font-bold tracking-tight">{label}</span>
    {active && <div className="ml-auto w-1 h-4 rounded-full bg-white/40"></div>}
  </div>
);

const StatCard = ({ icon, label, value, color }: any) => (
  <Card className="rounded-xl border-none shadow-sm bg-white p-6 border-b-2 border-transparent hover:border-orange-500 transition-all">
    <div className="flex flex-col items-center text-center gap-3">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
      <div>
        <h4 className="text-2xl font-black text-slate-900 leading-none mb-1">{value}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  </Card>
);

const AddButton = ({ onAdded, type, orange }: any) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2 h-10 px-5 rounded-lg font-bold shadow-lg shadow-slate-900/10">
                    <Plus size={16} /> Nouveau
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl rounded-xl p-0 overflow-hidden border-none shadow-2xl">
                <div className="p-5" style={{backgroundColor: orange}}>
                    <DialogTitle className="text-lg font-bold text-white uppercase tracking-widest">Nouveau : {type}</DialogTitle>
                </div>
                <div className="p-10 max-h-[85vh] overflow-y-auto">
                    <ItemForm type={type} onSuccess={() => { onAdded(); setOpen(false); }} orange={orange} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

const EditDialog = ({ data, type, onUpdate, orange }: any) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-500 transition-colors"><Eye size={14} /></Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl rounded-xl p-0 overflow-hidden border-none shadow-2xl">
                <div className="p-6" style={{backgroundColor: orange}}>
                    <DialogTitle className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                        Modifier : <span className="text-slate-900/70 font-normal italic">{data.title || data.name}</span>
                    </DialogTitle>
                </div>
                <div className="p-12 max-h-[90vh] overflow-y-auto">
                    <ItemForm initialData={data} type={type} onSuccess={() => { onUpdate(); setOpen(false); }} orange={orange} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

// -- ItemForm --

const ItemForm = ({ initialData, type, onSuccess, orange }: any) => {
    const [formData, setFormData] = useState(initialData || (type === "categories" ? {
        title: "", subtitle: "", slug: "", description: "", badge: "", img: "", gridArea: "", subCategories: [], items: []
    } : type === "products" ? {
        title: "", tagline: "", action: "", img: ""
    } : {
        name: "", quartier: "", text: "", avatar: ""
    }));
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            let finalData = { ...formData };
            delete finalData.subCategories;
            delete finalData.items;

            if (file && type !== "testimonials") {
                const imgUrl = await uploadImage(file);
                finalData.img = imgUrl;
            }
            
            if (initialData) {
                await api.put(`/${type}/${initialData.id}`, finalData);
            } else {
                await api.post(`/${type}`, finalData);
            }
            toast.success("Enregistré avec succès.");
            onSuccess();
        } catch (e) {
            toast.error("Erreur lors de l'enregistrement.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Titre / Nom <span className="text-orange-500">*</span></Label>
                    <Input 
                        value={formData.title || formData.name} 
                        onChange={e => setFormData({...formData, [formData.title !== undefined ? 'title' : 'name']: e.target.value})} 
                        required 
                        className="h-11 rounded-lg bg-white border-slate-200 focus:ring-orange-500 focus:border-orange-500" 
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Catégorie / Groupe <span className="text-orange-500">*</span></Label>
                    <Input 
                        value={formData.slug || formData.quartier || 'Standard'} 
                        onChange={e => setFormData({...formData, [formData.slug !== undefined ? 'slug' : 'quartier']: e.target.value})} 
                        required 
                        className="h-11 rounded-lg bg-white border-slate-200" 
                    />
                </div>

                <div className="col-span-2 space-y-2">
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description courte <span className="text-orange-500">*</span></Label>
                    <textarea 
                        value={formData.description || formData.subtitle || formData.text} 
                        onChange={e => setFormData({...formData, [formData.description !== undefined ? 'description' : formData.subtitle !== undefined ? 'subtitle' : 'text']: e.target.value})} 
                        className="w-full min-h-[100px] p-4 rounded-lg border border-slate-200 outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div>

                <div className="col-span-2 space-y-3">
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Contenu détaillé <span className="text-orange-500">*</span></Label>
                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-slate-50 border-b border-slate-200 p-3 flex gap-4">
                            <span className="text-[10px] font-black text-orange-500 uppercase">Éditeur Marché Gorgorlou</span>
                        </div>
                        <textarea className="w-full min-h-[200px] p-8 outline-none text-slate-700 font-serif" placeholder="Rédiger ici..." />
                    </div>
                </div>

                <div className="col-span-2 space-y-4">
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Image de couverture</Label>
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center gap-4 group hover:border-orange-500 transition-colors cursor-pointer" onClick={() => document.getElementById('img-upload')?.click()}>
                        <Upload size={32} className="text-slate-300 group-hover:text-orange-500 transition-colors" />
                        <div className="text-center">
                            <p className="text-sm font-bold text-slate-600">Téléverser un média</p>
                            <input id="img-upload" type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-10 border-t border-slate-100">
                <DialogPrimitive.Close asChild>
                    <Button type="button" variant="ghost" className="h-12 px-8 rounded-lg font-bold text-slate-400">Fermer</Button>
                </DialogPrimitive.Close>
                <Button type="submit" className="text-white px-12 h-12 rounded-lg font-bold shadow-lg shadow-orange-500/20" style={{backgroundColor: orange}} disabled={loading}>
                    {loading ? "Enregistrement..." : "Sauvegarder"}
                </Button>
            </div>
        </form>
    );
};

export default Admin;
