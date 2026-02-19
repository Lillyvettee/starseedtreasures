import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Calendar, ShoppingBag, ArrowRight, Moon, Star } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Tarot Readings",
    description: "Book a personal reading with our gifted cosmic guide. Single cards, three-card spreads, or the grand Celtic Cross — choose the journey that calls to you.",
    link: "/reading",
    cta: "See Reading Options",
  },
  {
    icon: ShoppingBag,
    title: "The Enchanted Shop",
    description: "Crystal-charged candles, dreamy poetry, hand-painted tarot decks, and ritual tools — each one kissed by starlight.",
    link: "/shop",
    cta: "Wander the Shop",
  },
  {
    icon: Calendar,
    title: "Live Mystical Sessions",
    description: "Sit with our gifted cosmic guide for a one-on-one reading. Intimate, transformative, and a little bit magical.",
    link: "/book",
    cta: "Reserve Your Spot",
  },
];

function MoonDivider() {
  return (
    <div className="divider-stars">
      <Star className="w-3 h-3 text-[#FFD78C]/50 animate-sparkle-pulse" />
      <Moon className="w-4 h-4 text-[#FFD78C]/60 animate-gentle-float" />
      <Star className="w-3 h-3 text-[#FFD78C]/50 animate-sparkle-pulse" style={{ animationDelay: "0.5s" }} />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <section className="relative pt-32 pb-20 px-4 overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card-shimmer mb-8 animate-fade-in-up">
            <Moon className="w-4 h-4 text-[#FFD78C] animate-sparkle-pulse" />
            <span className="text-sm text-[#F4F6FF]/80 font-medium tracking-wide">The stars have been expecting you</span>
            <Sparkles className="w-4 h-4 text-[#C8B4FF] animate-sparkle-pulse" style={{ animationDelay: "0.3s" }} />
          </div>

          <h1
            className="font-serif text-5xl md:text-7xl font-bold gradient-text mb-6 animate-fade-in-up leading-tight"
            style={{ animationDelay: "0.1s" }}
            data-testid="text-hero-title"
          >
            Starseed Treasures
          </h1>

          <p
            className="text-lg md:text-xl text-[#C8B4FF]/70 max-w-2xl mx-auto mb-4 animate-fade-in-up leading-relaxed font-serif italic"
            style={{ animationDelay: "0.2s" }}
            data-testid="text-hero-subtitle"
          >
            Where magic meets the everyday
          </p>

          <p
            className="text-base text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in-up leading-relaxed"
            style={{ animationDelay: "0.25s" }}
          >
            Mystical tarot readings, hand-poured candles, cosmic poetry, and live guidance sessions.
            Every treasure here was made to find you.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link href="/reading">
              <Button size="lg" className="glow-button gap-2" data-testid="button-get-reading">
                <Sparkles className="w-4 h-4" />
                Book a Reading
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline" className="gap-2 text-[#F4F6FF] border-[#9D7DFF]/30" data-testid="button-visit-shop">
                <ShoppingBag className="w-4 h-4" />
                Wander the Shop
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16" data-testid="features-section">
        <div className="max-w-5xl mx-auto">
          <MoonDivider />

          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3 animate-text-glow">
              Follow the Moonlight
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Three paths shimmer before you. Each one leads somewhere enchanting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link key={feature.title} href={feature.link}>
                <Card
                  className="group glass-card-shimmer border-[#9D7DFF]/10 hover-elevate cursor-pointer h-full animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                  data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <CardContent className="p-6 flex flex-col gap-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#4B2E83]/30 flex items-center justify-center mx-auto animate-gentle-float" style={{ animationDelay: `${0.3 * index}s` }}>
                      <feature.icon className="w-6 h-6 text-[#C8B4FF]" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-[#C8B4FF] text-sm font-medium mt-auto">
                      {feature.cta}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <MoonDivider />
      </section>

      <section className="px-4 pb-24" data-testid="quote-section">
        <div className="max-w-3xl mx-auto text-center glass-card-shimmer rounded-md p-10 animate-moon-glow">
          <Moon className="w-6 h-6 text-[#FFD78C]/50 mx-auto mb-4 animate-gentle-float" />
          <p className="font-serif text-xl md:text-2xl text-foreground/90 italic leading-relaxed mb-4">
            "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself."
          </p>
          <p className="text-[#C8B4FF]/50 text-sm">-- Carl Sagan</p>
        </div>
      </section>
    </div>
  );
}
