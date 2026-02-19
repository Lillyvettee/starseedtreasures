import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearch } from "wouter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar, Sparkles, Moon, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  duration: z.coerce.number().min(15),
  readingType: z.string().min(1, "Please select a reading type"),
  notes: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

const durations = [
  { value: "15", label: "15 min — A Quick Cosmic Whisper", price: "$25" },
  { value: "30", label: "30 min — A Deep Starlit Dive", price: "$45" },
  { value: "60", label: "60 min — The Full Moon Journey", price: "$75" },
];

const readingTypes = [
  { value: "single", label: "Single Card Reading" },
  { value: "three-card", label: "Three Card Spread" },
  { value: "celtic-cross", label: "Celtic Cross" },
  { value: "custom", label: "Custom / Intuitive" },
];

const readingLabels: Record<string, string> = {
  single: "Single Card Reading",
  "three-card": "Three Card Spread",
  "celtic-cross": "Celtic Cross",
  custom: "Custom / Intuitive",
};

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM",
];

const readingToDuration: Record<string, number> = {
  single: 15,
  "three-card": 30,
  "celtic-cross": 60,
  custom: 30,
};

const BOOKING_EMAIL = "starseedtreasures@email.com";

export default function Book() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const preselectedReading = params.get("reading") || "";

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      date: "",
      time: "",
      duration: readingToDuration[preselectedReading] || 30,
      readingType: preselectedReading,
      notes: "",
    },
  });

  const onSubmit = (data: BookingForm) => {
    const readingLabel = readingLabels[data.readingType] || data.readingType;
    const durationLabel = durations.find((d) => d.value === String(data.duration));
    const subject = encodeURIComponent(`Booking Request: ${readingLabel} — ${data.date} at ${data.time}`);
    const body = encodeURIComponent(
      `Hi Abigail!\n\nI'd love to book a reading session.\n\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Date: ${data.date}\n` +
      `Time: ${data.time}\n` +
      `Duration: ${durationLabel ? durationLabel.label : data.duration + ' min'}\n` +
      `Reading Type: ${readingLabel}\n` +
      `${data.notes ? `\nNotes/Intentions:\n${data.notes}` : ''}\n\n` +
      `Thank you! xoxo`
    );

    window.open(`mailto:${BOOKING_EMAIL}?subject=${subject}&body=${body}`, "_self");

    setSubmitted(true);
    toast({
      title: "The Stars Have Aligned",
      description: "Your email client should open with the booking details. We'll see you soon!",
    });
  };

  const today = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-[#4B2E83]/30 flex items-center justify-center mx-auto mb-6 animate-moon-glow">
            <Moon className="w-10 h-10 text-[#FFD78C] animate-gentle-float" />
          </div>
          <h2 className="font-serif text-3xl font-bold gradient-text mb-4" data-testid="text-booking-confirmed">
            Your Session Awaits
          </h2>
          <p className="text-muted-foreground mb-3 leading-relaxed">
            Your email client should have opened with all the booking details. Just hit send and we'll take it from there!
          </p>
          <p className="text-[#C8B4FF]/50 text-sm font-serif italic mb-8">
            Prepare an open heart, a quiet mind, and a cup of something warm.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              form.reset();
            }}
            className="gap-2 border-[#9D7DFF]/30 text-foreground"
            data-testid="button-book-another"
          >
            <Sparkles className="w-4 h-4" />
            Book Another Session
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-3 h-3 text-[#FFD78C]/50 animate-sparkle-pulse" />
            <Moon className="w-4 h-4 text-[#FFD78C]/60 animate-gentle-float" />
            <Star className="w-3 h-3 text-[#FFD78C]/50 animate-sparkle-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold gradient-text mb-4" data-testid="text-book-title">
            Book a Live Session
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-2">
            Sit with our gifted cosmic guide for a personal, intimate reading session.
          </p>
          <p className="text-[#C8B4FF]/50 text-sm font-serif italic">
            Choose your time, your spread, and open yourself to the stars.
          </p>
        </div>

        <div className="divider-stars mb-8">
          <Sparkles className="w-3 h-3 text-[#C8B4FF]/40 animate-sparkle-pulse" />
        </div>

        <Card className="glass-card-shimmer border-[#9D7DFF]/10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 font-serif">Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What shall we call you?"
                            className="bg-background/50 border-[#9D7DFF]/20"
                            data-testid="input-booking-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 font-serif">Your Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className="bg-background/50 border-[#9D7DFF]/20"
                            data-testid="input-booking-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 font-serif">When do the stars call you?</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            min={today}
                            className="bg-background/50 border-[#9D7DFF]/20"
                            data-testid="input-booking-date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 font-serif">Choose Your Hour</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-[#9D7DFF]/20" data-testid="select-booking-time">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 font-serif">How Deep Shall We Go?</FormLabel>
                        <Select
                          onValueChange={(v) => field.onChange(parseInt(v))}
                          value={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-[#9D7DFF]/20" data-testid="select-booking-duration">
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {durations.map((d) => (
                              <SelectItem key={d.value} value={d.value}>
                                {d.label} — {d.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="readingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 font-serif">Type of Reading</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-[#9D7DFF]/20" data-testid="select-booking-type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {readingTypes.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80 font-serif">
                        Whisper Your Intentions (optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What's stirring in your soul? Share any questions, dreams, or intentions for our time together..."
                          className="bg-background/50 border-[#9D7DFF]/20 min-h-[100px] resize-none"
                          data-testid="textarea-booking-notes"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full glow-button gap-2"
                  data-testid="button-submit-booking"
                >
                  <Sparkles className="w-4 h-4" />
                  Seal the Magic
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
