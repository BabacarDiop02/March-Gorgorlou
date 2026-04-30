import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // On envoie 'username' car c'est ce que votre serveur Prisma attend
      const response = await api.post("/auth/login", { username: email, password });
      login(response.data.token, response.data.user);
      toast.success("Bienvenue sur Gorgorlou !");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-body min-h-screen relative overflow-hidden">
      
      <div className={`container-login ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
        
        {/* Sign Up Panel (Description Info) */}
        <div className="form-container sign-up-container">
          <form action="#" className="form-description">
            <p className="mb-3">
               <img id="logo-light" className="logo-light" style={{width: '100px'}} src="/images/logos/logo_marche_gorgorlou.svg" alt="logo-light" />
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-500 font-medium">
              Marché Gorgorlou est une solution numérique innovante conçue pour centraliser, organiser et sécuriser l’ensemble de vos activités commerciales au Sénégal. Notre plateforme permet de collecter, classer, et diffuser efficacement vos produits tout en garantissant une traçabilité totale et une expérience client exceptionnelle.
            </p>
          </form>
        </div>

        {/* Sign In Panel (Connexion Form) */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h3 style={{color: '#f97316'}} className="mb-8 text-2xl font-black uppercase tracking-tighter">Connexion</h3>
            
            <label className="w-full text-left text-white text-xs font-bold uppercase tracking-widest mb-1">Identifiant</label>
            <input 
                type="text" 
                placeholder="Login ou Email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />

            <div className="password-container mt-4 w-full text-left">
                <label className="w-full text-left text-white text-xs font-bold uppercase tracking-widest mb-1">Mot de passe</label>
                <input 
                    type="password" 
                    placeholder="Mot de passe" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <div className="w-full d-flex justify-content-end mt-1 text-right">
                    <a href="#" className="text-white text-[10px] uppercase font-bold tracking-widest hover:underline">Mot de passe oublié ?</a>
                </div>
            </div>

            <button className="mt-8" type="submit" disabled={loading}>
               {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div className="overlay-container" id="overlay">
          <div className="overlay">
            <div className="overlay-panel overlay-left bg-[#0f172a]">
              <h1 className="text-2xl font-black uppercase tracking-tighter mb-4">Bienvenue</h1>
              <p className="text-sm font-medium mb-8">Cliquez pour vous connecter à votre espace personnel Gorgorlou</p>
              <button className="ghost more-learn" onClick={() => setIsRightPanelActive(false)}>Se connecter</button>
            </div>
            <div className="overlay-panel overlay-right bg-white text-[#0f172a]">
              <img className="logo-light mb-6" style={{width: '150px', borderRadius: '10px'}} src="/images/logos/logo_marche_gorgorlou.svg" alt="Gorgorlou" />
              <p className="text-sm font-medium mb-8">Logiciel de Gestion Commerciale & E-commerce au Sénégal</p>
              <button className="ghost text-black more-learn border-[#333]" onClick={() => setIsRightPanelActive(true)}>En savoir plus</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Minimaliste */}
      <footer className="fixed bottom-0 w-full py-4 text-center text-[10px] font-black text-white uppercase tracking-[0.4em] bg-[#0f172a] z-[1000]">
         DESIGN BY <span className="text-[#f97316]">BABACAR DIOP</span> - COPYRIGHT © 2026.
      </footer>

    </div>
  );
};

export default Login;
