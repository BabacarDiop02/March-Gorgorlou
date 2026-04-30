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
  Filter,
  Layers,
  Settings,
  ShieldCheck,
  UserCog
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Admin = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // States pour toutes les tables Supabase
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [universeItems, setUniverseItems] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const BRAND_ORANGE = "#f97316";
  const BRAND_NAVY = "#0f172a";

  // Fetch data pour TOUTES les tables
  const fetchData = async () => {
    setLoading(true);
    try {
      const [cats, subCats, uniItems, prods, tests, ords, usrs] = await Promise.all([
        api.get("/categories"),
        api.get("/subcategories"),
        api.get("/universeitems"),
        api.get("/products"),
        api.get("/testimonials"),
        api.get("/orders"),
        api.get("/users"),
      ]);
      setCategories(cats.data);
      setSubCategories(subCats.data);
      setUniverseItems(uniItems.data);
      setProducts(prods.data);
      setTestimonials(tests.data);
      setOrders(ords.data);
      setUsers(usrs.data);
    } catch (e) {
      toast.error("Erreur lors du chargement des données.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [isAuthenticated, navigate]);

  const handleDelete = async (type: string, id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
    try {
      const endpoint = type.toLowerCase();
      await api.delete(`/${endpoint}/${id}`);
      toast.success("Supprimé avec succès.");
      fetchData();
    } catch (e) {
      toast.error("Échec de la suppression.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900">
      {/* Sidebar Complète - Toutes les tables */}
      <aside className="w-72 bg-[#0f172a] text-white flex flex-col shadow-2xl z-20 shrink-0">
        <div className="p-8 flex flex-col items-center border-b border-white/5 bg-white mb-6">
          <img src="/images/logos/logo_marche_gorgorlou.svg" alt="Logo" className="h-16 w-auto" />
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 space-y-6 pb-10">
          <div>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Principal</p>
            <nav className="space-y-1">
              <NavItem icon={<LayoutDashboard size={18} />} label="Tableau de bord" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} orange={BRAND_ORANGE} />
            </nav>
          </div>

          <div>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Gestion Catalogue</p>
            <nav className="space-y-1">
              <NavItem icon={<Package size={18} />} label="Univers (Catégories)" active={activeTab === "categories"} onClick={() => setActiveTab("categories")} orange={BRAND_ORANGE} />
              <NavItem icon={<Layers size={18} />} label="Rayons (Sous-cats)" active={activeTab === "subcategories"} onClick={() => setActiveTab("subcategories")} orange={BRAND_ORANGE} />
              <NavItem icon={<ShieldCheck size={18} />} label="Éléments Univers" active={activeTab === "universeitems"} onClick={() => setActiveTab("universeitems")} orange={BRAND_ORANGE} />
              <NavItem icon={<ShoppingBag size={18} />} label="Articles Sécurité" active={activeTab === "products"} onClick={() => setActiveTab("products")} orange={BRAND_ORANGE} />
            </nav>
          </div>

          <div>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Ventes & Avis</p>
            <nav className="space-y-1">
              <NavItem icon={<ShoppingCart size={18} />} label="Commandes" active={activeTab === "orders"} onClick={() => setActiveTab("orders")} orange={BRAND_ORANGE} />
              <NavItem icon={<MessageSquare size={18} />} label="Témoignages" active={activeTab === "testimonials"} onClick={() => setActiveTab("testimonials")} orange={BRAND_ORANGE} />
            </nav>
          </div>

          <div>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Système</p>
            <nav className="space-y-1">
              <NavItem icon={<UserCog size={18} />} label="Utilisateurs Admin" active={activeTab === "users"} onClick={() => setActiveTab("users")} orange={BRAND_ORANGE} />
              <NavItem icon={<Settings size={18} />} label="Configuration" active={activeTab === "config"} onClick={() => setActiveTab("config")} orange={BRAND_ORANGE} />
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
              Gestion de la Base de Données <span className="text-orange-500 font-black">MARCHÉ GORGORLOU</span>
            </h2>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
             <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 rounded-full border border-orange-100">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                <span className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">Opérationnel</span>
             </div>
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
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Vue d'ensemble</h1>
                    <p className="text-slate-400 text-sm">Contrôle total des {categories.length + subCategories.length + products.length} ressources.</p>
                  </div>
                  <Button variant="outline" className="gap-2 h-10 px-4 rounded-lg bg-white border-slate-200" onClick={fetchData}>
                    <RefreshCcw size={14} className={loading ? 'animate-spin' : ''} /> Actualiser
                  </Button>
               </div>
               
               <div className="grid grid-cols-4 gap-6">
                  <StatCard icon={<Package className="text-orange-600" />} label="Univers" value={categories.length} color="bg-orange-50" />
                  <StatCard icon={<Layers className="text-orange-600" />} label="Rayons" value={subCategories.length} color="bg-orange-50" />
                  <StatCard icon={<ShoppingBag className="text-orange-600" />} label="Produits" value={products.length} color="bg-orange-50" />
                  <StatCard icon={<Users className="text-orange-600" />} label="Admins" value={users.length} color="bg-orange-50" />
               </div>
            </div>
          )}

          {activeTab !== "dashboard" && (
            <div className="space-y-6">
               <div className="flex justify-between items-end mb-8">
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                        Gestion : {activeTab}
                    </h1>
                  </div>
                  <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Input 
                            placeholder="Filtrer la table..." 
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
                          <th className="px-6 py-4">Détails</th>
                          <th className="px-6 py-4">Parent / Catégorie</th>
                          <th className="px-6 py-4">Badge / Tag</th>
                          <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {getAllListData(activeTab, {categories, subCategories, universeItems, products, testimonials, orders, users}).map((item: any) => (
                          <tr key={item.id} className="hover:bg-orange-50/30 transition-colors group">
                            <td className="px-6 py-3">
                                <div className="w-14 h-10 rounded-md bg-slate-100 overflow-hidden border border-slate-200">
                                    <img 
                                        src={getImageUrl(item, activeTab)} 
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=Logo')}
                                    />
                                </div>
                            </td>
                            <td className="px-6 py-3">
                                <p className="font-bold text-slate-700 text-sm line-clamp-1">{item.title || item.name || item.username}</p>
                                <p className="text-[10px] text-slate-400 italic">ID: #{item.id}</p>
                            </td>
                            <td className="px-6 py-3">
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-tighter">
                                    {item.categoryId || item.subCategoryId || item.quartier || 'Système'}
                                </span>
                            </td>
                            <td className="px-6 py-3">
                                <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-3 py-1 rounded-full uppercase tracking-wider">
                                    {item.badge || item.tagline || item.action || 'Élément'}
                                </span>
                            </td>
                            <td className="px-6 py-3">
                                <div className="flex items-center justify-center gap-1">
                                    <EditDialog data={item} type={activeTab} onUpdate={fetchData} orange={BRAND_ORANGE} />
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500" onClick={() => handleDelete(activeTab, item.id)}>
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

const getAllListData = (tab: string, data: any) => {
    if (tab === 'categories') return data.categories;
    if (tab === 'subcategories') return data.subCategories;
    if (tab === 'universeitems') return data.universeItems;
    if (tab === 'products') return data.products;
    if (tab === 'testimonials') return data.testimonials;
    if (tab === 'orders') return data.orders;
    if (tab === 'users') return data.users;
    return [];
};

const getImageUrl = (item: any, tab: string) => {
    if (tab === 'testimonials') return `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`;
    if (tab === 'users') return `https://api.dicebear.com/7.x/initials/svg?seed=${item.username}`;
    const img = item.img || item.image || item.avatar || '';
    return img.startsWith('/') ? `${STORAGE_URL}${img}` : img;
};

const NavItem = ({ icon, label, active, onClick, orange }: any) => (
  <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg transition-all ${active ? `bg-orange-500 text-white shadow-lg shadow-orange-500/20` : 'text-slate-400 hover:text-white hover:bg-white/5'}`} style={active ? {backgroundColor: orange} : {}}>
    {icon}
    <span className="text-sm font-bold tracking-tight">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>}
  </div>
);

const ShoppingCart = ({ size }: any) => <ShoppingBag size={size} />;

const StatCard = ({ icon, label, value, color }: any) => (
  <Card className="rounded-xl border-none shadow-sm bg-white p-6 hover:shadow-md transition-all">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
      <div>
        <h4 className="text-xl font-black text-slate-900 leading-none">{value}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</p>
      </div>
    </div>
  </Card>
);

const AddButton = ({ onAdded, type, orange }: any) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#0f172a] hover:bg-slate-800 text-white gap-2 h-10 px-5 rounded-lg font-bold shadow-lg">
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
                        Modifier : <span className="text-slate-900/70 font-normal italic">{data.title || data.name || data.username}</span>
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
    const [formData, setFormData] = useState(initialData || {
        title: "", name: "", username: "", password: "", subtitle: "", description: "", 
        badge: "", img: "", image_url: "", quartier: "", text: "", categoryId: "", subCategoryId: "",
        price: "", original_price: "", stock_remaining: "", discount_percent: "",
        is_flash_sale: false, flash_sale_ends_at: "", status: "pending", role: "user"
    });
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(initialData?.img || initialData?.image_url ? ( (initialData.img || initialData.image_url).startsWith('/') ? `${STORAGE_URL}${initialData.img || initialData.image_url}` : (initialData.img || initialData.image_url) ) : null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
          let finalData = { ...formData };
          delete finalData.subCategories;
          delete finalData.items;

          if (file && !['testimonials', 'users', 'orders'].includes(type)) {
              const imgUrl = await uploadImage(file);
              if (type === 'products') finalData.image_url = imgUrl;
              else finalData.img = imgUrl;
          }
          
          const endpoint = type.toLowerCase();
          if (initialData) {
              await api.put(`/${endpoint}/${initialData.id}`, finalData);
          } else {
              await api.post(`/${endpoint}`, finalData);
          }
          toast.success("Enregistré avec succès.");
          onSuccess();
      } catch (e) {
          toast.error("Erreur lors de l'enregistrement.");
      } finally {
          setLoading(false);
      }
    };

    const renderProductFields = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Nom du produit</Label>
                    <Input className="h-12 border-slate-200" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ex: Casque de chantier" required />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Catégorie (ID)</Label>
                    <Input className="h-12 border-slate-200" value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} placeholder="Ex: 1" />
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Prix (FCFA)</Label>
                    <Input type="number" className="h-12 border-slate-200" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Prix Barré (FCFA)</Label>
                    <Input type="number" className="h-12 border-slate-200" value={formData.original_price} onChange={e => setFormData({...formData, original_price: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Stock restant</Label>
                    <Input type="number" className="h-12 border-slate-200" value={formData.stock_remaining} onChange={e => setFormData({...formData, stock_remaining: e.target.value})} />
                </div>
            </div>

            <div className="p-6 bg-orange-50 border border-orange-100 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                            <Bell size={16} />
                        </div>
                        <Label className="text-xs font-black uppercase text-orange-800">Vente Flash</Label>
                    </div>
                    <input type="checkbox" className="w-5 h-5 accent-orange-500" checked={formData.is_flash_sale} onChange={e => setFormData({...formData, is_flash_sale: e.target.checked})} />
                </div>
                {formData.is_flash_sale && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase text-orange-600">Fin de la promo</Label>
                            <Input type="datetime-local" className="bg-white border-orange-200" value={formData.flash_sale_ends_at ? new Date(formData.flash_sale_ends_at).toISOString().slice(0, 16) : ""} onChange={e => setFormData({...formData, flash_sale_ends_at: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase text-orange-600">% de réduction</Label>
                            <Input type="number" className="bg-white border-orange-200" value={formData.discount_percent} onChange={e => setFormData({...formData, discount_percent: e.target.value})} placeholder="Ex: 20" />
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Image du produit</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-orange-500 transition-all cursor-pointer relative min-h-[250px]" onClick={() => document.getElementById('file-input')?.click()}>
                    {preview ? (
                        <img src={preview} className="absolute inset-0 w-full h-full object-contain p-4" />
                    ) : (
                        <>
                            <Upload size={32} className="text-slate-300" />
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Choisir une image</p>
                        </>
                    )}
                    <input id="file-input" type="file" className="hidden" onChange={handleFileChange} />
                </div>
            </div>
        </div>
    );

    const renderUserFields = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Nom d'utilisateur</Label>
                    <Input className="h-12" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Rôle système</Label>
                    <select className="w-full h-12 border border-slate-200 rounded-lg px-4 bg-white" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                        <option value="user">Utilisateur standard</option>
                        <option value="admin">Administrateur</option>
                    </select>
                </div>
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Nouveau Mot de passe</Label>
                <Input type="password" title="password" className="h-12" placeholder="Laissez vide pour ne pas changer" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>
        </div>
    );

    const renderOrderFields = () => (
        <div className="space-y-6">
            <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl">
                <Label className="text-[10px] font-black uppercase text-slate-400 mb-4 block">Statut de livraison</Label>
                <div className="grid grid-cols-2 gap-3">
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                        <div 
                            key={status}
                            onClick={() => setFormData({...formData, status})}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${formData.status === status ? 'border-orange-500 bg-orange-50' : 'border-white bg-white hover:border-slate-200'}`}
                        >
                            <div className={`w-3 h-3 rounded-full ${status === 'pending' ? 'bg-yellow-500' : status === 'delivered' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                            <span className="text-xs font-bold uppercase tracking-wider">{status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderGenericFields = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Titre / Nom</Label>
                <Input className="h-12" value={formData.title || formData.name} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Description / Texte</Label>
                <textarea 
                    className="w-full min-h-[150px] border border-slate-200 rounded-xl p-4 outline-none focus:border-orange-500"
                    value={formData.description || formData.subtitle || formData.text}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                />
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-10 animate-in fade-in duration-500">
            {type === 'products' && renderProductFields()}
            {type === 'users' && renderUserFields()}
            {type === 'orders' && renderOrderFields()}
            {!['products', 'users', 'orders'].includes(type) && renderGenericFields()}

            <div className="flex justify-end gap-4 pt-10 border-t border-slate-100">
                <DialogPrimitive.Close asChild>
                    <Button type="button" variant="ghost" className="h-12 px-8 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Annuler</Button>
                </DialogPrimitive.Close>
                <Button type="submit" disabled={loading} className="h-12 px-12 bg-[#0f172a] hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-slate-900/20 rounded-xl">
                    {loading ? "Traitement..." : "Sauvegarder l'élément"}
                </Button>
            </div>
        </form>
    );
};

export default Admin;
