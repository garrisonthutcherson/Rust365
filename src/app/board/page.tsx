import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Eye, Search, PlusCircle, TrendingUp } from "lucide-react";

export default function BoardPage() {
  const topics = [
    { id: 1, title: "Official Wipe Day Discussion - May 2025", author: "RaiderX", replies: 124, views: "5.2k", category: "Wipe Day", hot: true },
    { id: 2, title: "Solo Base Design: The Bunker (V3)", author: "Architect", replies: 45, views: "1.8k", category: "Guides", hot: false },
    { id: 3, title: "Bloody Mouse Scripting: Why is it still a thing?", author: "Purist", replies: 89, views: "3.1k", category: "Discussion", hot: true },
    { id: 4, title: "LFG: Trio looking for dedicated farmer", author: "FarmerJoe", replies: 12, views: "400", category: "Recruitment", hot: false },
    { id: 5, title: "New Industrial Update - Bug Reports", author: "FacepunchStan", replies: 230, views: "12k", category: "Bugs", hot: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <h1 className="font-headline text-5xl font-black text-white tracking-tighter uppercase italic">
                Message <span className="text-primary">Board</span>
              </h1>
              <p className="text-muted-foreground">The tactical heart of the Rust community.</p>
            </div>
            <Button className="rust-gradient font-headline px-8">
              <PlusCircle className="mr-2 w-5 h-5" />
              NEW TOPIC
            </Button>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-10 glass-panel border-white/10" placeholder="Search discussions..." />
            </div>
            <Button variant="outline" className="border-white/10">Latest</Button>
            <Button variant="outline" className="border-white/10">Popular</Button>
          </div>

          <div className="space-y-4">
            {topics.map((topic) => (
              <div key={topic.id} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group cursor-pointer">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-white/10 text-muted-foreground">
                        {topic.category}
                      </Badge>
                      {topic.hot && (
                        <div className="flex items-center gap-1 text-[10px] font-black uppercase text-primary">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </div>
                      )}
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                      {topic.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      <span>Posted by <span className="text-white">@{topic.author}</span></span>
                      <span>•</span>
                      <span>2 hours ago</span>
                    </div>
                  </div>
                  <div className="hidden md:flex gap-8 text-center shrink-0">
                    <div className="space-y-1">
                      <p className="text-white font-headline font-black text-xl">{topic.replies}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Replies</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-white font-headline font-black text-xl">{topic.views}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Views</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full border-white/10 font-bold uppercase tracking-widest py-8">Load More Discussions</Button>
        </div>

        <aside className="w-full lg:w-80 space-y-8">
           <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-6">
              <h3 className="font-headline text-xl font-black text-white tracking-tighter uppercase italic">Board <span className="text-primary">Rules</span></h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">01.</span>
                  No promoting hacks or scripts. Zero tolerance.
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">02.</span>
                  Keep toxicity within the game boundaries.
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">03.</span>
                  No doxxing or real-life threats.
                </li>
              </ul>
              <Button variant="secondary" className="w-full text-xs font-bold uppercase tracking-widest">Read Full Guidelines</Button>
           </div>

           <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-6">
              <h3 className="font-headline text-xl font-black text-white tracking-tighter uppercase italic">Top <span className="text-primary">Contributors</span></h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-headline font-black text-primary">
                      {i}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white uppercase tracking-tighter">Survivor_{i}2</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">2.4k Points</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
