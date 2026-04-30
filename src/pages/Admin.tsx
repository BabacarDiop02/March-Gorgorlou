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
import { LayoutDashboard, ShoppingBag, LogOut, Plus, Pencil, Trash2, Upload, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Admin = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("categories");

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

  const handleUpdateOrderStatus = async (id: number, status: string) => {
    try {
      await api.put(`/orders/${id}`, { status });
      toast.success("Statut mis à jour.");
      fetchData();
    } catch (e) {
      toast.error("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 shadow-2xl">
        <div 
          className="flex items-center justify-center mb-10 px-2 pb-6 border-b border-white/10 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        >
          <img 
            src="/images/logos/logo_marche_gorgorlou.svg" 
            alt="Marché Gorgorlou" 
            className="h-12 w-auto filter brightness-0 invert" 
          />
        </div>
        
        <nav className="flex-1 space-y-2">
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 h-12 rounded-xl transition-all ${activeTab !== "orders" ? "text-white bg-white/10 shadow-lg" : "text-white/70 hover:text-white hover:bg-white/10"}`}
            onClick={() => setActiveTab("categories")}
          >
            <LayoutDashboard className="w-5 h-5" />
            Catalogue
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 h-12 rounded-xl transition-all ${activeTab === "orders" ? "text-white bg-white/10 shadow-lg" : "text-white/70 hover:text-white hover:bg-white/10"}`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag className="w-5 h-5" />
            Ventes
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10 h-12 rounded-xl"
            onClick={() => navigate("/")}
          >
            <ExternalLink className="w-5 h-5" />
            Voir le site
          </Button>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="px-2 mb-4">
            <p className="text-xs text-white/40 uppercase tracking-widest font-black mb-1">Administrateur</p>
            <p className="font-heading font-bold">{user?.username}</p>
          </div>
          <Button 
            variant="destructive" 
            className="w-full justify-start gap-3 h-12 rounded-xl shadow-lg shadow-red-500/10"
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-heading font-black text-slate-900 tracking-tight">Panneau de <span className="text-primary">Gestion</span></h1>
            <p className="text-slate-500 font-body mt-2">Modifiez les contenus de votre plateforme en temps réel.</p>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
            <TabsTrigger value="categories" className="rounded-xl px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg h-10 transition-all">
              Univers
            </TabsTrigger>
            <TabsTrigger value="products" className="rounded-xl px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg h-10 transition-all">
              Sécurité (Cards)
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="rounded-xl px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg h-10 transition-all">
              Témoignages
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-xl px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg h-10 transition-all">
              Commandes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <DataCard 
                  key={cat.id} 
                  data={cat} 
                  onDelete={() => handleDelete("categories", cat.id)} 
                  onUpdate={fetchData}
                  type="categories"
                />
              ))}
              <AddButton onClick={() => {}} type="categories" onAdded={fetchData} />
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <DataCard 
                  key={prod.id} 
                  data={prod} 
                  onDelete={() => handleDelete("products", prod.id)} 
                  onUpdate={fetchData}
                  type="products"
                />
              ))}
              <AddButton onClick={() => {}} type="products" onAdded={fetchData} />
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((test) => (
                <DataCard 
                  key={test.id} 
                  data={test} 
                  onDelete={() => handleDelete("testimonials", test.id)} 
                  onUpdate={fetchData}
                  type="testimonials"
                />
              ))}
              <AddButton onClick={() => {}} type="testimonials" onAdded={fetchData} />
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="p-8 border-b border-slate-50">
                <CardTitle className="font-heading font-black text-2xl">Dernières Commandes</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-body">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                        <th className="px-8 py-4">Client</th>
                        <th className="px-8 py-4">Contact & Adresse</th>
                        <th className="px-8 py-4">Articles</th>
                        <th className="px-8 py-4">Total</th>
                        <th className="px-8 py-4">Statut</th>
                        <th className="px-8 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-8 py-12 text-center text-slate-400 italic">Aucune commande pour le moment.</td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-8 py-6">
                              <p className="font-black text-slate-900">{order.firstName} {order.lastName}</p>
                              <p className="text-xs text-slate-400">#{order.id.toString().padStart(4, '0')}</p>
                            </td>
                            <td className="px-8 py-6">
                              <p className="font-bold text-sm text-slate-700">{order.phone}</p>
                              <p className="text-xs text-slate-500 line-clamp-1">{order.address}</p>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex flex-col gap-1">
                                {order.items.map((item: any, i: number) => (
                                  <span key={i} className="text-xs font-medium bg-slate-100 px-2 py-0.5 rounded-full inline-block">
                                    {item.quantity}x {item.productName}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <span className="font-black text-primary">{order.totalPrice.toLocaleString()} FCFA</span>
                            </td>
                            <td className="px-8 py-6">
                              <select 
                                value={order.status} 
                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                className={`text-xs font-black px-3 py-1.5 rounded-xl border-none shadow-sm outline-none cursor-pointer ${
                                  order.status === "PENDING" ? "bg-orange-100 text-orange-600" :
                                  order.status === "CONFIRMED" ? "bg-blue-100 text-blue-600" :
                                  order.status === "DELIVERED" ? "bg-green-100 text-green-600" :
                                  "bg-slate-100 text-slate-600"
                                }`}
                              >
                                <option value="PENDING">EN ATTENTE</option>
                                <option value="CONFIRMED">CONFIRMÉ</option>
                                <option value="DELIVERED">LIVRÉ</option>
                                <option value="CANCELLED">ANNULÉ</option>
                              </select>
                            </td>
                            <td className="px-8 py-6">
                              <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl" onClick={() => handleDelete("orders", order.id)}>
                                <Trash2 size={18} />
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// -- Helpers --

const DataCard = ({ data, onDelete, onUpdate, type }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <Card className="group relative overflow-hidden rounded-[2rem] border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white">
      <div className="h-48 overflow-hidden relative bg-slate-100 flex items-center justify-center">
        {type === "testimonials" ? (
            <div className="text-7xl group-hover:scale-110 transition-transform duration-500 select-none">
                {data.avatar || "👤"}
            </div>
        ) : (
            <img 
                src={data.img.startsWith('/') ? `${STORAGE_URL}${data.img}` : data.img} 
                alt={data.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
        )}
        <div className="absolute top-4 right-4 flex gap-2">
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                    <Button variant="secondary" size="icon" className="w-10 h-10 rounded-xl shadow-lg"><Pencil className="w-5 h-5" /></Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-heading font-black pb-4 border-b">Modifier {type === "testimonials" ? "le témoignage" : "l'élément"}</DialogTitle>
                    </DialogHeader>
                    <ItemForm 
                        initialData={data} 
                        type={type} 
                        onSuccess={() => { onUpdate(); setIsEditing(false); }} 
                    />
                </DialogContent>
            </Dialog>
            <Button variant="destructive" size="icon" className="w-10 h-10 rounded-xl shadow-lg" onClick={onDelete}><Trash2 className="w-5 h-5" /></Button>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-heading font-black text-xl mb-1 line-clamp-1">
            {type === "testimonials" ? data.name : data.title}
        </h3>
        <p className="text-slate-500 font-body text-sm line-clamp-2">
            {type === "testimonials" ? data.text : (data.subtitle || data.tagline)}
        </p>
        {type === "categories" && (
            <p className="text-[10px] font-black uppercase text-primary mt-2">Slug: <span className="text-slate-400">{data.slug}</span></p>
        )}
        {type === "testimonials" && (
            <p className="text-xs font-bold text-primary mt-2 uppercase tracking-wider">{data.quartier}</p>
        )}
      </CardContent>
    </Card>
  );
};

const AddButton = ({ onAdded, type }: any) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-slate-300 h-full min-h-[300px] hover:border-primary hover:bg-primary/5 transition-all group">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:bg-primary group-hover:text-white transition-all">
                        <Plus className="w-8 h-8" />
                    </div>
                    <span className="font-heading font-bold text-slate-500">Ajouter un univers</span>
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-heading font-black pb-4 border-b">Nouvel élément</DialogTitle>
                </DialogHeader>
                <ItemForm type={type} onSuccess={() => { onAdded(); setOpen(false); }} />
            </DialogContent>
        </Dialog>
    );
};

const ItemForm = ({ initialData, type, onSuccess }: any) => {
    const [formData, setFormData] = useState(initialData || (type === "categories" ? {
        title: "", subtitle: "", slug: "", description: "", badge: "", img: "", gridArea: "", subCategories: [], items: []
    } : type === "products" ? {
        title: "", tagline: "", action: "", img: ""
    } : {
        name: "", quartier: "", text: "", avatar: ""
    }));
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    // Sub-elements management
    const [newSub, setNewSub] = useState({ name: "", description: "", image: "" });
    const [newItem, setNewItem] = useState({ name: "", price: "", image: "" });
    const [editingSubId, setEditingSubId] = useState<number | null>(null);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);

    const handleSaveSub = async () => {
        if (!initialData) return toast.error("Veuillez d'abord enregistrer la catégorie.");
        try {
            if (editingSubId) {
                await api.put(`/subcategories/${editingSubId}`, { ...newSub, categoryId: initialData.id });
                toast.success("Sous-catégorie mise à jour.");
            } else {
                await api.post("/subcategories", { ...newSub, categoryId: initialData.id });
                toast.success("Sous-catégorie ajoutée.");
            }
            setNewSub({ name: "", description: "", image: "" });
            setEditingSubId(null);
            onSuccess(); // Refresh parent
        } catch (e) { toast.error("Erreur lors de l'enregistrement."); }
    };

    const handleSaveItem = async () => {
        if (!initialData) return toast.error("Veuillez d'abord enregistrer la catégorie.");
        try {
            if (editingItemId) {
                await api.put(`/universe-items/${editingItemId}`, { ...newItem, categoryId: initialData.id });
                toast.success("Produit mis à jour.");
            } else {
                await api.post("/universe-items", { ...newItem, categoryId: initialData.id });
                toast.success("Produit ajouté.");
            }
            setNewItem({ name: "", price: "", image: "" });
            setEditingItemId(null);
            onSuccess(); // Refresh parent
        } catch (e) { toast.error("Erreur lors de l'enregistrement."); }
    };

    const startEditSub = (sub: any) => {
        setNewSub({ name: sub.name, description: sub.description, image: sub.image });
        setEditingSubId(sub.id);
    };

    const startEditItem = (item: any) => {
        setNewItem({ name: item.name, price: item.price, image: item.image });
        setEditingItemId(item.id);
    };


    const handleDeleteSub = async (id: number) => {
        try {
            await api.delete(`/subcategories/${id}`);
            onSuccess();
        } catch (e) { toast.error("Erreur suppression."); }
    };

    const handleDeleteItem = async (id: number) => {
        try {
            await api.delete(`/universe-items/${id}`);
            onSuccess();
        } catch (e) { toast.error("Erreur suppression."); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            let finalData = { ...formData };
            // Remove nested objects before saving to avoid prisma errors
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
            toast.success("Sauvegardé avec succès.");
            onSuccess();
        } catch (e) {
            toast.error("Erreur lors de la sauvegarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
            <div className="grid grid-cols-2 gap-4">
                {type === "testimonials" ? (
                    <>
                        <div className="space-y-2 col-span-2">
                            <Label>Nom</Label>
                            <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <Label>Quartier</Label>
                            <Input value={formData.quartier} onChange={e => setFormData({...formData, quartier: e.target.value})} required className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <Label>Message</Label>
                            <Input value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} required className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <Label>Avatar (Emoji)</Label>
                            <Input value={formData.avatar} onChange={e => setFormData({...formData, avatar: e.target.value})} placeholder="ex: 👩🏾" required className="h-12 rounded-xl" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-2 col-span-2">
                            <Label>Titre</Label>
                            <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="h-12 rounded-xl" />
                        </div>
                        {type === "categories" && (
                            <div className="space-y-2 col-span-2">
                                <Label>Slug (identifiant URL unique)</Label>
                                <Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="ex: maison" required className="h-12 rounded-xl" />
                            </div>
                        )}
                        <div className="space-y-2 col-span-2">
                            <Label>{type === "categories" ? "Sous-titre" : "Tagline"}</Label>
                            <Input value={formData.subtitle || formData.tagline} onChange={e => setFormData({...formData, [type === "categories" ? 'subtitle' : 'tagline']: e.target.value})} required className="h-12 rounded-xl" />
                        </div>
                        {type === "categories" && (
                            <>
                                <div className="space-y-2 col-span-2">
                                    <Label>Description détaillée</Label>
                                    <Input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Badge</Label>
                                    <Input value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} required className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Zone Grille</Label>
                                    <Input value={formData.gridArea} onChange={e => setFormData({...formData, gridArea: e.target.value})} required className="h-12 rounded-xl" />
                                </div>
                                
                                {/* Dynamic Content Lists */}
                                <div className="col-span-2 pt-6 border-t border-slate-100">
                                    <h4 className="font-heading font-bold text-slate-900 mb-4">Sous-catégories & Produits</h4>
                                    
                                    {/* Subcategories List */}
                                    <div className="space-y-4 mb-6">
                                        <Label className="text-primary uppercase tracking-tighter text-[10px] font-black">Liste des Sous-catégories</Label>
                                        <div className="space-y-2">
                                            {formData.subCategories?.map((sub: any) => (
                                                <div key={sub.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-white overflow-hidden border border-slate-200">
                                                            <img src={sub.image.startsWith('/') ? `${STORAGE_URL}${sub.image}` : sub.image} className="w-full h-full object-cover" />
                                                        </div>
                                                        <span className="text-sm font-bold">{sub.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Button variant="ghost" size="icon" onClick={() => startEditSub(sub)} className="h-8 w-8 text-blue-400 hover:text-blue-600"><Pencil size={14} /></Button>
                                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSub(sub.id)} className="h-8 w-8 text-red-400 hover:text-red-600"><Trash2 size={14} /></Button>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="flex gap-2 items-center bg-white p-2 rounded-xl border border-dashed border-slate-300">
                                                <Input placeholder="Nom" value={newSub.name} onChange={e => setNewSub({...newSub, name: e.target.value})} className="h-8 text-xs" />
                                                <Input placeholder="Image URL / Path" value={newSub.image} onChange={e => setNewSub({...newSub, image: e.target.value})} className="h-8 text-xs" />
                                                <Button type="button" size="sm" onClick={handleSaveSub} className={`h-8 px-3 rounded-lg ${editingSubId ? 'bg-blue-500 hover:bg-blue-600' : ''}`}>
                                                    {editingSubId ? <Pencil size={14} /> : <Plus size={14} />}
                                                </Button>
                                                {editingSubId && (
                                                    <Button type="button" variant="ghost" size="sm" onClick={() => { setEditingSubId(null); setNewSub({ name: "", description: "", image: "" }); }} className="h-8 px-2 rounded-lg text-slate-400"><X size={14} /></Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Items List */}
                                    <div className="space-y-4">
                                        <Label className="text-primary uppercase tracking-tighter text-[10px] font-black">Produits de l'Univers</Label>
                                        <div className="space-y-2">
                                            {formData.items?.map((item: any) => (
                                                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-white overflow-hidden border border-slate-200">
                                                            <img src={item.image.startsWith('/') ? `${STORAGE_URL}${item.image}` : item.image} className="w-full h-full object-cover" />
                                                        </div>
                                                        <span className="text-sm font-bold">{item.name} ({item.price})</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Button variant="ghost" size="icon" onClick={() => startEditItem(item)} className="h-8 w-8 text-blue-400 hover:text-blue-600"><Pencil size={14} /></Button>
                                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)} className="h-8 w-8 text-red-400 hover:text-red-600"><Trash2 size={14} /></Button>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="flex gap-2 items-center bg-white p-2 rounded-xl border border-dashed border-slate-300">
                                                <Input placeholder="Nom produit" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="h-8 text-xs" />
                                                <Input placeholder="Prix (ex: 5 000 FCFA)" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} className="h-8 text-xs" />
                                                <Input placeholder="Image URL" value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} className="h-8 text-xs" />
                                                <Button type="button" size="sm" onClick={handleSaveItem} className={`h-8 px-3 rounded-lg ${editingItemId ? 'bg-blue-500 hover:bg-blue-600' : ''}`}>
                                                    {editingItemId ? <Pencil size={14} /> : <Plus size={14} />}
                                                </Button>
                                                {editingItemId && (
                                                    <Button type="button" variant="ghost" size="sm" onClick={() => { setEditingItemId(null); setNewItem({ name: "", price: "", image: "" }); }} className="h-8 px-2 rounded-lg text-slate-400"><X size={14} /></Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {type === "products" && (
                            <div className="space-y-2 col-span-2">
                                <Label>Action</Label>
                                <Input value={formData.action} onChange={e => setFormData({...formData, action: e.target.value})} required className="h-12 rounded-xl" />
                            </div>
                        )}
                        <div className="space-y-2 col-span-2">
                            <Label>Image principale</Label>
                            <div className="flex gap-4 items-center">
                                <div className="flex-1 h-12 rounded-xl border border-input px-3 py-2 text-sm text-muted-foreground flex items-center overflow-hidden">
                                    {file ? file.name : (formData.img || "Aucune image sélectionnée")}
                                </div>
                                <Label htmlFor="img-upload" className="h-12 px-6 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-all gap-2 font-bold whitespace-nowrap">
                                    <Upload className="w-5 h-5" />
                                    Parcourir
                                </Label>
                                <input id="img-upload" type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-heading font-black shadow-lg shadow-primary/20" disabled={loading}>
                {loading ? "Sauvegarde..." : "Enregistrer les modifications"}
            </Button>
        </form>
    );
};

export default Admin;
