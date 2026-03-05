import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import catMaison from "@/assets/cat-maison.jpg";
import catFetes from "@/assets/cat-fetes.jpg";
import catVolaille from "@/assets/cat-volaille.jpg";
import catMarche from "@/assets/cat-marche.jpg";

const categories = [
  {
    title: "Ameublement & Confort",
    subtitle: "Le bois massif pour durer une vie.",
    badge: "Arrivages",
    img: catMaison,
    gridArea: "maison",
  },
  {
    title: "Art de la Table & Jetable",
    subtitle: "Pour vos baptêmes et cérémonies.",
    badge: "Promos",
    img: catFetes,
    gridArea: "fetes",
  },
  {
    title: "Volaille & Dérivés",
    subtitle: "Poulets marinés et œufs frais.",
    badge: "Frais du jour",
    img: catVolaille,
    gridArea: "volaille",
  },
  {
    title: "Mer & Maraîcher",
    subtitle: "Thiof, Capitaine et légumes du jour.",
    badge: "Arrivages",
    img: catMarche,
    gridArea: "marche",
  },
];

const BentoGrid = () => {
  const navigate = useNavigate();

  return (
    <section id="nos-univers" className="py-20 wax-pattern">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Nos <span className="text-primary">Univers</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-md mx-auto">
            Tout ce dont votre maison a besoin, en un seul endroit.
          </p>
        </div>

        {/* Desktop: asymmetric 3-col / 2-row grid */}
        <div
          className="hidden md:grid gap-4 h-[640px]"
          style={{
            gridTemplateColumns: "2fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gridTemplateAreas: `"maison fetes" "volaille marche"`,
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
              style={{ gridArea: cat.gridArea }}
              onClick={() => navigate(`/univers/${cat.gridArea}`)}
            >
              {/* Image */}
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Arrow icon */}
              <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center transition-colors duration-300 group-hover:bg-primary">
                <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-accent text-accent-foreground font-heading text-xs font-bold px-3 py-1 rounded-full">
                  {cat.badge}
                </span>
              </div>

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-primary-foreground drop-shadow-lg">
                  {cat.title}
                </h3>
                <p className="font-body text-sm text-primary-foreground/80 mt-1 drop-shadow">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single column stack */}
        <div className="md:hidden flex flex-col gap-4">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group relative overflow-hidden rounded-3xl cursor-pointer h-56"
              onClick={() => navigate(`/univers/${cat.gridArea}`)}
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
              </div>

              <div className="absolute top-3 left-3 z-10">
                <span className="bg-accent text-accent-foreground font-heading text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {cat.badge}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                <h3 className="font-heading text-base font-bold text-primary-foreground drop-shadow-lg">
                  {cat.title}
                </h3>
                <p className="font-body text-xs text-primary-foreground/80 mt-0.5 drop-shadow">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
