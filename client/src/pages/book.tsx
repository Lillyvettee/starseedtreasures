import { useState } from "react";
import { useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Sparkles, Moon, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type BookingForm = {
  name: string;
  email: string;
  date: string;
  time: string;
  duration: string;
  readingType: string;
  notes: string;
};
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

const readingToDuration: Record<string, string> = {
  single: "15",
  "three-card": "30",
  "celtic-cross": "60",
  custom: "30",
};

const BOOKING_EMAIL = "starseedtreasures@email.com";

export default function Book() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingForm>>({});
  const { toast } = useToast();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const preselectedReading = params.get("reading") || "";

  const [form, setForm] = useState<BookingForm>({
    name: "",
    email: "",
    date: "",
    time: "",
    duration: readingToDuration[preselectedReading] || "30",
    readingType: preselectedReading,
    notes: "",
  });

  const update = (field: keyof BookingForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<BookingForm> = {};
    if (form.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Please enter a valid email";
    if (!form.date) newErrors.date = "Please select a date";
    if (!form.time) newErrors.time = "Please select a time";
    if (!form.readingType) newErrors.readingType = "Please select a reading type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const readingLabel = readingLabels[form.readingType] || form.readingType;
    const durationLabel = durations.find((d) => d.value === form.duration);
    const subject = encodeURIComponent(`Booking Request: ${readingLabel} — ${form.date} at ${form.time}`);
    const body = encodeURIComponent(
      `Hi Abigail!\n\nI'd love to book a reading session.\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Date: ${form.date}\n` +
      `Time: ${form.time}\n` +
      `Duration: ${durationLabel ? durationLabel.label : form.duration + " min"}\n` +
      `Reading Type: ${readingLabel}\n` +
      `${form.notes ? `\nNotes/Intentions:\n${form.notes}` : ""}\n\n` +
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
            onClick={() => { setSubmitted(false); setForm({ name: "", email: "", date: "", time: "", duration: "30", readingType: "", notes: "" }); }}
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
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-foreground/80 font-serif">Your Name</label>
                  <Input
                    placeholder="What shall we call you?"
                    className="bg-background/50 border-[#9D7DFF]/20"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    data-testid="input-booking-name"
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-foreground/80 font-serif">Your Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-background/50 border-[#9D7DFF]/20"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    data-testid="input-booking-email"
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-foreground/80 font-serif">When do the stars call you?</label>
                  <Input
                    type="date"
                    min={today}
                    className="bg-background/50 border-[#9D7DFF]/20"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    data-testid="input-booking-date"
                  />
                  {errors.date && <p className="text-xs text-red-400">{errors.date}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-foreground/80 font-serif">Choose Your Hour</label>
                  <Select value={form.time} onValueChange={(v) => update("time", v)}>
                    <SelectTrigger className="bg-background/50 border-[#9D7DFF]/20" data-testid="select-booking-time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.time && <p className="text-xs text-red-400">{errors.time}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-foreground/80 font-serif">How Deep Shall We Go?</label>
                  <Select value={form.duration} onValueChange={(v) => update("duration", v)}>
                    <SelectTrigger className="bg-background/50 border-[#9D7DFF]/20" data-testid="select-booking-duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((d) => (
                        <SelectItem key={d.value} value={d.value}>{d.label} — {d.price}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-foreground/80 font-serif">Type of Reading</label>
                  <Select value={form.readingType} onValueChange={(v) => update("readingType", v)}>
                    <SelectTrigger className="bg-background/50 border-[#9D7DFF]/20" data-testid="select-booking-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {readingTypes.map((t) => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.readingType && <p className="text-xs text-red-400">{errors.readingType}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-foreground/80 font-serif">Whisper Your Intentions (optional)</label>
                <Textarea
                  placeholder="What's stirring in your soul? Share any questions, dreams, or intentions for our time together..."
                  className="bg-background/50 border-[#9D7DFF]/20 min-h-[100px] resize-none"
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  data-testid="textarea-booking-notes"
                />
              </div>

              <Button type="submit" size="lg" className="w-full glow-button gap-2" data-testid="button-submit-booking">
                <Sparkles className="w-4 h-4" />
                Seal the Magic
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
