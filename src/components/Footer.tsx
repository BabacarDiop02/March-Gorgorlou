import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer id="contact" className="footer-section">
      <div className="container mx-auto py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img 
                src="/images/logos/logo_marche_gorgorlou.svg" 
                alt="Marché Gorgorlou" 
                className="h-20 w-auto" 
              />
              <div className="flex flex-col leading-none">
                <span className="font-heading font-black text-sm uppercase tracking-[0.1em] text-white">
                  MARCHÉ
                </span>
                <span className="text-primary font-heading font-black text-2xl uppercase tracking-tighter -mt-1.5">
                  GORGORLOU
                </span>
              </div>
            </div>
            <p className="font-body text-sm opacity-70 leading-relaxed">
              Gorgorlou réinvente l'expérience du marché sénégalais. Un pont entre tradition et modernité pour vous offrir le meilleur du terroir, livré avec le sourire.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-lg">Contact</h4>
            <div className="space-y-3 font-body text-sm opacity-70">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Marché Sandaga, Dakar, Sénégal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{BRAND_CONFIG.formattedPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>contact@gorgorlou.sn</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-lg">Rejoignez la Communauté 🤝</h4>
            <p className="font-body text-sm opacity-70">Soyez le premier informé de nos arrivages et offres exclusives 'Teranga'.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm font-body placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button type="submit" className="btn-gorgorlou px-6 py-3 text-sm">
                OK
              </button>
            </form>
          </div>
        </div>

        {/* Skyline + Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <div className="font-body text-xs opacity-40 mb-4">
            🕌 Monument de la Renaissance • Mosquée de la Divinité • Île de Gorée
          </div>
          <p className="font-body text-xs opacity-40">
            © 2025 Marché Gorgorlou. Tous droits réservés. Fait avec ❤️ à Dakar.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
