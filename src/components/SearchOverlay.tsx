import { useState, useEffect, useRef } from "react";
import { Search, X, MessageCircle, ArrowRight, TrendingUp, History } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { universDetails } from "@/lib/universData";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ type: 'univers' | 'product', id: string, name: string, category: string, image: string }[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (val.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchResults: any[] = [];
    const lowerVal = val.toLowerCase();

    // Search in Univers/Categories
    Object.entries(universDetails).forEach(([key, data]) => {
      if (data.title.toLowerCase().includes(lowerVal)) {
        searchResults.push({
          type: 'univers',
          id: key,
          name: data.title,
          category: 'Catégorie',
          image: data.img
        });
      }

      // Search in featured products
      data.featuredProducts.forEach(product => {
        if (product.name.toLowerCase().includes(lowerVal)) {
          searchResults.push({
            type: 'product',
            id: key,
            name: product.name,
            category: data.title,
            image: product.image
          });
        }
      });
    });

    setResults(searchResults.slice(0, 8));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl animate-fade-in">
      <div className="container mx-auto max-w-4xl pt-10 md:pt-20 px-4">
        {/* Header Search Bar */}
        <div className="relative w-full max-w-2xl mx-auto flex items-center gap-3 animate-fade-in-up">
          <div className="flex-1 relative flex items-center bg-white dark:bg-zinc-950 border-2 border-primary/10 rounded-full shadow-2xl focus-within:border-primary/40 focus-within:shadow-primary/10 transition-all p-1 pl-5 group">
            <Search className="text-muted-foreground group-focus-within:text-primary transition-colors shrink-0" size={18} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Chercher un meuble, du poulet, un cadeau..."
              className="flex-1 bg-transparent border-none outline-none font-body text-base md:text-lg px-3 py-2 text-foreground placeholder:text-muted-foreground/40"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') onClose();
              }}
            />
            {query && (
              <button 
                onClick={() => setQuery("")} 
                className="p-2 hover:bg-muted rounded-full transition-colors mr-2 shrink-0"
                aria-label="Effacer la recherche"
              >
                <X size={16} className="text-muted-foreground" />
              </button>
            )}
            <button className="bg-primary text-white font-heading font-black px-6 py-2.5 rounded-full hover:brightness-110 active:scale-95 transition-all hidden sm:block text-xs uppercase tracking-widest shadow-lg shadow-primary/20">
              RECHERCHER
            </button>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-full transition-all shrink-0 group"
            aria-label="Fermer"
          >
            <X size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="mt-12 animate-fade-in-up">
          {query.trim().length < 2 ? (
            <div className="grid md:grid-cols-2 gap-12">
              {/* Popular Categories */}
              <div>
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold mb-6 text-foreground/60 uppercase tracking-widest">
                  <TrendingUp size={18} /> Univers Populaires
                </h3>
                <div className="space-y-4">
                  {Object.entries(universDetails).slice(0, 4).map(([key, data]) => (
                    <button
                      key={key}
                      onClick={() => {
                        navigate(`/univers/${key}`);
                        onClose();
                      }}
                      className="flex items-center gap-4 w-full p-3 rounded-2xl hover:bg-primary/5 transition-all text-left group"
                    >
                      <img src={data.img} className="w-14 h-14 rounded-xl object-cover shadow-md group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="font-heading font-bold text-lg">{data.title}</p>
                        <p className="text-sm text-muted-foreground">{data.subtitle.slice(0, 40)}...</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent / Suggested */}
              <div>
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold mb-6 text-foreground/60 uppercase tracking-widest">
                  <History size={18} /> Recherché récemment
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Poulet de chair', 'Meuble TV', 'Panier Ramadan', 'Huile de Palme', 'Bois de Teck'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => handleSearch(tag)}
                      className="px-5 py-3 rounded-full bg-muted hover:bg-primary hover:text-white transition-all text-sm font-medium"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-heading text-2xl font-black">Résultats pour "{query}"</h3>
                <span className="text-sm text-muted-foreground">{results.length} résultats trouvés</span>
              </div>
              
              {results.length > 0 ? (
                <div className="grid gap-4">
                  {results.map((res, i) => (
                    <button
                      key={`${res.id}-${i}`}
                      onClick={() => {
                        navigate(`/univers/${res.id}`);
                        onClose();
                      }}
                      className="flex items-center gap-6 p-4 rounded-3xl hover:bg-primary/5 transition-all text-left group border border-transparent hover:border-primary/10 shadow-sm hover:shadow-xl"
                    >
                      <img src={res.image} className="w-20 h-20 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform" />
                      <div className="flex-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-md mb-2 inline-block">
                          {res.category}
                        </span>
                        <p className="font-heading font-bold text-xl">{res.name}</p>
                      </div>
                      <ArrowRight className="text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-muted/30 rounded-[3rem]">
                  <p className="text-4xl mb-4">🔍</p>
                  <p className="font-heading text-xl font-bold">Aucun résultat trouvé</p>
                  <p className="text-muted-foreground">Essayez d'autres mots-clés ou parcourez nos univers.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
