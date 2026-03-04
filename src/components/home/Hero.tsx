
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Sparkles, Play, ShieldAlert, Loader2 } from "lucide-react";
import { adminAIGenerateBrandAssets } from "@/ai/flows/admin-ai-generate-brand-assets";
import { useToast } from "@/hooks/use-toast";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

export function Hero() {
  const { toast } = useToast();
  const db = useFirestore();
  
  // Memoize the configuration reference
  const configRef = useMemoFirebase(() => doc(db, "appConfiguration", "global"), [db]);
  const { data: config, isLoading: isConfigLoading } = useDoc(configRef);

  const fallbackHero = PlaceHolderImages.find(img => img.id === "hero-official")?.imageUrl || "https://picsum.photos/seed/rustofficial/1920/1080";
  const logoFallbackItem = PlaceHolderImages.find(img => img.id === "brand-logo");
  
  const [heroBg, setHeroBg] = useState(fallbackHero);
  const [brandLogo, setBrandLogo] = useState(logoFallbackItem?.imageUrl || "https://picsum.photos/seed/rustlogo/200/200");
  const [isGenerating, setIsGenerating] = useState(false);

  // Sync state with Firestore data if it exists
  useEffect(() => {
    if (config?.heroImageUrl) {
      setHeroBg(config.heroImageUrl);
    }
    if (config?.brandLogoUrl) {
      setBrandLogo(config.brandLogoUrl);
    }
  }, [config]);

  const generateAssets = async () => {
    setIsGenerating(true);
    try {
      const result = await adminAIGenerateBrandAssets({
        heroBackgroundDescription: "A breathtaking high-definition cinematic scene of a desolate post-apocalyptic rust-colored wasteland with advanced structures and a glowing red sun.",
        logoDescription: "A minimalist, sharp vector logo of a wolf head mixed with industrial metal gears, bold red accents, black background."
      });
      setHeroBg(result.heroBackgroundDataUri);
      setBrandLogo(result.logoDataUri);
      toast({
        title: "AI Assets Generated!",
        description: "Your custom brand assets are now live.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate AI assets at this time.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 px-6">
      <div className="absolute inset-0 z-0">
        <Image 
          src={heroBg} 
          alt="Rust365 Hero Background" 
          fill 
          className="object-cover transition-opacity duration-1000"
          priority
          data-ai-hint="post-apocalyptic dome"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase mb-8 animate-pulse">
          <ShieldAlert className="w-4 h-4" />
          Server Wiping in 12h 45m
        </div>

        <div className="mb-8 flex justify-center">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/50 shadow-2xl shadow-primary/20 rotate-3 transform hover:rotate-0 transition-transform duration-500 bg-background">
             <Image 
               src={brandLogo} 
               alt="Logo" 
               fill 
               className="object-cover" 
               data-ai-hint="minimalist logo"
             />
          </div>
        </div>

        <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 heading-shadow">
          SURVIVAL IS <span className="text-primary italic">RELENTLESS</span>
        </h1>
        
        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          The most advanced Rust server directory, community hub, and tactical directory. Find your next wipe, join the conversation, and dominate the island.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="rust-gradient font-headline text-lg px-10 h-14 group">
            FIND A SERVER
            <Play className="ml-2 w-4 h-4 fill-white group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="font-headline text-lg px-10 h-14 border-white/10 hover:bg-white/5"
            onClick={generateAssets}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="mr-2 w-5 h-5 animate-spin text-primary" />
            ) : (
              <Sparkles className="mr-2 w-5 h-5 text-primary" />
            )}
            {isGenerating ? "GENERATING..." : "REGENERATE AI STYLE"}
          </Button>
        </div>

        <div className="mt-16 flex justify-center gap-12 text-sm text-muted-foreground/60 uppercase font-bold tracking-[0.2em]">
          <div className="flex flex-col gap-1">
            <span className="text-white text-2xl font-headline font-black">1.2M+</span>
            PLAYERS TRACKED
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white text-2xl font-headline font-black">4,500</span>
            SERVERS LISTED
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white text-2xl font-headline font-black">24/7</span>
            MONITORING
          </div>
        </div>
      </div>
    </section>
  );
}
