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
    <div className="min-h-screen flex bg-slate-900 font-sans overflow-hidden">
      {/* Left Column: Connection Form (Dark Blue) */}
      <div className="w-full lg:w-[45%] bg-[#0f172a] flex flex-col items-center justify-center p-12 relative">
        <div className="w-full max-w-sm space-y-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#c5a059] tracking-tight">Connexion</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white font-bold text-sm">Identifiant</Label>
              <Input
                id="username"
                placeholder="Login"
                className="h-12 bg-[#f8fafc]/10 border-white/20 text-white placeholder:text-slate-500 focus:ring-[#c5a059] focus:border-[#c5a059] rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-bold text-sm">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  className="h-12 bg-[#f8fafc]/10 border-white/20 text-white placeholder:text-slate-500 focus:ring-[#c5a059] focus:border-[#c5a059] rounded-md pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a href="#" className="text-xs text-white/70 hover:text-[#c5a059] transition-colors font-medium italic">Mot de passe oublié ?</a>
            </div>

            <Button 
                type="submit" 
                className="w-full h-14 bg-[#c5a059] hover:bg-[#a6864a] text-slate-900 text-lg font-black rounded-lg shadow-lg shadow-[#c5a059]/10 transition-all uppercase tracking-widest mt-4" 
                disabled={loading}
            >
              {loading ? "Chargement..." : "Se connecter"}
            </Button>
          </form>
        </div>

        {/* Footer info in sidebar */}
        <div className="absolute bottom-6 left-0 w-full text-center">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Design by <span className="text-white font-bold">Babacar DIOP</span> - Copyright © 2026</p>
        </div>
      </div>

      {/* Right Column: Logo & Branding (White) */}
      <div className="hidden lg:flex flex-1 bg-white flex-col items-center justify-center p-20 relative">
        <div className="absolute top-0 right-0 p-8 flex items-center gap-4 text-slate-400">
             {/* Optional top right icons if needed */}
        </div>
        
        <div className="w-full max-w-md text-center space-y-12">
            <img 
              src="/images/logos/logo_marche_gorgorlou.svg" 
              alt="Marché Gorgorlou" 
              className="mx-auto h-48 w-auto drop-shadow-2xl animate-fade-in" 
            />
            
            <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Plateforme Digitale <br/><span className="text-[#c5a059]">Marché Gorgorlou</span></h2>
                <div className="w-20 h-1 bg-[#c5a059] mx-auto rounded-full"></div>
                <p className="text-slate-400 font-medium italic">Accédez à votre espace de gestion sécurisé pour administrer le catalogue, les ventes et les témoignages clients.</p>
            </div>

            <Button 
                variant="outline" 
                className="h-12 px-10 border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-white rounded-full font-bold transition-all"
                onClick={() => navigate("/")}
            >
                Retour au site
            </Button>
        </div>

        {/* Decorative corner element */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-50 rounded-tl-[100%] z-0 pointer-events-none opacity-50"></div>
      </div>
    </div>
  );
};

export default Login;
