import { MessageCircle } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import heroImg from "@/assets/hero-family.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center radiant-bg wax-pattern overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center py-24 pt-32">
        {/* Text */}
        <div className="space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-body text-sm font-semibold tracking-wide border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            L'excellence à votre portée
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-foreground tracking-tight drop-shadow-sm">
            L'Art du Bien <span className="text-primary italic">Chez Soi</span>,{" "}
            <br />
            Sans de Placer.
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-lg leading-relaxed">
            De la noblesse du bois massif à la fraîcheur des Niayes. Gorgorlou réinvente votre quotidien avec authenticité, qualité et une passion infinie pour le terroir sénégalais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => document.getElementById("nos-univers")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-gorgorlou text-xl"
            >
              🚀 Explorer l'univers
            </button>
            <button 
              onClick={() => window.open(BRAND_CONFIG.whatsappUrl(), "_blank")}
              className="btn-whatsapp text-xl flex items-center justify-center gap-2"
            >
              <MessageCircle size={22} />
              Nous contacter
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-primary/10">
            <div>
              <p className="font-heading font-black text-2xl text-primary">5000+</p>
              <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Clients Satisfaits</p>
            </div>
            <div>
              <p className="font-heading font-black text-2xl text-primary">4.9/5</p>
              <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Note Moyenne</p>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-black text-2xl text-primary">-30%</p>
              <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Prix Direct Producteur</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={heroImg}
              alt="Famille sénégalaise heureuse avec leurs achats Gorgorlou"
              className="w-full h-[400px] lg:h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-xl border border-border/50 animate-float">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚚</span>
              <div>
                <p className="font-heading font-bold text-sm text-foreground">Livraison Express</p>
                <p className="font-body text-xs text-muted-foreground">Partout à Dakar & Banlieue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
