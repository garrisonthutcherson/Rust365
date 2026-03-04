import { Newspaper, ChevronRight, Share2, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function NewsPage() {
  const news = [
    {
      id: 1,
      title: "Devblog 245: The Military Base Overhaul",
      date: "May 12, 2025",
      category: "Update",
      excerpt: "Facepunch reveals massive changes to the military tunnels and the introduction of heavy scientist variations.",
      image: PlaceHolderImages.find(i => i.id === "news-1")?.imageUrl || ""
    },
    {
      id: 2,
      title: "Rust Community Spotlight: Insane 50v50 Raid",
      date: "May 10, 2025",
      category: "Community",
      excerpt: "Watch the biggest raid in Rust history as two massive clans fight for server dominance on Rustafied.",
      image: PlaceHolderImages.find(i => i.id === "news-2")?.imageUrl || ""
    },
    {
      id: 3,
      title: "Rust Console Edition: Skin Store Refresh",
      date: "May 08, 2025",
      category: "Store",
      excerpt: "The weekly skin refresh is here. Check out the new tempered AK skin and industrial base parts.",
      image: PlaceHolderImages.find(i => i.id === "news-1")?.imageUrl || ""
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-6xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
          Rust <span className="text-primary">Hub</span>
        </h1>
        <p className="text-xl text-muted-foreground">The definitive source for everything happening in the world of Rust.</p>
      </div>

      {/* Featured Story */}
      <div className="relative h-[60vh] rounded-3xl overflow-hidden group cursor-pointer border border-white/5">
        <Image 
          src={PlaceHolderImages.find(i => i.id === "hero-fallback")?.imageUrl || ""} 
          alt="Featured News" 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-12 space-y-6 max-w-3xl">
          <div className="inline-block bg-primary px-4 py-1 text-xs font-black uppercase tracking-[0.4em] rounded-sm">LATEST UPDATE</div>
          <h2 className="font-headline text-5xl font-black text-white leading-tight tracking-tighter uppercase italic">
            The Industrial Age: Complete <span className="text-primary">Guide</span> to Automation
          </h2>
          <p className="text-lg text-white/80 line-clamp-2">Everything you need to know about the new conveyor systems, auto-crafters, and smart storage systems to optimize your base.</p>
          <div className="flex gap-4">
             <Button size="lg" className="rust-gradient font-headline">READ FULL ARTICLE</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item) => (
          <div key={item.id} className="flex flex-col group cursor-pointer space-y-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5">
              <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4">
                <span className="bg-background/80 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary rounded-sm border border-white/10">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <span>{item.date}</span>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> 12</span>
                  <span className="flex items-center gap-1"><Share2 className="w-3 h-3" /> Share</span>
                </div>
              </div>
              <h3 className="font-headline text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {item.excerpt}
              </p>
              <div className="pt-2 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.2em]">
                Read More <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-8 text-center">
        <Button variant="outline" size="lg" className="border-white/10 font-headline px-12 h-14 uppercase tracking-widest">Archive 2024</Button>
      </div>
    </div>
  );
}
