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
    <div className="min-h-screen flex flex-col font-sans">
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Connection Form (Navy) - Exactement comme le modèle */}
        <div className="w-full lg:w-[500px] bg-[#0f172a] flex flex-col items-center justify-center p-12 relative shadow-2xl">
            <div className="w-full max-w-[320px] space-y-12">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-[#f97316] tracking-tight">Connexion</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                <Label htmlFor="username" className="text-white font-bold text-sm">Identifiant</Label>
                <Input
                    id="username"
                    placeholder="Login"
                    className="h-10 bg-[#eef2f6] border-none text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#f97316] rounded-md shadow-inner"
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
                    className="h-10 bg-[#eef2f6] border-none text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#f97316] rounded-md shadow-inner pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
                </div>

                <div className="text-right">
                <a href="#" className="text-[11px] text-white/80 hover:text-[#f97316] transition-colors font-medium">Mot de passe oublié ?</a>
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-12 bg-[#f97316] hover:bg-[#ea580c] text-[#0f172a] text-sm font-black rounded-md shadow-lg transition-all" 
                    disabled={loading}
                >
                {loading ? "VÉRIFICATION..." : "Se connecter"}
                </Button>
            </form>
            </div>
        </div>

        {/* Right Column: Branding (White) */}
        <div className="hidden lg:flex flex-1 bg-white flex-col items-center justify-center p-20">
            <div className="w-full max-w-sm text-center space-y-8">
                <img 
                src="/images/logos/logo_marche_gorgorlou.svg" 
                alt="Marché Gorgorlou" 
                className="mx-auto h-40 w-auto" 
                />
                
                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-[#0f172a] tracking-wide italic">Plateforme Digitale Marché Gorgorlou</h2>
                    <Button 
                        variant="outline" 
                        className="h-10 px-8 border-slate-200 text-slate-500 hover:border-[#f97316] hover:text-[#f97316] rounded-full font-medium transition-all"
                        onClick={() => navigate("/")}
                    >
                        En savoir plus
                    </Button>
                </div>
            </div>
        </div>
      </div>

      {/* Footer bar exactly like the image */}
      <footer className="h-10 bg-[#0a1120] border-t border-white/5 flex items-center justify-center px-6">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
              Design by <span className="text-white font-bold tracking-normal">BABACAR DIOP</span> - Copyright © 2026.
          </p>
      </footer>
    </div>
  );
};

export default Login;
