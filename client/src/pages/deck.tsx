import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { TarotCard } from "@shared/schema";

export default function Deck() {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  const { data: cards, isLoading } = useQuery<TarotCard[]>({
    queryKey: ["/api/cards"],
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-serif text-4xl md:text-5xl font-bold gradient-text mb-4" data-testid="text-deck-title">
            The Major Arcana
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            22 cards of profound wisdom. Each holds ancient truths and poetic revelations.
            Select a card to explore its mysteries.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-[3/4] rounded-md" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cards?.map((card, index) => (
              <div
                key={card.id}
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.04}s` }}
                onClick={() => setSelectedCard(card)}
                data-testid={`card-deck-${card.id}`}
              >
                <div className="relative aspect-[3/4] rounded-md overflow-hidden mb-2 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#9D7DFF]/50">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="text-center text-sm text-foreground/80 font-medium">
                  {card.number}. {card.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="glass-card border-[#9D7DFF]/20 max-w-lg max-h-[90vh] overflow-y-auto" data-testid="dialog-card-detail">
          {selectedCard && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl gradient-text">
                  {selectedCard.number}. {selectedCard.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="w-48 mx-auto">
                  <div className="aspect-[3/4] rounded-md overflow-hidden animate-card-glow">
                    <img
                      src={selectedCard.image}
                      alt={selectedCard.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedCard.keywords.map((kw) => (
                    <Badge
                      key={kw}
                      variant="outline"
                      className="text-[#9D7DFF] border-[#9D7DFF]/30 text-xs"
                    >
                      {kw}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      Upright Meaning
                    </h3>
                    <p className="text-foreground/85 text-sm leading-relaxed">
                      {selectedCard.meaningUpright}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      Reversed Meaning
                    </h3>
                    <p className="text-foreground/85 text-sm leading-relaxed">
                      {selectedCard.meaningReversed}
                    </p>
                  </div>

                  <div className="border-t border-[#9D7DFF]/10 pt-4">
                    <h3 className="font-serif text-lg font-semibold text-[#9D7DFF] mb-2">
                      Poetic Interpretation
                    </h3>
                    <p className="font-serif italic text-foreground/70 text-sm leading-relaxed whitespace-pre-line">
                      {selectedCard.poem}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
