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
  const [loading, setLoading] = useState(false);

  // Fetch data
  const fetchData = async () => {
    try {
      const [cats, prods, tests] = await Promise.all([
        api.get("/categories"),
        api.get("/products"),
        api.get("/testimonials"),
      ]);
      setCategories(cats.data);
      setProducts(prods.data);
      setTestimonials(tests.data);
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

  const handleDelete = async (type: "categories" | "products" | "testimonials", id: number) => {
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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 shadow-2xl">
        <div 
          className="flex items-center gap-3 mb-10 px-2 pb-6 border-b border-white/10 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">G</div>
          <span className="font-heading font-black text-xl tracking-tighter uppercase">Gorgorlou</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10 h-12 rounded-xl"
            onClick={() => navigate("/admin")}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10 h-12 rounded-xl"
            onClick={() => toast.info("Section Ventes - Prochainement disponible.")}
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

        <Tabs defaultValue="categories" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
            <TabsTrigger value="categories" className="rounded-xl px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg h-10 transition-all">
              Catégories
            </TabsTrigger>
            <TabsTrigger value="products" className="rounded-xl px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg h-10 transition-all">
              Produits
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="rounded-xl px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg h-10 transition-all">
              Témoignages
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
                <DialogContent className="max-w-xl rounded-3xl p-8">
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
                    <span className="font-heading font-bold text-slate-500">Ajouter un nouvel élément</span>
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-xl rounded-3xl p-8">
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
        title: "", subtitle: "", badge: "", img: "", gridArea: ""
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
                        <div className="space-y-2">
                            <Label>Nom</Label>
                            <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
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
                        <div className="space-y-2 col-span-2">
                            <Label>{type === "categories" ? "Sous-titre" : "Tagline"}</Label>
                            <Input value={formData.subtitle || formData.tagline} onChange={e => setFormData({...formData, [type === "categories" ? 'subtitle' : 'tagline']: e.target.value})} required className="h-12 rounded-xl" />
                        </div>
                        {type === "categories" && (
                            <>
                                <div className="space-y-2">
                                    <Label>Badge</Label>
                                    <Input value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} required className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Zone Grille</Label>
                                    <Input value={formData.gridArea} onChange={e => setFormData({...formData, gridArea: e.target.value})} required className="h-12 rounded-xl" />
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
                            <Label>Image</Label>
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
