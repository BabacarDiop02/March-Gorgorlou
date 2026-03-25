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
    title: "Art de Vivre & Mobilier Noble",
    subtitle: "Le bois massif, l'âme de votre foyer pour l'éternité.",
    description: "Plongez dans l'univers de l'ébénisterie d'exception. Nos créations en bois massif ne sont pas de simples meubles, mais des héritages façonnés par les mains expertes d'artisans locaux. De l'ébène profond au teck chaleureux, chaque essence est choisie pour sa noblesse et sa capacité à raconter une histoire unique dans votre intérieur.",
    img: catMaison,
    subcategories: [
      {
        name: "Salons d'Apparat",
        description: "L'élégance du bois sculpté rencontre le confort moderne. Nos canapés, fauteuils et tables basses sont de véritables chefs-d'œuvre conçus pour sublimer vos moments de partage.",
        image: salon,
      },
      {
        name: "Suites Parentales",
        description: "Créez un sanctuaire de sérénité avec nos lits et commodes en bois massif. Une solidité à toute épreuve pour un repos bercé par la chaleur des matériaux naturels.",
        image: chambre,
      },
      {
        name: "Espaces Bureau Prestige",
        description: "Stimulez votre créativité dans un environnement raffiné. Nos bureaux allient fonctionnalité contemporaine et noblesse du bois pour une productivité tout en élégance.",
        image: bureau,
      },
      {
        name: "Curiosités & Déco",
        description: "Le détail qui change tout : miroirs artisanaux, luminaires design et objets d'art pour insuffler une âme authentique à chaque recoin de votre demeure.",
        image: decoration,
      },
    ],
    featuredProducts: [
      { id: "m1", name: "Lit Royal en Teck Massif", price: "285.000 FCFA", image: catMaison },
      { id: "m2", name: "Table Basse 'Gorgorlou' Sculptée", price: "85.000 FCFA", image: salon },
      { id: "m3", name: "Buffet Vintage en Acajou", price: "195.000 FCFA", image: catMaison },
      { id: "m4", name: "Fauteuil Club Cuir & Bois", price: "120.000 FCFA", image: salon },
      { id: "m5", name: "Console d'Entrée 'Baol'", price: "65.000 FCFA", image: decoration },
      { id: "m6", name: "Armoire Prestige 4 Portes", price: "450.000 FCFA", image: chambre },
    ]
  },
  fetes: {
    id: "fetes",
    title: "Cérémonies & Réceptions d'Excellence",
    subtitle: "Sublimez vos baptêmes, mariages et moments d'exception.",
    description: "Parce que chaque célébration est unique, nous avons réuni le meilleur de l'art de la table. De l'élégance intemporelle de la porcelaine à l'aspect pratique de nos gammes jetables premium, offrez à vos invités une expérience gravée dans les mémoires.",
    img: catFetes,
    subcategories: [
      {
        name: "Arts de la Table",
        description: "Services en porcelaine fine, couverts dorés et verrerie de prestige. L'éclat indispensable pour vos tables d'honneur et banquets.",
        image: catFetes,
      },
      {
        name: "Cristallerie & Éclat",
        description: "Une sélection de verres à vin, flûtes et carafes en cristal soufflé. La transparence et le son du luxe pour célébrer vos plus belles victoires.",
        image: catFetes,
      },
      {
        name: "Linges de Table",
        description: "Nappes brodées à la main, chemins de table en soie et serviettes assorties. Une palette de textures et de couleurs pour habiller vos envies.",
        image: catFetes,
      },
      {
        name: "Scénographie de Fête",
        description: "Transformez vos lieux de réception. Compositions florales, arches de ballons et décorations thématiques pour une ambiance magique.",
        image: catFetes,
      },
    ],
    featuredProducts: [
      { id: "f1", name: "Service de Table Luxe (24 pers)", price: "45.000 FCFA", image: catFetes },
      { id: "f2", name: "Pack Réception Jetable Chic", price: "7.500 FCFA", image: catFetes },
      { id: "f3", name: "Nappe Broderie Saint-Louis", price: "25.000 FCFA", image: catFetes },
      { id: "f4", name: "Flûtes à Cristal (Set de 6)", price: "18.000 FCFA", image: catFetes },
      { id: "f5", name: "Chandelier Doré 5 Branches", price: "15.000 FCFA", image: catFetes },
      { id: "f6", name: "Fontaine à Jus en Cristal", price: "22.500 FCFA", image: catFetes },
    ]
  },
  volaille: {
    id: "volaille",
    title: "La Ferme aux Mille Saveurs",
    subtitle: "La fraîcheur absolue, de nos pâturages à votre assiette.",
    description: "Redécouvrez le goût vrai du terroir. Nos volailles sont élevées en plein air avec une alimentation 100% naturelle dans les fermes les plus réputées du pays. Chaque produit est sélectionné pour son fondant et sa saveur incomparable, pour des repas sains et gourmands en famille.",
    img: catVolaille,
    subcategories: [
      {
        name: "Volailles Fermières",
        description: "Poulets de chair, poulets bicyclettes et poules pondeuses, élevés sans aucun additif. Une texture ferme et un goût authentique.",
        image: catVolaille,
      },
      {
        name: "Découpes & Marinades",
        description: "Gagnez du temps avec nos filets de poulet, ailerons et cuisses, déjà marinés selon une recette secrète aux épices du terroir.",
        image: catVolaille,
      },
      {
        name: "L'Atelier des Œufs",
        description: "Des œufs extra-frais ramassés à l'aube. Parfaits pour vos pâtisseries ou un petit-déjeuner plein d'énergie.",
        image: catVolaille,
      },
      {
        name: "Spécialités de Fête",
        description: "Dindes, pintades et pièces de choix pour vos grands événements. La promesse d'un festin réussi.",
        image: catVolaille,
      },
    ],
    featuredProducts: [
      { id: "v1", name: "Poulet Fermier Label Rouge", price: "4.200 FCFA", image: catVolaille },
      { id: "v2", name: "Plateau d'Œufs Frais (x30)", price: "3.200 FCFA", image: catVolaille },
      { id: "v3", name: "Filets Marines au Piment Vert", price: "3.500 FCFA", image: catVolaille },
      { id: "v4", name: "Dinde Entière (Sur Commande)", price: "22.000 FCFA", image: catVolaille },
      { id: "v5", name: "Pintade de Casamance", price: "6.500 FCFA", image: catVolaille },
      { id: "v6", name: "Cuisse de Poulet (le kg)", price: "3.800 FCFA", image: catVolaille },
    ]
  },
  marche: {
    id: "marche",
    title: "Le Grand Marché Fraîcheur",
    subtitle: "Le meilleur de l'océan et des terres fertiles du Sénégal.",
    description: "Le cœur battant du Sénégal s'invite chez vous. Nous sélectionnons chaque jour le meilleur des débarcadères de Soumbédioune et des potagers des Niayes. Une promesse de couleurs, d'odeurs et surtout de vitamines pour une cuisine éclatante de santé.",
    img: catMarche,
    subcategories: [
      {
        name: "Trésors de l'Atlantique",
        description: "Thiof, Capitaine, Dorade royale... Des poissons d'une fraîcheur absolue, pêchés de manière artisanale et livrés dans le respect de la chaîne du froid.",
        image: catMarche,
      },
      {
        name: "Crustacés d'Exception",
        description: "Crevettes Gambas royales, langoustes et homards. Le luxe de la mer pour vos tables les plus raffinées.",
        image: catMarche,
      },
      {
        name: "Potager des Niayes",
        description: "Légumes croquants cueillis à maturité : tomates juteuses, oignons savoureux et poivrons colorés. Directement du producteur au consommateur.",
        image: catMarche,
      },
      {
        name: "Verger Tropical",
        description: "Mangues charnues, papayes sucrées et pastèques désaltérantes. Le soleil du Sénégal dans chaque bouchée.",
        image: catMarche,
      },
    ],
    featuredProducts: [
      { id: "ma1", name: "Thiof de Ligne (le kg)", price: "5.500 FCFA", image: catMarche },
      { id: "ma2", name: "Panier Maraîcher Bio (7kg)", price: "6.500 FCFA", image: catMarche },
      { id: "ma3", name: "Gambas XXL Fraîches", price: "12.500 FCFA", image: catMarche },
      { id: "ma4", name: "Lot de Mangues Kent (x5)", price: "3.000 FCFA", image: catMarche },
      { id: "ma5", name: "Dorade Royale (le kg)", price: "4.800 FCFA", image: catMarche },
      { id: "ma6", name: "Sac d'Oignon local (25kg)", price: "14.500 FCFA", image: catMarche },
    ]
  }
};
