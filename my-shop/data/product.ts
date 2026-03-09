import { Product } from "../types/product";

const products: Product[] = [
  {
    id: "1",
    name: "Paracétamol 500 mg",
    price: 2.99,
    description:
      "Médicament utilisé pour soulager la douleur légère à modérée et réduire la fièvre.",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    category: "Antidouleur",
  },
  {
    id: "2",
    name: "Vitamine C 1000 mg",
    price: 8.5,
    description:
      "Complément vitaminé pour soutenir le système immunitaire et réduire la fatigue.",
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    category: "Compléments",
  },
  {
    id: "3",
    name: "Gel Hydroalcoolique",
    price: 3.75,
    description: "Solution antiseptique pour l’hygiène des mains sans rinçage.",
    image:
      "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    category: "Hygiène",
  },
  {
    id: "4",
    name: "Thermomètre Digital",
    price: 12.9,
    description:
      "Thermomètre électronique précis et rapide pour mesurer la température corporelle.",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
    inStock: false,
    category: "Matériel médical",
  },
  {
    id: "5",
    name: "Sirop contre la toux",
    price: 6.2,
    description:
      "Sirop apaisant pour calmer la toux et soulager les irritations de la gorge.",
    image:
      "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    category: "ORL",
  },
  {
    id: "6",
    name: "Pansements stériles",
    price: 4.4,
    description:
      "Boîte de pansements stériles pour protéger les petites plaies du quotidien.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    category: "Premiers secours",
  },
];

export default products;
