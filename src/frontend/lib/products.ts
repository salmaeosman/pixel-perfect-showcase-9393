import coat from "@/frontend/assets/coat.jpg";
import bagAurelia from "@/frontend/assets/bag-aurelia.jpg";
import shoes from "@/frontend/assets/shoes.jpg";
import dress from "@/frontend/assets/dress.jpg";
import knit from "@/frontend/assets/knit.jpg";
import vase from "@/frontend/assets/vase.jpg";
import scarf from "@/frontend/assets/scarf.jpg";
import tote from "@/frontend/assets/tote.jpg";
import loafers from "@/frontend/assets/loafers.jpg";
import editorial from "@/frontend/assets/editorial.jpg";
import linenShirt from "@/frontend/assets/linen-shirt.jpg";
import brassCuff from "@/frontend/assets/brass-cuff.jpg";
import stoneBowl from "@/frontend/assets/stone-bowl.jpg";
import bagAureliaAlt from "@/frontend/assets/bag-aurelia-alt.jpg";
import coatAlt from "@/frontend/assets/coat-alt.jpg";
import shoesAlt from "@/frontend/assets/shoes-alt.jpg";
import dressAlt from "@/frontend/assets/dress-alt.jpg";
import knitAlt from "@/frontend/assets/knit-alt.jpg";
import toteAlt from "@/frontend/assets/tote-alt.jpg";
import loafersAlt from "@/frontend/assets/loafers-alt.jpg";
import scarfAlt from "@/frontend/assets/scarf-alt.jpg";
import bagCamel from "@/frontend/assets/bag-aurelia-camel.png";
import coatIvory from "@/frontend/assets/coat-ivory.png";
import shoesIvory from "@/frontend/assets/shoes-ivory.png";
import dressBurgundy from "@/frontend/assets/dress-burgundy.png";
import knitIvory from "@/frontend/assets/knit-ivory.jpg";
import toteCamel from "@/frontend/assets/tote-camel.png";
import loafersBurgundy from "@/frontend/assets/loafers-burgundy.png";
import scarfIvory from "@/frontend/assets/scarf-ivory.png";
import linenShirtStone from "@/frontend/assets/linen-shirt-stone.jpg";
import vaseAlt from "@/frontend/assets/vase-alt.jpg";
import linenShirtAlt from "@/frontend/assets/linen-shirt-alt.jpg";
import brassCuffAlt from "@/frontend/assets/brass-cuff-alt.jpg";
import stoneBowlAlt from "@/frontend/assets/stone-bowl-alt.jpg";

export type Category = "Women" | "Bags" | "Shoes" | "Accessories" | "Objects";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  image: string;
  hover?: string;
  colorImages?: Record<string, string>;
  description: string;
  materials: string;
  care: string;
  isNew?: boolean;
};

export const CATEGORIES: Category[] = ["Women", "Bags", "Shoes", "Accessories", "Objects"];

const ivoryC = { name: "Ivory", hex: "#F2EDE4" };
const burgundyC = { name: "Burgundy", hex: "#741B2C" };
const camelC = { name: "Camel", hex: "#B08A5E" };
const stoneC = { name: "Stone", hex: "#CFC5B4" };

