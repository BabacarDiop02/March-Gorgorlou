import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

const BentoGrid = () => {
  const navigate = useNavigate();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/categories");
      return response.data;
    },
  });

  if (isLoading) return <div className="py-20 text-center font-heading font-bold text-2xl animate-pulse">Chargement des univers...</div>;

  return (
    <section id="nos-univers" className="py-20 wax-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading text-4xl sm:text-6xl font-black text-foreground mb-4 tracking-tighter">
            Nos <span className="text-primary">Univers</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Explorez nos univers thématiques, où chaque produit est choisi pour son excellence et son authenticité.
          </p>
        </div>

        {/* Desktop: asymmetric 3-col / 2-row grid */}
        <div
          className="hidden md:grid gap-6 h-[720px]"
          style={{
            gridTemplateColumns: "1.2fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gridTemplateAreas: `"maison fetes" "volaille marche"`,
          }}
        >
          {categories.map((cat, index) => (
            <Link
              key={cat.title}
              to={`/univers/${cat.gridArea}`}
              className={`group relative overflow-hidden rounded-[2.5rem] hover-card-premium animate-fade-in-up stagger-${(index % 4) + 1}`}
              style={{ gridArea: cat.gridArea }}
            >
              {/* Image */}
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                <img
                  src={cat.img.startsWith('/') ? `http://localhost:5000${cat.img}` : cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Arrow icon */}
              <div className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>

              {/* Badge */}
              <div className="absolute top-6 left-6 z-10 transition-transform duration-500 group-hover:translate-x-2">
                <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-heading text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                  {cat.badge}
                </span>
              </div>

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-10">
                <h3 className="font-heading text-3xl sm:text-4xl font-black text-white leading-tight mb-2 drop-shadow-2xl">
                  {cat.title}
                </h3>
                <p className="font-body text-lg text-white/80 group-hover:text-white transition-colors line-clamp-2 max-w-sm">
                  {cat.subtitle}
                </p>
                <div className="mt-6 flex items-center gap-2 font-heading font-bold text-sm text-primary group-hover:gap-4 transition-all opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0">
                  Découvrir l'univers <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: single column stack */}
        <div className="md:hidden flex flex-col gap-6">
          {categories.map((cat, index) => (
            <Link
              key={cat.title}
              to={`/univers/${cat.gridArea}`}
              className={`group relative overflow-hidden rounded-[2rem] h-[360px] animate-fade-in-up stagger-${(index % 4) + 1} hover-card-premium`}
            >
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                <img
                  src={cat.img.startsWith('/') ? `http://localhost:5000${cat.img}` : cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-heading text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {cat.badge}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
                <h3 className="font-heading text-2xl font-black text-white mb-2">
                  {cat.title}
                </h3>
                <p className="font-body text-sm text-white/80 line-clamp-2">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

  );
};

export default BentoGrid;
