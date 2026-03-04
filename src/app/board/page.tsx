
"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import Link from "next/link";
import { MessageSquare, Layers, Loader2, ChevronRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BoardIndexPage() {
  const db = useFirestore();

  const categoriesQuery = useMemoFirebase(() => {
    return query(collection(db, "categories"), orderBy("order", "asc"));
  }, [db]);

  const subCategoriesQuery = useMemoFirebase(() => {
    return query(collection(db, "subCategories"), orderBy("order", "asc"));
  }, [db]);

  const { data: categories, isLoading: catsLoading } = useCollection(categoriesQuery);
  const { data: subCategories, isLoading: subsLoading } = useCollection(subCategoriesQuery);

  if (catsLoading || subsLoading) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h1 className="font-headline text-5xl font-black text-white tracking-tighter uppercase italic">
            Message <span className="text-primary">Board</span>
          </h1>
          <p className="text-muted-foreground">The tactical heart of the Rust community.</p>
        </div>
        <Button asChild className="rust-gradient font-headline px-8">
          <Link href="/board/new">
            NEW TOPIC
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-10">
          {categories?.length === 0 ? (
            <div className="text-center py-20 glass-panel rounded-2xl border border-white/5">
              <p className="text-muted-foreground">The island is quiet... check back later.</p>
            </div>
          ) : (
            categories?.map((category) => (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-primary/20 pb-2">
                  <Layers className="w-5 h-5 text-primary" />
                  <h2 className="font-headline text-2xl font-black uppercase italic tracking-tighter text-white">
                    {category.name}
                  </h2>
                </div>
                
                <div className="space-y-2">
                  {subCategories?.filter(sub => sub.categoryId === category.id).map((sub) => (
                    <Link key={sub.id} href={`/board/sub/${sub.id}`}>
                      <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-all group flex items-center justify-between gap-6 cursor-pointer">
                        <div className="space-y-1">
                          <h3 className="font-headline text-xl font-bold text-white group-hover:text-primary transition-colors italic">
                            {sub.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{sub.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-12">
                          <div className="hidden md:flex gap-8 text-center shrink-0">
                            <div className="space-y-0.5">
                              <p className="text-white font-headline font-black text-lg">{sub.topicCount || 0}</p>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Topics</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-white font-headline font-black text-lg">{sub.postCount || 0}</p>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Posts</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="space-y-8">
          <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-6">
            <h3 className="font-headline text-xl font-black text-white tracking-tighter uppercase italic">Board <span className="text-primary">Intel</span></h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total Members</span>
                <span className="text-white font-black">12,452</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Active Now</span>
                <span className="text-primary font-black">842</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total Topics</span>
                <span className="text-white font-black">4,215</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-6">
            <h3 className="font-headline text-xl font-black text-white tracking-tighter uppercase italic">Trending <span className="text-primary">Raids</span></h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white leading-tight uppercase">Base Design for 500 Pop Servers</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">1.2k Replies</p>
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
