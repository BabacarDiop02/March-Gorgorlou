import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, ShoppingBag, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      login(response.data.token, response.data.user);
      toast.success("Bienvenue sur Gorgorlou !");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/signup", { email, password, fullName, phone });
      toast.success("Compte créé avec succès ! Connectez-vous.");
      setIsRightPanelActive(false);
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page bg-[#f1f5f9] min-h-screen relative overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className={`container-login absolute top-[47%] left-1/2 -translate-x-1/2 -translate-y-1/2 ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
        
        {/* Sign Up Panel */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp} className="bg-white p-12 flex flex-col items-center justify-center text-center h-full">
            <h1 className="text-2xl font-black mb-6 uppercase tracking-tighter">Créer un compte</h1>
            <div className="w-full space-y-3">
              <input type="text" placeholder="Nom complet" className="bg-[#f3f4f6] border-none p-3 w-full outline-none rounded-lg text-sm font-bold" value={fullName} onChange={e => setFullName(e.target.value)} required />
              <input type="text" placeholder="Email ou Identifiant" className="bg-[#f3f4f6] border-none p-3 w-full outline-none rounded-lg text-sm font-bold" value={email} onChange={e => setEmail(e.target.value)} required />
              <input type="tel" placeholder="Téléphone" className="bg-[#f3f4f6] border-none p-3 w-full outline-none rounded-lg text-sm font-bold" value={phone} onChange={e => setPhone(e.target.value)} required />
              <input type="password" placeholder="Mot de passe" className="bg-[#f3f4f6] border-none p-3 w-full outline-none rounded-lg text-sm font-bold" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading} className="mt-8 bg-[#f97316] hover:bg-[#ea580c] text-white py-3 px-12 rounded-full font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 transition-all text-[10px]">
               {loading ? "Création..." : "S'inscrire"}
            </button>
          </form>
        </div>

        {/* Sign In Panel */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin} className="bg-white p-12 flex flex-col items-center justify-center text-center h-full">
            <h1 className="text-2xl font-black mb-6 uppercase tracking-tighter">Connexion</h1>
            <div className="w-full space-y-3">
              <input type="text" placeholder="Email ou Identifiant" className="bg-[#f3f4f6] border-none p-3 w-full outline-none rounded-lg text-sm font-bold" value={email} onChange={e => setEmail(e.target.value)} required />
              <input type="password" placeholder="Mot de passe" className="bg-[#f3f4f6] border-none p-3 w-full outline-none rounded-lg text-sm font-bold" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <a href="#" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#f97316] transition-colors mt-4">Mot de passe oublié ?</a>
            <button type="submit" disabled={loading} className="mt-8 bg-[#f97316] hover:bg-[#ea580c] text-white py-3 px-12 rounded-full font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 transition-all text-[10px]">
               {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <div className="p-8">
                <img src="/images/logos/logo_marche_gorgorlou.svg" alt="logo" className="w-20 mx-auto mb-6 brightness-0 invert" />
                <h1 className="text-2xl font-black mb-4 uppercase tracking-tighter">Déjà membre ?</h1>
                <p className="text-xs opacity-70 mb-8 leading-relaxed font-medium">Connectez-vous pour accéder à votre espace Teranga et gérer vos commandes.</p>
                <button className="ghost border-2 border-white/30 py-2.5 px-10 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-[#0f172a] transition-all" onClick={() => setIsRightPanelActive(false)}>Se connecter</button>
              </div>
            </div>
            <div className="overlay-panel overlay-right">
              <div className="p-8 text-center">
                <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center p-2 shadow-xl">
                    <img src="/images/logos/logo_marche_gorgorlou.svg" alt="logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-2xl font-black mb-2 uppercase tracking-tighter">MARCHÉ GORGORLOU</h1>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-6">Logiciel d'Archivage et de Gestion</p>
                <p className="text-xs opacity-70 mb-8 leading-relaxed font-medium">Pas encore de compte ? Rejoignez la communauté Gorgorlou dès aujourd'hui.</p>
                <button className="ghost border-2 border-white/30 py-2.5 px-10 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-[#0f172a] transition-all" onClick={() => setIsRightPanelActive(true)}>S'inscrire</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Minimaliste */}
      <div className="fixed bottom-0 w-full py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] bg-white/50 backdrop-blur-sm border-t border-slate-100">
         DESIGN BY <span className="text-[#0f172a]">BABACAR DIOP</span> - COPYRIGHT © 2026.
      </div>

    </div>
  );
};

export default Login;
