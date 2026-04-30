import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, ChevronRight } from "lucide-react";

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const BRAND_ORANGE = "#f97316";
  const BRAND_NAVY = "#0f172a";

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
    <div className="login-body h-screen flex items-center justify-center bg-[#f6f5f7] font-montserrat overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
        
        .login-body {
            font-family: 'Montserrat', sans-serif;
        }

        .container-login {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
          position: relative;
          overflow: hidden;
          width: 850px;
          max-width: 90%;
          min-height: 550px;
        }

        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
        }

        .sign-in-container {
          left: 0;
          width: 50%;
          z-index: 2;
        }

        .container-login.right-panel-active .sign-in-container {
          transform: translateX(100%);
        }

        .sign-up-container {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
        }

        .container-login.right-panel-active .sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          animation: show 0.6s;
        }

        @keyframes show {
          0%, 49.99% { opacity: 0; z-index: 1; }
          50%, 100% { opacity: 1; z-index: 5; }
        }

        .overlay-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.6s ease-in-out;
          z-index: 100;
        }

        .container-login.right-panel-active .overlay-container {
          transform: translateX(-100%);
        }

        .overlay {
          background: ${BRAND_NAVY};
          background: linear-gradient(to right, ${BRAND_NAVY}, #1e293b);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 0 0;
          color: #FFFFFF;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }

        .container-login.right-panel-active .overlay {
          transform: translateX(50%);
        }

        .overlay-panel {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          text-align: center;
          top: 0;
          height: 100%;
          width: 50%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }

        .overlay-left {
          transform: translateX(-20%);
        }

        .container-login.right-panel-active .overlay-left {
          transform: translateX(0);
        }

        .overlay-right {
          right: 0;
          transform: translateX(0);
        }

        .container-login.right-panel-active .overlay-right {
          transform: translateX(20%);
        }

        .ghost-btn {
          border-radius: 60px;
          border: 1px solid ${BRAND_ORANGE};
          background-color: transparent;
          color: ${BRAND_ORANGE};
          font-size: 12px;
          font-weight: bold;
          padding: 12px 45px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: transform 80ms ease-in;
          cursor: pointer;
        }

        .ghost-btn:active { transform: scale(0.95); }
        .ghost-btn:focus { outline: none; }

        .form-content {
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 50px;
          height: 100%;
          text-align: center;
        }

        .login-input {
          background-color: #eee;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 12px 15px;
          margin: 8px 0;
          width: 100%;
          outline: none;
        }

        .login-input:focus { border-color: ${BRAND_ORANGE}; }

        footer {
          background-color: ${BRAND_NAVY};
          color: #fff;
          font-size: 14px;
          bottom: 0;
          position: fixed;
          left: 0;
          right: 0;
          text-align: center;
          z-index: 999;
          padding: 15px 0;
        }
      `}</style>

      <div className={`container-login ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
        {/* Info Panel (Initially Hidden on right, becomes visible when active) */}
        <div className="form-container sign-up-container">
          <div className="form-content bg-white">
            <img src="/images/logos/logo_marche_gorgorlou.svg" alt="logo" className="w-24 mb-6" />
            <p className="text-slate-600 text-sm leading-relaxed text-justify italic">
              La plateforme digitale de Marché Gorgorlou est une solution innovante conçue pour centraliser, 
              organiser et sécuriser l'ensemble de votre catalogue commercial. Elle facilite l'accès rapide aux 
              produits et aux ventes pour les administrateurs et les clients au Sénégal. 
              Gérez efficacement vos univers, vos rayons et vos stocks en toute simplicité.
            </p>
            <Button 
                variant="ghost" 
                className="mt-6 border-slate-200 text-slate-400 rounded-full hover:text-orange-500 hover:border-orange-500"
                onClick={() => setIsRightPanelActive(false)}
            >
                Retour à la connexion
            </Button>
          </div>
        </div>

        {/* Sign In Panel */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit} className="form-content">
            <h1 className="text-2xl font-bold mb-8 text-[#0f172a]">Connexion</h1>
            
            <div className="w-full space-y-4">
                <div className="text-left">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Identifiant</Label>
                    <input 
                        type="text" 
                        placeholder="Login" 
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="text-left relative">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Mot de passe</Label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Mot de passe" 
                            className="login-input pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-slate-400 hover:text-orange-500 transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    <div className="text-right mt-1">
                        <a href="#" className="text-[10px] text-slate-400 hover:text-[#f97316] transition-colors font-bold uppercase tracking-widest">Mot de passe oublié ?</a>
                    </div>
                </div>
            </div>

            <button 
                type="submit" 
                className="mt-10 bg-[#f97316] hover:bg-[#ea580c] text-white py-3 px-12 rounded font-bold uppercase tracking-widest shadow-lg shadow-orange-500/20 transition-all"
                disabled={loading}
            >
                {loading ? "Chargement..." : "Se connecter"}
            </button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="text-3xl font-black mb-4">Bienvenue</h1>
              <p className="mb-8 font-medium">Cliquez pour vous connecter à votre espace personnel de gestion.</p>
              <button className="ghost-btn !text-white !border-white hover:bg-white hover:!text-[#0f172a]" onClick={() => setIsRightPanelActive(false)}>Se connecter</button>
            </div>
            <div className="overlay-panel overlay-right bg-[#0f172a]">
              <div className="bg-white p-4 rounded-xl mb-6 shadow-xl">
                <img src="/images/logos/logo_marche_gorgorlou.svg" alt="Gorgorlou" className="w-24" />
              </div>
              <h1 className="text-xl font-bold mb-2">MARCHÉ GORGORLOU</h1>
              <p className="mb-8 text-sm opacity-80">Logiciel d'Archivage et de Gestion Commerciale</p>
              <button className="ghost-btn !text-white !border-white hover:bg-white hover:!text-[#0f172a]" onClick={() => setIsRightPanelActive(true)}>En savoir plus</button>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p className="uppercase tracking-[0.2em] text-[10px]">
          Design by <span className="font-bold">BABACAR DIOP</span> - Copyright © {new Date().getFullYear()}.
        </p>
      </footer>
    </div>
  );
};

export default Login;
