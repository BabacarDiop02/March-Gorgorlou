import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Fatou Diop",
    quartier: "Mermoz",
    text: "Enfin un endroit où je trouve mon matelas et mon poulet pour la fête sans courir partout !",
    avatar: "👩🏾",
  },
  {
    name: "Ibrahima Ndiaye",
    quartier: "Parcelles Assainies",
    text: "La livraison est vraiment rapide. J'ai commandé un lit le matin, il était là le soir même. Top !",
    avatar: "👨🏾",
  },
  {
    name: "Aminata Fall",
    quartier: "Almadies",
    text: "Les prix sont imbattables et la qualité est au rendez-vous. Je recommande à toutes mes copines !",
    avatar: "👩🏾‍🦱",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 wax-pattern">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Les Dakarois nous font <span className="text-primary">confiance</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card flex flex-col gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="font-body text-foreground/80 text-sm leading-relaxed italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                <span className="text-2xl">{t.avatar}</span>
                <div>
                  <p className="font-heading text-sm font-bold text-foreground">{t.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{t.quartier}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
