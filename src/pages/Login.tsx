import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const BRAND_ORANGE = "#f97316"; // Orange Gorgorlou
  const BRAND_NAVY = "#0f172a";   // Marine Gorgorlou

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { username, password });
      login(response.data.token, response.data.user);
      toast.success("Connexion réussie !");
      navigate("/admin");
    } catch (error: any) {
      toast.error("Identifiants invalides ou erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0f172a] font-sans overflow-hidden">
      {/* Left Column: Connection Form (Navy) */}
      <div className="w-full lg:w-[45%] bg-[#0f172a] flex flex-col items-center justify-center p-12 relative z-10 shadow-[20px_0_60px_rgba(0,0,0,0.5)]">
        <div className="w-full max-w-sm space-y-10">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                Connexion
            </h1>
            <div className="w-12 h-1 bg-[#f97316] mx-auto rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Identifiant</Label>
              <Input
                id="username"
                placeholder="Ex: admin"
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:ring-[#f97316] focus:border-[#f97316] rounded-xl transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:ring-[#f97316] focus:border-[#f97316] rounded-xl pr-10 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-[#f97316] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a href="#" className="text-[10px] text-slate-500 hover:text-[#f97316] transition-colors font-bold uppercase tracking-widest">Mot de passe oublié ?</a>
            </div>

            <Button 
                type="submit" 
                className="w-full h-14 bg-[#f97316] hover:bg-[#ea580c] text-white text-base font-black rounded-xl shadow-lg shadow-orange-600/20 transition-all uppercase tracking-[0.1em] mt-4" 
                disabled={loading}
            >
              {loading ? "Vérification..." : "Se connecter"}
            </Button>
          </form>
        </div>

        <div className="absolute bottom-8 left-0 w-full text-center">
            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">Design by <span className="text-slate-400">Babacar DIOP</span></p>
        </div>
      </div>

      {/* Right Column: Branding (White) */}
      <div className="hidden lg:flex flex-1 bg-white flex-col items-center justify-center p-20 relative">
        <div className="w-full max-w-md text-center space-y-12 z-10">
            <img 
              src="/images/logos/logo_marche_gorgorlou.svg" 
              alt="Marché Gorgorlou" 
              className="mx-auto h-56 w-auto drop-shadow-2xl animate-in zoom-in duration-700" 
            />
            
            <div className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">
                    Plateforme Digitale <br/>
                    <span className="text-[#f97316]">Marché Gorgorlou</span>
                </h2>
                <p className="text-slate-400 font-medium italic text-sm">Gestion sécurisée du catalogue et des ventes.</p>
            </div>

            <Button 
                variant="outline" 
                className="h-12 px-10 border-slate-200 text-slate-400 hover:border-[#f97316] hover:text-[#f97316] hover:bg-orange-50 rounded-full font-bold transition-all uppercase text-[10px] tracking-widest"
                onClick={() => navigate("/")}
            >
                Retour au site
            </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default Login;
