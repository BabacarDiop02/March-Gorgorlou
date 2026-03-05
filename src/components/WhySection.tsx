import { Banknote, Truck, ShieldCheck, MessageCircle } from "lucide-react";

const values = [
  {
    icon: Banknote,
    title: 'Prix "Diayma"',
    desc: "Des prix cassés et négociés pour votre budget familial.",
    emoji: "💰",
  },
  {
    icon: Truck,
    title: 'Livraison "Gaw"',
    desc: "Rapide et fiable, partout à Dakar et banlieue.",
    emoji: "🚚",
  },
  {
    icon: ShieldCheck,
    title: 'Qualité "Woor"',
    desc: "Produits vérifiés et sélectionnés avec soin.",
    emoji: "🤝",
  },
  {
    icon: MessageCircle,
    title: 'Service "Teranga"',
    desc: "Un support client chaleureux à votre écoute.",
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
          <p className="font-body text-muted-foreground text-lg max-w-md mx-auto">
            Quatre raisons de nous faire confiance au quotidien.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="value-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{v.emoji}</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{v.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
