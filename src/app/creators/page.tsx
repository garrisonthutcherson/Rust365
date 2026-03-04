import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Youtube, Instagram, Twitter, ExternalLink, User } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function CreatorsPage() {
  const creators = [
    { id: 1, name: "RustyRaidMaster", subs: "450k", platform: "YouTube", tag: "Raiding Specialist", image: PlaceHolderImages.find(i => i.id === "creator-1")?.imageUrl || "" },
    { id: 2, name: "BaseBuilderPro", subs: "120k", platform: "Twitch", tag: "Building Master", image: PlaceHolderImages.find(i => i.id === "creator-2")?.imageUrl || "" },
    { id: 3, name: "AloneInTokyoFan", subs: "85k", platform: "YouTube", tag: "Solo God", image: PlaceHolderImages.find(i => i.id === "creator-1")?.imageUrl || "" },
    { id: 4, name: "SpoonkidIsMid", subs: "20k", platform: "Twitch", tag: "Memes & PVP", image: PlaceHolderImages.find(i => i.id === "creator-2")?.imageUrl || "" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-12">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="font-headline text-6xl font-black text-white tracking-tighter uppercase italic">
            Creator <span className="text-primary">Showcase</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl">Highlighting the legends who define the Rust meta and entertainment.</p>
        </div>
        <div className="flex gap-4">
           <Button size="lg" variant="outline" className="border-white/10 font-headline uppercase tracking-widest">Partnership Info</Button>
           <Button size="lg" className="rust-gradient font-headline uppercase tracking-widest">Apply to Join</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {creators.map((creator) => (
          <Card key={creator.id} className="glass-panel border-white/5 overflow-hidden group hover:border-primary/50 transition-all">
            <CardContent className="p-0">
               <div className="relative h-64 w-full">
                  <Image src={creator.image} alt={creator.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="space-y-1">
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-[8px] font-black uppercase tracking-widest">
                        {creator.tag}
                      </Badge>
                      <h3 className="font-headline font-black text-xl text-white tracking-tighter italic uppercase">{creator.name}</h3>
                    </div>
                  </div>
               </div>
               <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {creator.subs} Follows</span>
                    <span className={`flex items-center gap-1.5 ${creator.platform === 'YouTube' ? 'text-red-500' : 'text-purple-500'}`}>
                      {creator.platform === 'YouTube' ? <Youtube className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      {creator.platform}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" className="w-full text-[10px] font-black uppercase tracking-widest h-9">LATEST VIDEO</Button>
                    <Button variant="outline" size="icon" className="h-9 w-9 border-white/10">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-card/30 rounded-3xl p-12 border border-white/5 text-center space-y-8">
         <h2 className="font-headline text-4xl font-black text-white tracking-tighter uppercase italic">
           Watch Live <span className="text-primary">Now</span>
         </h2>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative border border-white/10 group cursor-pointer">
               <Image src={PlaceHolderImages.find(i => i.id === "news-1")?.imageUrl || ""} fill alt="Live stream" className="object-cover opacity-60" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform">
                     <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
               </div>
               <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-0.5 rounded text-[10px] font-black uppercase tracking-widest animate-pulse">
                 <div className="w-1.5 h-1.5 rounded-full bg-white" />
                 LIVE
               </div>
               <div className="absolute bottom-4 left-4 text-left">
                  <p className="font-headline font-bold text-lg text-white">Insane 20 Man Offline Defense</p>
                  <p className="text-xs text-white/70 font-bold uppercase">Streaming on Twitch.tv/RustLord</p>
               </div>
            </div>
            <div className="flex flex-col justify-center text-left space-y-6 lg:pl-8">
               <h3 className="font-headline text-3xl font-black text-white tracking-tighter uppercase italic leading-none">
                 The Official <span className="text-primary">Twitch Drop</span> Tracker
               </h3>
               <p className="text-muted-foreground leading-relaxed">
                 Never miss a unique skin. We track all active Twitch drop campaigns with real-time countdowns and creator links.
               </p>
               <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center font-black text-xs text-primary">SKIN</div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white uppercase tracking-tighter">Alistair's AK47 Skin</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase">Watch 4 hours of Alistair</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary font-black uppercase text-[10px] tracking-widest">GO WATCH</Button>
                    </div>
                  ))}
               </div>
               <Button className="rust-gradient font-headline w-full lg:w-auto px-12 uppercase tracking-widest h-14">VIEW ALL DROPS</Button>
            </div>
         </div>
      </section>
    </div>
  );
}
