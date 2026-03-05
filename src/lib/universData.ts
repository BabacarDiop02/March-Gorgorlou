import catMaison from "@/assets/meuble.jpeg";
import catFetes from "@/assets/cat-fetes.jpg";
import catVolaille from "@/assets/cat-volaille.jpg";
import catMarche from "@/assets/cat-marche.jpg";
import salon from "@/assets/salon.jpeg";
import chambre from "@/assets/une_chamb.jpeg";
import bureau from "@/assets/bureau.jpeg";
import decoration from "@/assets/deco.jpeg";

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

export interface Subcategory {
  name: string;
  description: string;
  image: string;
}

export interface UniverseData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  img: string;
  subcategories: Subcategory[];
  featuredProducts: Product[];
}

export const universDetails: Record<string, UniverseData> = {
  maison: {
    id: "maison",
    title: "Ameublement & Confort",
    subtitle: "Le bois massif pour durer une vie.",
    description: "Découvrez notre collection exclusive de meubles en bois massif, conçus par des artisans locaux passionnés. De l'ébène au teck, nous sélectionnons les meilleures essences pour vous offrir des pièces uniques qui traversent les générations.",
    img: catMaison,
    subcategories: [
      {
        name: "Salons",
        description: "Des canapés, fauteuils et tables basses sculptés dans les plus belles essences de bois massif. Chaque pièce est unique, pensée pour un confort optimal et une élégance durable.",
        image: salon,
      },
      {
        name: "Chambres à coucher",
        description: "Lits, armoires et commodes réalisés à la main par nos artisans. Le bois massif garantit solidité et chaleur, pour un espace de repos qui vous ressemble.",
        image: chambre,
      },
      {
        name: "Bureaux",
        description: "Des espaces de travail raffinés et fonctionnels, alliant bois noble et design contemporain. Productivité et élégance au quotidien.",
        image: bureau,
      },
      {
        name: "Décoration d'intérieur",
        description: "Miroirs, étagères, objets décoratifs et luminaires artisanaux pour habiller vos espaces avec authenticité et singularité.",
        image: decoration,
      },
    ],
    featuredProducts: [
      { id: "m1", name: "Lit en Teck Massif", price: "250.000 FCFA", image: catMaison },
      { id: "m2", name: "Table Basse Sculptée", price: "75.000 FCFA", image: catMaison },
      { id: "m3", name: "Buffet Vintage", price: "180.000 FCFA", image: catMaison },
    ]
  },
  fetes: {
    id: "fetes",
    title: "Art de la Table & Jetable",
    subtitle: "Pour vos baptêmes et cérémonies.",
    description: "Tout ce dont vous avez besoin pour des événements mémorables. De la vaisselle élégante aux articles jetables pratiques, nous accompagnons vos moments de joie avec style et efficacité.",
    img: catFetes,
    subcategories: [
      {
        name: "Assiettes & Couverts",
        description: "Sets de vaisselle haut de gamme pour vos tables d'honneur. Assiettes en porcelaine, couverts dorés et sets complets pour impressionner vos invités.",
        image: catFetes,
      },
      {
        name: "Verres & Cristal",
        description: "Verres à vin, flûtes à champagne et services à eau en cristal soufflé. Élégance et raffinement pour chaque cérémonie.",
        image: catFetes,
      },
      {
        name: "Nappage",
        description: "Nappes brodées, chemin de table et serviettes assorties pour habiller vos tables avec classe. Large choix de coloris pour s'adapter à votre thème.",
        image: catFetes,
      },
      {
        name: "Décoration de fête",
        description: "Ballons, centres de table, guirlandes et compositions florales pour transformer votre salle en un lieu de fête inoubliable.",
        image: catFetes,
      },
    ],
    featuredProducts: [
      { id: "f1", name: "Set de 24 Assiettes Luxe", price: "15.000 FCFA", image: catFetes },
      { id: "f2", name: "Gobelets Jetables (x100)", price: "2.500 FCFA", image: catFetes },
      { id: "f3", name: "Nappe Brodée", price: "10.000 FCFA", image: catFetes },
    ]
  },
  volaille: {
    id: "volaille",
    title: "Volaille & Dérivés",
    subtitle: "Poulets marinés et œufs frais.",
    description: "La fraîcheur est notre priorité. Nos volailles sont élevées en plein air dans des fermes locales rigoureusement sélectionnées. Profitez de nos découpes prêtes à cuire et de nos œufs ramassés le matin même.",
    img: catVolaille,
    subcategories: [
      {
        name: "Poulets Entiers",
        description: "Poulets de chair et poulets fermiers entiers, élevés sans hormones. Disponibles vivants, abattus ou prêts à cuire selon votre préférence.",
        image: catVolaille,
      },
      {
        name: "Filets & Ailerons",
        description: "Découpes fraîches réalisées le matin même : filets de poulet, blancs, ailerons et cuisses marinés avec nos épices maison pour un goût incomparable.",
        image: catVolaille,
      },
      {
        name: "Œufs de Ferme",
        description: "Œufs ramassés quotidiennement dans nos fermes partenaires. Calibre moyen à gros, coquille dorée et jaune intense pour des préparations savoureuses.",
        image: catVolaille,
      },
      {
        name: "Volailles Marinées",
        description: "Poulets entiers ou en morceaux marinés dans un mélange d'épices sénégalaises traditionnelles. Prêts à griller ou à rôtir pour vos événements.",
        image: catVolaille,
      },
    ],
    featuredProducts: [
      { id: "v1", name: "Poulet de Chair (1.5kg)", price: "3.500 FCFA", image: catVolaille },
      { id: "v2", name: "Plateau d'œufs (x30)", price: "3.000 FCFA", image: catVolaille },
      { id: "v3", name: "Ailes de Poulet (1kg)", price: "2.800 FCFA", image: catVolaille },
    ]
  },
  marche: {
    id: "marche",
    title: "Mer & Maraîcher",
    subtitle: "Thiof, Capitaine et légumes du jour.",
    description: "Le meilleur du marché sénégalais à votre porte. Nos poissons sont pêchés la nuit même et nos légumes proviennent directement des Niayes pour une fraîcheur et une saveur incomparables.",
    img: catMarche,
    subcategories: [
      {
        name: "Poissons Frais",
        description: "Thiof, Capitaine, Carpe et Dorade pêchés chaque nuit et livrés à l'aube. Entiers, vidés ou en filets selon votre besoin, avec une fraîcheur garantie.",
        image: catMarche,
      },
      {
        name: "Crustacés & Mollusques",
        description: "Crevettes gambas, langoustes, homards et huîtres sélectionnés avec soin. Idéaux pour vos repas de fête ou vos restaurants.",
        image: catMarche,
      },
      {
        name: "Légumes de Saison",
        description: "Tomates, oignons, poivrons, carottes et bien plus encore, récoltés aux premières lueurs du jour dans les Niayes. Saveurs naturelles et vitamines préservées.",
        image: catMarche,
      },
      {
        name: "Fruits Exotiques",
        description: "Mangues, papayes, pastèques, oranges et fruits de saison sélectionnés à maturité optimale. Douceur et fraîcheur garanties à chaque livraison.",
        image: catMarche,
      },
    ],
    featuredProducts: [
      { id: "ma1", name: "Thiof Frais (le kg)", price: "4.500 FCFA", image: catMarche },
      { id: "ma2", name: "Panier de Légumes (5kg)", price: "5.000 FCFA", image: catMarche },
      { id: "ma3", name: "Crevettes Gambas", price: "8.500 FCFA", image: catMarche },
    ]
  }
};
