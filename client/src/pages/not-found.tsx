import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center animate-fade-in-up">
        <div className="w-16 h-16 rounded-full bg-[#4B2E83]/30 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-[#9D7DFF]" />
        </div>
        <h1 className="font-serif text-4xl font-bold gradient-text mb-4">
          Lost in the Cosmos
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          This path does not exist in the stars. Let us guide you back to your cosmic sanctuary.
        </p>
        <Link href="/">
          <Button className="glow-button gap-2" data-testid="button-go-home">
            <Home className="w-4 h-4" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
