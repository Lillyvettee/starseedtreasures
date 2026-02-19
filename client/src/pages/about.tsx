import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Moon, Star, Sparkles, Heart, Mail, Headphones, Youtube, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SUBSCRIBE_EMAIL = "starseedtreasures@email.com";

export default function About() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const subject = encodeURIComponent("Subscribe me to Starseed Treasures!");
    const body = encodeURIComponent(
      `Hi Abigail!\n\n` +
      `I'd love to subscribe to your newsletter and weekly affirmations.\n\n` +
      `My email: ${email.trim()}\n\n` +
      `xoxo`
    );

    window.open(`mailto:${SUBSCRIBE_EMAIL}?subject=${subject}&body=${body}`, "_self");

    setSubscribed(true);
    setEmail("");
    toast({
      title: "Welcome to the constellation!",
      description: "Your email client should open — just hit send and you're on the list!",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-3 h-3 text-[#FFD78C]/50 animate-sparkle-pulse" />
            <Moon className="w-4 h-4 text-[#FFD78C]/60 animate-gentle-float" />
            <Star className="w-3 h-3 text-[#FFD78C]/50 animate-sparkle-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold gradient-text mb-4" data-testid="text-about-title">
            About Me
          </h1>
          <p className="text-[#C8B4FF]/50 text-sm font-serif italic">
            hi, it's me. the girl behind the cards.
          </p>
        </div>

        <div className="divider-stars mb-10">
          <Heart className="w-3 h-3 text-[#C8B4FF]/40 animate-sparkle-pulse" />
        </div>

        <Card className="glass-card-shimmer border-[#9D7DFF]/10 animate-fade-in-up mb-8" style={{ animationDelay: "0.1s" }} data-testid="card-about-intro">
          <CardContent className="p-8">
            <div className="space-y-5 text-foreground/90 leading-relaxed">
              <p className="text-lg">
                hey love, i'm <span className="font-serif text-[#FFD78C] font-semibold">abigail</span> and this little corner of the internet is my cosmic playground.
              </p>
              <p>
                i pull cards. i pour candles. i write poetry. i ramble about the universe. and somehow, it all turned into this beautiful thing called <span className="font-serif text-[#C8B4FF]">Starseed Treasures</span>.
              </p>
              <p>
                everything here is made with intention, a whole lot of love, and probably a cup of tea nearby. i believe in magic, in self-love, in doing things at your own pace, and in being radically, unapologetically yourself.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-shimmer border-[#9D7DFF]/10 animate-fade-in-up mb-8 animate-moon-glow" style={{ animationDelay: "0.2s" }} data-testid="card-subscribe">
          <CardContent className="p-8 text-center">
            <Sparkles className="w-6 h-6 text-[#C8B4FF]/60 mx-auto mb-3 animate-sparkle-pulse" />
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">
              Subscribe for More!
            </h2>
            <p className="text-[#FFD78C] font-serif italic mb-2 text-lg">
              + weekly affirmations
            </p>
            <div className="text-muted-foreground text-sm space-y-3 mb-6 max-w-lg mx-auto text-left">
              <p>
                emails from me will consist of the following (but are not limited to):
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#C8B4FF]/50 flex-shrink-0 mt-0.5" />
                  <span>discount/deal/drop/offer-esc emails for when i either drop a new item(s) or put something on sale!</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-[#C8B4FF]/50 flex-shrink-0 mt-0.5" />
                  <span>a weekly newsletter/list of self-love affirmations to keep with you to read daily if needs be (i know i do)</span>
                </li>
              </ul>
              <p className="text-[#C8B4FF]/50 font-serif italic text-center">
                but don't hold me on that because i'm just a girl/they/them and i'm here just trying my best and that is good enough for me.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-[#FFD78C] animate-fade-in-up" data-testid="text-subscribe-success">
                <Check className="w-5 h-5" />
                <span className="font-serif">you're in, beautiful soul!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 border-[#9D7DFF]/20 flex-1"
                  required
                  data-testid="input-subscribe-email"
                />
                <Button
                  type="submit"
                  className="glow-button gap-2"
                  data-testid="button-subscribe"
                >
                  <Mail className="w-4 h-4" />
                  Subscribe
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="divider-stars mb-8">
          <Moon className="w-4 h-4 text-[#FFD78C]/40 animate-gentle-float" />
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <a
            href="https://www.youtube.com/@divagirl333"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-youtube"
          >
            <Card className="glass-card-shimmer border-[#9D7DFF]/10 hover-elevate cursor-pointer h-full animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#4B2E83]/30 flex items-center justify-center animate-gentle-float">
                  <Youtube className="w-6 h-6 text-[#C8B4FF]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">YouTube</h3>
                <p className="text-muted-foreground text-sm">
                  @divagirl333 — if you want to see even MORE of me
                </p>
                <span className="text-[#C8B4FF] text-sm flex items-center gap-1">
                  Watch Now <ArrowRight className="w-3 h-3" />
                </span>
              </CardContent>
            </Card>
          </a>

          <Card className="glass-card-shimmer border-[#9D7DFF]/10 hover-elevate animate-fade-in-up" style={{ animationDelay: "0.35s" }} data-testid="card-podcast">
            <CardContent className="p-6 text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#4B2E83]/30 flex items-center justify-center animate-gentle-float" style={{ animationDelay: "0.5s" }}>
                <Headphones className="w-6 h-6 text-[#C8B4FF]" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">Divine F.M.</h3>
              <p className="text-muted-foreground text-sm">
                my podcast — spirituality, self-help, and storytelling. currently on season 3: "Letting Go"
              </p>
              <span className="text-[#C8B4FF] text-sm font-serif italic">
                streaming everywhere
              </span>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card-shimmer border-[#9D7DFF]/10 animate-fade-in-up mb-8" style={{ animationDelay: "0.4s" }} data-testid="card-signoff">
          <CardContent className="p-8 text-center">
            <Heart className="w-5 h-5 text-[#FFD78C]/60 mx-auto mb-3 animate-sparkle-pulse" />
            <p className="text-foreground/90 leading-relaxed mb-4">
              i love you, thank you for listening, and have a great rest of your day.
            </p>
            <p className="text-[#C8B4FF]/50 font-serif italic text-sm mb-2">
              okay too da loo
            </p>
            <p className="text-[#FFD78C] font-serif text-lg">
              xoxo abigail
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
