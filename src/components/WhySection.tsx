import { Banknote, Truck, ShieldCheck, MessageCircle } from "lucide-react";

const values = [
  {
    icon: Banknote,
    title: 'Juste Prix "Diayma"',
    desc: "Bénéficiez de tarifs préférentiels, négociés directement avec nos partenaires pour préserver votre budget sans compromis sur la qualité.",
    emoji: "💰",
  },
  {
    icon: Truck,
    title: 'Logistique "Gaw"',
    desc: "Une flotte de livraison réactive qui sillonne Dakar et sa banlieue pour vous servir en un temps record, directement à votre porte.",
    emoji: "🚚",
  },
  {
    icon: ShieldCheck,
    title: 'Rigueur "Woor"',
    desc: "Chaque meuble, chaque volaille et chaque poisson passe par un contrôle qualité strict avant de rejoindre votre foyer.",
    emoji: "🤝",
  },
  {
    icon: MessageCircle,
    title: 'Esprit "Teranga"',
    desc: "Un accompagnement personnalisé et chaleureux. Chez Gorgorlou, vous n'êtes pas un client, mais un membre de la famille.",
    emoji: "💬",
  },
];

const WhySection = () => {
  return (
    <section id="pourquoi-nous" className="py-20 bg-warm-bg">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Pourquoi <span className="text-primary">Gorgorlou</span> ?
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-lg mx-auto">
            Découvrez l'engagement Gorgorlou : l'alliance parfaite entre tradition sénégalaise et excellence opérationnelle.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className={`p-10 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover-card-premium animate-fade-in-up stagger-${(index % 4) + 1}`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                <value.icon size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
