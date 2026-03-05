import { ArrowRight, ShieldCheck } from "lucide-react";
import safetyHelmet from "@/assets/safety-helmet.jpg";
import safetyBoots from "@/assets/safety-boots.jpg";
import safetyGloves from "@/assets/safety-gloves.jpg";

const products = [
  {
    img: safetyHelmet,
    title: "Casques & Gilets",
    tagline: "Soyez vus, soyez protégés.",
    action: "Voir les modèles",
  },
  {
    img: safetyBoots,
    title: "Chaussures Renforcées",
    tagline: "Semelles anti-perforation & bouts coqués.",
    action: "Voir les pointures",
  },
  {
    img: safetyGloves,
    title: "Gants & Accessoires",
    tagline: "Mains et yeux à l'abri du danger.",
    action: "Tout l'outillage",
  },
];

const SafetySection = () => {
  return (
    <section className="relative py-20 bg-[hsl(220_14%_96%)] overflow-hidden">
      {/* Hazard stripe pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            hsl(var(--accent)),
            hsl(var(--accent)) 10px,
            transparent 10px,
            transparent 20px
          )`,
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Sécurité & <span className="text-primary">Chantier</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-lg mx-auto">
            Casques, gilets, chaussures. L'équipement des bâtisseurs, aux normes internationales.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div
              key={p.title}
              className="group relative bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </div>

              {/* CE badge */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 border border-border/50">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span className="font-heading text-[10px] font-bold text-foreground/80 tracking-wide">
                  NORME CE
                </span>
              </div>

              {/* Image */}
              <div className="h-56 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  {p.tagline}
                </p>
                <button className="inline-flex items-center gap-1.5 font-heading text-sm font-bold text-primary transition-colors hover:text-primary/80">
                  {p.action}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
