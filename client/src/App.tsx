import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StarBackground } from "@/components/star-background";
import { Navigation } from "@/components/navigation";
import Home from "@/pages/home";
import Reading from "@/pages/reading";
import Shop from "@/pages/shop";
import Book from "@/pages/book";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/reading" component={Reading} />
      <Route path="/shop" component={Shop} />
      <Route path="/book" component={Book} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <TooltipProvider>
      <div className="relative min-h-screen bg-background">
        <StarBackground />
        <Navigation />
        <main className="relative z-10">
          <Router />
        </main>
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