export const products: Product[] = [
  {
    id: "aurelia-bag",
    name: "The Aurelia Bag",
    category: "Bags",
    price: 2180,
    colors: [burgundyC, camelC],
    sizes: ["One size"],
    image: bagAurelia,
    hover: bagAureliaAlt,
    colorImages: { Camel: bagCamel },
    description:
      "A sculpted top-handle bag in polished calfskin, built around a single continuous panel. Hand-finished edges, brushed brass closure, suede-lined interior.",
    materials: "Polished calfskin, brass hardware, suede lining. Made in Florence.",
    care: "Store in the provided dust bag. Wipe gently with a dry, soft cloth.",
    isNew: true,
  },
  {
    id: "lina-coat",
    name: "Lina Double-Faced Coat",
    category: "Women",
    price: 1640,
    colors: [camelC, ivoryC],
    sizes: ["XS", "S", "M", "L"],
    image: coat,
    hover: coatAlt,
    colorImages: { Ivory: coatIvory },
    description:
      "An unlined double-faced wool coat cut long and narrow, with dropped shoulders and hand-stitched seams throughout.",
    materials: "92% virgin wool, 8% cashmere. Woven in Biella.",
    care: "Dry clean only. Rest on a wide hanger between wears.",
    isNew: true,
  },
  {
    id: "sienna-slingback",
    name: "Sienna Slingback",
    category: "Shoes",
    price: 690,
    colors: [burgundyC, ivoryC],
    sizes: ["36", "37", "38", "39", "40", "41"],
    image: shoes,
    hover: shoesAlt,
    colorImages: { Ivory: shoesIvory },
    description:
      "A low block-heel slingback with an elongated toe, softened by a hand-burnished finish.",
    materials: "Nappa leather upper, leather sole, 45 mm heel.",
    care: "Protect from water. Use shoe trees to preserve the line.",
    isNew: true,
  },
  {
    id: "column-slip-dress",
    name: "Column Silk Slip Dress",
    category: "Women",
    price: 980,
    colors: [ivoryC, burgundyC],
    sizes: ["XS", "S", "M", "L"],
    image: dress,
    hover: dressAlt,
    colorImages: { Burgundy: dressBurgundy },
    description:
      "Cut on the bias from heavy sand-washed silk so the fabric falls without interruption.",
    materials: "100% mulberry silk, 22 momme.",
    care: "Dry clean. Steam lightly to release folds.",
    isNew: true,
  },
  {
    id: "atelier-knit",
    name: "Atelier Cashmere Knit",
    category: "Women",
    price: 540,
    colors: [stoneC, ivoryC],
    sizes: ["XS", "S", "M", "L"],
    image: knit,
    hover: knitAlt,
    colorImages: { Ivory: knitIvory },
    description:
      "A relaxed crewneck knitted in Inner Mongolian cashmere, finished with ribbed cuffs.",
    materials: "100% grade-A cashmere, 12 gauge.",
    care: "Hand wash cold, dry flat. Store folded.",
  },
  {
    id: "carrara-tote",
    name: "Carrara Soft Tote",
    category: "Bags",
    price: 1420,
    colors: [ivoryC, camelC],
    sizes: ["One size"],
    image: tote,
    hover: toteAlt,
    colorImages: { Camel: toteCamel },
    description: "An unstructured day tote in grained leather that softens with wear.",
    materials: "Grained calfskin, cotton canvas lining.",
    care: "Keep away from prolonged sunlight. Condition twice yearly.",
  },
  {
    id: "riva-loafer",
    name: "Riva Leather Loafer",
    category: "Shoes",
    price: 620,
    colors: [camelC, burgundyC],
    sizes: ["36", "37", "38", "39", "40", "41"],
    image: loafers,
    hover: loafersAlt,
    colorImages: { Burgundy: loafersBurgundy },
    description: "A hand-lasted penny loafer on a slim leather sole, made for long walks on stone.",
    materials: "Vegetable-tanned calfskin, blake-stitched leather sole.",
    care: "Brush after wear. Polish with neutral cream.",
  },
  {
    id: "meridian-scarf",
    name: "Meridian Silk Scarf",
    category: "Accessories",
    price: 290,
    colors: [burgundyC, ivoryC],
    sizes: ["90 × 90 cm"],
    image: scarf,
    hover: scarfAlt,
    colorImages: { Ivory: scarfIvory },
    description:
      "A hand-rolled twill square printed in two colours, drawn from archive drapery studies.",
    materials: "100% silk twill, hand-rolled edges. Printed in Como.",
    care: "Dry clean only. Fold along the original creases.",
  },
  {
    id: "olea-vessel",
    name: "Olea Terracotta Vessel",
    category: "Objects",
    price: 340,
    colors: [{ name: "Terracotta", hex: "#B06A4A" }],
    sizes: ["H 42 cm"],
    image: vase,
    hover: vaseAlt,
    description:
      "A wheel-thrown vessel from a family workshop in Puglia, each one lightly irregular.",
    materials: "Unglazed terracotta, hand-thrown.",
    care: "Use a liner for fresh flowers. Wipe with a dry cloth.",
  },
  {
    id: "linen-shirt",
    name: "Sirocco Linen Shirt",
    category: "Women",
    price: 420,
    colors: [ivoryC, stoneC],
    sizes: ["XS", "S", "M", "L"],
    image: linenShirt,
    hover: linenShirtAlt,
    colorImages: { Stone: linenShirtStone },
    description:
      "An oversized shirt in washed linen with a soft collar and mother-of-pearl buttons.",
    materials: "100% European linen, garment washed.",
    care: "Machine wash cold. Line dry; creases are intended.",
  },
  {
    id: "brass-cuff",
    name: "Sculpted Brass Cuff",
    category: "Accessories",
    price: 260,
    colors: [{ name: "Brass", hex: "#B08A5E" }],
    sizes: ["S/M", "M/L"],
    image: brassCuff,
    hover: brassCuffAlt,
    description: "A weighty open cuff, hand-forged and brushed to a low sheen.",
    materials: "Solid brass, hand-forged.",
    care: "Patina develops naturally. Polish to restore shine.",
  },
  {
    id: "stone-bowl",
    name: "Travertine Bowl",
    category: "Objects",
    price: 410,
    colors: [{ name: "Travertine", hex: "#D9CDBA" }],
    sizes: ["Ø 28 cm"],
    image: stoneBowl,
    hover: stoneBowlAlt,
    description: "Turned from a single block of Italian travertine, left unfilled and honed.",
    materials: "Solid travertine, honed finish.",
    care: "Seal annually. Avoid acidic liquids.",
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const getProductImages = (product: Product, color: string) => {
  const selected = product.colorImages?.[color];
  return selected ? [selected] : product.hover ? [product.image, product.hover] : [product.image];
};

export const journal = [
  {
    id: "atelier",
    title: "Inside the Atelier",
    excerpt: "Three generations of leatherwork, measured in millimetres and mornings.",
    date: "March 2026",
    image: "atelier",
  },
  {
    id: "light",
    title: "A Study in Southern Light",
    excerpt: "Why our spring palette begins with limewash walls at four in the afternoon.",
    date: "February 2026",
    image: "editorial",
  },
  {
    id: "material",
    title: "On Material Honesty",
    excerpt: "The case for unlined wool, unglazed clay, and edges left visible.",
    date: "January 2026",
    image: "vase",
  },
];
