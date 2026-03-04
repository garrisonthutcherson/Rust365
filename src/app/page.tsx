import { Hero } from "@/components/home/Hero";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Zap, ExternalLink } from "lucide-react";
import Image from "next/image";
import { getPlaceholderById } from "@/lib/placeholder-images";

export default function Home() {
  const newsItems = [
    { 
      id: 1, 
      title: "Rust Console Edition: Power Plant Update", 
      excerpt: "The massive Power Plant monument finally arrives with new puzzles and high-tier loot.",
      image: getPlaceholderById("news-1").imageUrl
    },
    { 
      id: 2, 
      title: "The Return of the Industrial Update", 
      excerpt: "Changes to automation and piping systems that every builder needs to know.",
      image: getPlaceholderById("news-2").imageUrl
    }
  ];

  const featuredServers = [
    { name: "Rust365 US Main", pop: "348/350", ping: "22ms", type: "Weekly Wipe" },
    { name: "Salty Survivors 2x", pop: "112/200", ping: "45ms", type: "Monthly Wipe" },
    { name: "Rust Academy Training", pop: "45/100", ping: "15ms", type: "Training" }
  ];

  return (
    <div className="space-y-24 pb-20">
      <Hero />

      {/* Featured Servers */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <h2 className="font-headline text-4xl font-black text-white tracking-tighter uppercase italic">
              Live <span className="text-primary">Directory</span>
            </h2>
            <p className="text-muted-foreground">The most populated servers right now.</p>
          </div>
          <Button variant="ghost" className="text-primary group">
            View All Servers <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredServers.map((server, i) => (
            <Card key={i} className="glass-panel border-white/5 hover:border-primary/50 transition-all cursor-pointer group">
              <CardHeader className="relative overflow-hidden p-0 rounded-t-lg h-32">
                 <Image 
                   src={getPlaceholderById("server-thumb").imageUrl} 
                   alt="Server" 
                   fill 
                   className="object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                 />
                 <div className="absolute top-2 right-2 bg-green-500/20 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-500/30">ONLINE</div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="font-headline font-bold text-xl mb-1 text-white">{server.name}</h3>
                <div className="flex justify-between items-center text-sm mb-4">
                  <span className="text-muted-foreground">{server.type}</span>
                  <span className="text-primary font-mono">{server.pop}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="w-full text-xs font-bold uppercase tracking-wider">Join Now</Button>
                  <Button variant="outline" size="icon" className="shrink-0 border-white/10"><Zap className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* News & Updates */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div className="flex justify-between items-center">
              <h2 className="font-headline text-4xl font-black text-white tracking-tighter uppercase italic">
                Latest <span className="text-primary">Intel</span>
              </h2>
            </div>
            <div className="space-y-8">
              {newsItems.map((news) => (
                <div key={news.id} className="group cursor-pointer flex flex-col md:flex-row gap-6 items-start">
                  <div className="relative w-full md:w-64 h-44 rounded-xl overflow-hidden shrink-0 border border-white/5">
                    {news.image && (
                      <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">News / 2 hours ago</span>
                    <h3 className="font-headline text-2xl font-bold text-white group-hover:text-primary transition-colors">{news.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{news.excerpt}</p>
                    <div className="pt-2 flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider">
                      Read full report <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="font-headline text-4xl font-black text-white tracking-tighter uppercase italic">
              Elite <span className="text-primary">Creators</span>
            </h2>
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <Card key={i} className="glass-panel border-white/5 p-4 flex gap-4 items-center hover:bg-white/5 transition-colors">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                    <Image 
                      src={getPlaceholderById(`creator-${i}`).imageUrl} 
                      alt="Creator" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-headline font-bold text-white">RustyRaidMaster</h4>
                    <p className="text-xs text-muted-foreground mb-2">420k Subscribers</p>
                    <div className="flex gap-2">
                       <Button size="sm" variant="outline" className="h-7 text-[10px] border-white/10 uppercase tracking-widest bg-red-600/10 hover:bg-red-600/20 text-red-500 border-red-500/20">YouTube</Button>
                       <Button size="sm" variant="outline" className="h-7 text-[10px] border-white/10 uppercase tracking-widest bg-purple-600/10 hover:bg-purple-600/20 text-purple-500 border-purple-500/20">Twitch</Button>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Card>
              ))}
              <Button variant="outline" className="w-full border-white/10 text-xs font-bold uppercase tracking-[0.2em] py-6">Apply to Showcase</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Teaser */}
      <section className="bg-primary/5 border-y border-white/5 py-24 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 space-y-8">
             <div className="inline-block bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] rounded-sm">MESSAGE BOARD</div>
             <h2 className="font-headline text-5xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">
               Join the <span className="text-primary">Conversation</span>
             </h2>
             <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
               Share base designs, coordinate raids, find teammates, or just complain about the latest patch notes with 50,000+ active survivors.
             </p>
             <div className="flex gap-4">
                <Button size="lg" className="rust-gradient font-headline px-8">OPEN BOARD</Button>
                <Button size="lg" variant="outline" className="font-headline px-8 border-white/10">TOP TRENDS</Button>
             </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className={`glass-panel border-white/5 p-6 space-y-3 ${i % 2 === 0 ? 'translate-y-8' : ''}`}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">By @Hazmat{i}22</span>
                </div>
                <h4 className="font-headline font-bold text-sm text-white">How do I survive solo on a 500 pop server?</h4>
                <div className="flex gap-4 text-[10px] text-muted-foreground font-bold uppercase">
                  <span>14 Replies</span>
                  <span>1.2k Views</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
