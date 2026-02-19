import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Moon, Star, ArrowRight, Clock, Check } from "lucide-react";

const readings = [
  {
    type: "single",
    title: "Single Card Reading",
    subtitle: "A whisper from the universe, just for you",
    price: "$25",
    duration: "15 minutes",
    features: [
      "One card drawn and interpreted",
      "Focused guidance on a single question",
      "Written summary emailed to you",
    ],
  },
  {
    type: "three-card",
    title: "Three Card Spread",
    subtitle: "Past, Present, and Future — the threads of your story",
    price: "$45",
    duration: "30 minutes",
    featured: true,
    features: [
      "Three cards: Past, Present, Future",
      "Deep exploration of your journey",
      "Personalized guidance and reflection",
      "Written summary emailed to you",
    ],
  },
  {
    type: "celtic-cross",
    title: "Celtic Cross",
    subtitle: "The grand tapestry — ten cards unveiling your deepest journey",
    price: "$75",
    duration: "60 minutes",
    features: [
      "Ten-card comprehensive spread",
      "Full life path and soul exploration",
      "Detailed written interpretation",
      "Follow-up questions welcome",
      "Recording of your session",
    ],
  },
  {
    type: "custom",
    title: "Custom / Intuitive Reading",
    subtitle: "A freeform session guided entirely by spirit and intuition",
    price: "$45+",
    duration: "30-60 minutes",
    features: [
      "Fully intuitive, no set spread",
      "Tailored to your unique energy",
      "Combines tarot, oracle, and channeling",
      "Written summary emailed to you",
    ],
  },
];

export default function Reading() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-3 h-3 text-[#FFD78C]/50 animate-sparkle-pulse" />
            <Moon className="w-4 h-4 text-[#FFD78C]/60 animate-gentle-float" />
            <Star className="w-3 h-3 text-[#FFD78C]/50 animate-sparkle-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold gradient-text mb-4" data-testid="text-reading-title">
            Tarot Readings
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-2">
            Let our gifted cosmic guide pull the cards and reveal what the universe has in store for you.
          </p>
          <p className="text-[#C8B4FF]/50 text-sm font-serif italic">
            Every reading is a personal, live session — intimate, insightful, and a little bit magical.
          </p>
        </div>

        <div className="divider-stars mb-10">
          <Sparkles className="w-3 h-3 text-[#C8B4FF]/40 animate-sparkle-pulse" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {readings.map((reading, index) => (
            <Card
              key={reading.type}
              className={`glass-card-shimmer border-[#9D7DFF]/10 animate-fade-in-up relative ${
                reading.featured ? "ring-1 ring-[#C8B4FF]/30 animate-moon-glow" : ""
              }`}
              style={{ animationDelay: `${0.1 * index}s` }}
              data-testid={`card-reading-${reading.type}`}
            >
              {reading.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#4B2E83] text-[#FFD78C] text-xs font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="text-center">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-1" data-testid={`text-reading-name-${reading.type}`}>
                    {reading.title}
                  </h3>
                  <p className="text-[#C8B4FF]/60 text-sm font-serif italic mb-3">
                    {reading.subtitle}
                  </p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-[#FFD78C] font-bold text-2xl font-serif" data-testid={`text-reading-price-${reading.type}`}>
                      {reading.price}
                    </span>
                    <span className="text-muted-foreground text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {reading.duration}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 flex-1">
                  {reading.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-[#C8B4FF]/60 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/book?reading=${reading.type}`}>
                  <Button
                    className="w-full glow-button gap-2 mt-2"
                    data-testid={`button-book-reading-${reading.type}`}
                  >
                    <Sparkles className="w-4 h-4" />
                    Book This Reading
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="divider-stars mb-8">
          <Moon className="w-4 h-4 text-[#FFD78C]/40 animate-gentle-float" />
        </div>

        <div className="text-center glass-card-shimmer rounded-md p-8 animate-moon-glow animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Moon className="w-6 h-6 text-[#FFD78C]/50 mx-auto mb-3 animate-gentle-float" />
          <p className="font-serif text-xl text-foreground/90 mb-3">
            Not sure which reading is right for you?
          </p>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
            Book a session and tell us what's on your mind — our reader will guide you to exactly what your soul needs.
          </p>
          <Link href="/book">
            <Button size="lg" className="glow-button gap-2" data-testid="button-book-any">
              <Sparkles className="w-4 h-4" />
              Book a Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
