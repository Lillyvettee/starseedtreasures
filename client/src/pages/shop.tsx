import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Flame, BookOpen, Sparkles, Moon, Star } from "lucide-react";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  shopifyUrl: string;
  featured: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "Celestial Guidance Candle",
    description: "Hand-poured soy candle infused with lavender and amethyst crystals. Perfect for meditation and tarot sessions. Burns for 40+ hours.",
    price: 24.99,
    image: "/images/products/celestial-candle.png",
    category: "candles",
    shopifyUrl: "https://starseedtreasures.com/",
    featured: true,
  },
  {
    id: 2,
    name: "Moonlit Intentions Candle",
    description: "A mystical blend of jasmine and sandalwood with moonstone chips. Ideal for new moon rituals and setting intentions.",
    price: 22.99,
    image: "/images/products/moonlit-candle.png",
    category: "candles",
    shopifyUrl: "https://starseedtreasures.com/",
    featured: false,
  },
  {
    id: 3,
    name: "Stardust Ritual Candle",
    description: "Rose quartz-infused candle with notes of vanilla and rose. Opens the heart chakra during readings and spiritual work.",
    price: 26.99,
    image: "/images/products/stardust-candle.png",
    category: "candles",
    shopifyUrl: "https://starseedtreasures.com/",
    featured: false,
  },
  {
    id: 4,
    name: "Whispers of the Stars",
    description: "A collection of 22 cosmic poems, each inspired by a Major Arcana card. Beautifully illustrated with celestial artwork.",
    price: 18.99,
    image: "/images/products/whispers-poems.png",
    category: "poems",
    shopifyUrl: "https://starseedtreasures.com/",
    featured: true,
  },
  {
    id: 5,
    name: "Lunar Love Letters",
    description: "Poetry written under moonlight — 30 pieces exploring love, loss, and cosmic connection. Perfect for the soul-seeker.",
    price: 16.99,
    image: "/images/products/lunar-poems.png",
    category: "poems",
    shopifyUrl: "https://starseedtreasures.com/",
    featured: false,
  },
  {
    id: 6,
    name: "Seeds of Light: Daily Affirmation Cards",
    description: "A deck of 52 affirmation cards with original poetry and cosmic art. Pull one each morning to set your intention.",
    price: 29.99,
    image: "/images/products/affirmation-cards.png",
    category: "poems",
    shopifyUrl: "https://starseedtreasures.com/",
    featured: true,
  },
  {
    id: 7,
    name: "Starseed Major Arcana Deck",
    description: "The full 22-card Major Arcana deck featuring our original cosmic artwork. Premium cardstock with gold foil edges.",
    price: 39.99,
    image: "/images/products/tarot-deck.png",
    category: "tarot",
    shopifyUrl: "https://starseedtreasures.com/",
    featured: true,
  },
  {
    id: 8,
    name: "Crystal Grid Altar Cloth",
    description: "Sacred geometry altar cloth in deep purple velvet. Perfect for tarot layouts, crystal grids, and ritual work.",
    price: 34.99,
    image: "/images/products/altar-cloth.png",
    category: "tarot",
    shopifyUrl: "https://starseedtreasures.com/",
    featured: false,
  },
  {
    id: 9,
    name: "Cosmic Journey Journal",
    description: "A guided journal for tracking tarot readings, dreams, and spiritual insights. Includes prompts and moon phase calendars.",
    price: 21.99,
    image: "/images/products/cosmic-journal.png",
    category: "tarot",
    shopifyUrl: "https://starseedtreasures.com/",
    featured: false,
  },
];

const categories = [
  { value: "all", label: "All Treasures", icon: Sparkles },
  { value: "candles", label: "Candles", icon: Flame },
  { value: "poems", label: "Poetry & Cards", icon: BookOpen },
  { value: "tarot", label: "Tarot & Ritual", icon: Moon },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-3 h-3 text-[#FFD78C]/50 animate-sparkle-pulse" />
            <Moon className="w-4 h-4 text-[#FFD78C]/60 animate-gentle-float" />
            <Star className="w-3 h-3 text-[#FFD78C]/50 animate-sparkle-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          <h1
            className="font-serif text-4xl md:text-5xl font-bold gradient-text mb-4"
            data-testid="text-shop-title"
          >
            The Enchanted Shop
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-2">
            Every item here carries a little piece of magic.
          </p>
          <p className="text-[#C8B4FF]/50 text-sm font-serif italic">
            Candles that glow with intention, poetry that stirs the soul, and tools for your sacred rituals.
          </p>
        </div>

        <div className="divider-stars mb-8">
          <Sparkles className="w-3 h-3 text-[#C8B4FF]/40 animate-sparkle-pulse" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? "default" : "ghost"}
              className={`gap-2 ${activeCategory !== cat.value ? "text-[#F4F6FF]/70" : ""}`}
              onClick={() => setActiveCategory(cat.value)}
              data-testid={`button-category-${cat.value}`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </Button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, index) => (
            <Card
              key={product.id}
              className="group glass-card-shimmer border-[#9D7DFF]/10 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${0.05 * index}s` }}
              data-testid={`card-product-${product.id}`}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  data-testid={`img-product-${product.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F2F]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {product.featured && (
                  <Badge
                    className="absolute top-3 right-3 bg-[#9D7DFF] text-white border-none gap-1"
                    data-testid={`badge-featured-${product.id}`}
                  >
                    <Sparkles className="w-3 h-3" />
                    Enchanted Pick
                  </Badge>
                )}
              </div>
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="font-serif text-lg font-semibold text-foreground leading-tight"
                    data-testid={`text-product-name-${product.id}`}
                  >
                    {product.name}
                  </h3>
                  <span
                    className="text-[#FFD78C] font-bold text-lg whitespace-nowrap"
                    data-testid={`text-product-price-${product.id}`}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {product.description}
                </p>
                <a
                  href={product.shopifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto"
                  data-testid={`link-buy-${product.id}`}
                >
                  <Button className="w-full glow-button gap-2">
                    <Sparkles className="w-4 h-4" />
                    Bring It Home
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Moon className="w-8 h-8 text-[#C8B4FF]/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-lg font-serif italic">The moon is hiding these treasures for now...</p>
          </div>
        )}

        <div className="divider-stars mt-12 mb-6">
          <Moon className="w-4 h-4 text-[#FFD78C]/40 animate-gentle-float" />
        </div>

        <div className="text-center glass-card-shimmer rounded-md p-8 animate-moon-glow">
          <Sparkles className="w-5 h-5 text-[#C8B4FF]/50 mx-auto mb-3 animate-sparkle-pulse" />
          <p className="font-serif text-xl text-foreground/90 mb-3">
            Discover the full constellation of treasures
          </p>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
            Seasonal specials, exclusive bundles, and new arrivals — our Shopify store holds even more magic.
          </p>
          <a
            href="https://starseedtreasures.com/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-shopify-store"
          >
            <Button size="lg" className="glow-button gap-2">
              <ExternalLink className="w-4 h-4" />
              Visit the Full Collection
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
