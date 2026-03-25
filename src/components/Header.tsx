import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, ArrowLeft, Search, MessageCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { BRAND_CONFIG } from "@/lib/constants";
import SearchOverlay from "./SearchOverlay";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: "Accueil", href: "/" },
    { name: "Nos Univers", href: "/#nos-univers" },
    { name: "Pourquoi Nous", href: "/#why-us" },
    { name: "Contact", href: "/#contact" }
  ];

  const isHomePage = location.pathname === "/";

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#") && isHomePage) {
      const id = href.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-header py-2" : "bg-transparent py-4"
          }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-4 md:gap-8">
          {/* Logo & Back button */}
          <div className="flex items-center gap-2 shrink-0">
            {!isHomePage && (
              <button
                onClick={() => navigate("/")}
                className={`p-2 rounded-full transition-all ${scrolled ? "hover:bg-muted text-foreground" : "hover:bg-white/10 text-white"}`}
                aria-label="Retour"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <img 
                src="/images/logos/logo_marche_gorgorlou.svg" 
                alt="Marché Gorgorlou" 
                className="h-10 sm:h-14 w-auto transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="flex flex-col leading-none">
                <span className={`font-heading font-black text-[10px] sm:text-sm uppercase tracking-[0.1em] transition-colors ${scrolled || isHomePage ? "text-zinc-800" : "text-white"}`}>
                  MARCHÉ
                </span>
                <span className="text-primary font-heading font-black text-sm sm:text-xl uppercase tracking-tighter -mt-0.5">
                  GORGORLOU
                </span>
              </div>
            </Link>
          </div>

          {/* Jumia-style Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-2xl relative group">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div 
              onClick={() => setSearchOpen(true)}
              className="relative w-full flex items-center bg-card/60 backdrop-blur-md border border-primary/10 rounded-full overflow-hidden cursor-text hover:border-primary/40 transition-all p-1 pl-4 group"
            >
              <Search className="text-muted-foreground mr-3" size={16} />
              <span className="text-muted-foreground flex-1 font-body text-sm">Chercher un produit, un univers...</span>
              <button className="bg-primary text-white font-heading font-bold text-[10px] px-4 py-2 rounded-full ml-2 hover:brightness-110 transition-all tracking-wider uppercase shadow-sm">
                RECHERCHER
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button 
              onClick={() => setSearchOpen(true)}
              className={`lg:hidden p-2 rounded-lg transition-all ${(scrolled || isHomePage) ? "hover:bg-muted text-foreground" : "hover:bg-white/10 text-white"}`}
              aria-label="Rechercher"
            >
              <Search size={22} />
            </button>

            <button 
              onClick={() => navigate("/cart")}
              className={`relative p-2 rounded-lg transition-all ${(scrolled || isHomePage) ? "hover:bg-muted" : "hover:bg-white/10"}`} 
              aria-label="Panier"
            >
              <ShoppingCart size={22} className={(scrolled || isHomePage) ? "text-foreground" : "text-white drop-shadow-md"} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              className="hidden md:flex items-center gap-2 bg-primary text-white font-heading font-bold px-4 py-2 rounded-xl hover:scale-105 transition-all shadow-lg"
              onClick={() => window.open(BRAND_CONFIG.whatsappUrl(), "_blank")}
            >
              <MessageCircle size={18} />
              <span className="text-sm">Vendre</span>
            </button>

            <button
              className={`md:hidden p-2 rounded-lg transition-all ${(scrolled || isHomePage) ? "hover:bg-muted" : "hover:bg-white/10"}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} className={(scrolled || isHomePage) ? "text-foreground" : "text-white"} /> : <Menu size={22} className={(scrolled || isHomePage) ? "text-foreground" : "text-white"} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden glass-header border-t border-border/50 animate-fade-in-up">
            <nav className="container mx-auto py-6 flex flex-col gap-4">
              {links.map((link) => (
                isHomePage && link.href.startsWith("/#") ? (
                  <a
                    key={link.name}
                    href={link.href.replace("/", "")}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="font-heading text-lg font-bold text-foreground hover:text-primary transition-colors py-2 flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowLeft className="rotate-180 opacity-0 group-hover:opacity-100 transition-all h-5 w-5" />
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="font-heading text-lg font-bold text-foreground hover:text-primary transition-colors py-2 flex items-center justify-between group"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                    <ArrowLeft className="rotate-180 opacity-0 group-hover:opacity-100 transition-all h-5 w-5" />
                  </Link>
                )
              ))}
            </nav>
          </div>
        )}
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
