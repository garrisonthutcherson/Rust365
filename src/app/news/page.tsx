"use client";

import { useEffect, useState } from "react";
import { Newspaper, ChevronRight, Share2, MessageCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchRustNews, type FetchRustNewsOutput } from "@/ai/flows/fetch-rust-news-flow";

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const result = await fetchRustNews({ limit: 7 });
        setNews(result.articles);
      } catch (error) {
        console.error("Failed to load news feed:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadNews();
  }, []);

  const featuredArticle = news[0];
  const gridArticles = news.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-6xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
          Rust <span className="text-primary">Hub</span>
        </h1>
        <p className="text-xl text-muted-foreground">The definitive live feed for everything happening in the world of Rust.</p>
      </div>

      {/* Featured Story */}
      {isLoading ? (
        <Skeleton className="h-[60vh] w-full rounded-3xl bg-white/5" />
      ) : featuredArticle ? (
        <div className="relative h-[60vh] rounded-3xl overflow-hidden group cursor-pointer border border-white/5">
          <Link href={`/news/${featuredArticle.id}?url=${encodeURIComponent(featuredArticle.link)}`}>
            <Image 
              src={featuredArticle.imageUrl} 
              alt={featuredArticle.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-12 space-y-6 max-w-3xl">
              <div className="inline-block bg-primary px-4 py-1 text-xs font-black uppercase tracking-[0.4em] rounded-sm">
                LATEST {featuredArticle.category.toUpperCase()}
              </div>
              <h2 className="font-headline text-5xl font-black text-white leading-tight tracking-tighter uppercase italic">
                {featuredArticle.title}
              </h2>
              <p className="text-lg text-white/80 line-clamp-2">{featuredArticle.excerpt}</p>
              <div className="flex gap-4">
                 <Button size="lg" className="rust-gradient font-headline">
                   READ FULL INTEL
                 </Button>
              </div>
            </div>
          </Link>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video w-full rounded-2xl bg-white/5" />
              <Skeleton className="h-6 w-3/4 bg-white/5" />
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-1/2 bg-white/5" />
            </div>
          ))
        ) : gridArticles.map((item) => (
          <div key={item.id} className="flex flex-col group space-y-6">
            <Link href={`/news/${item.id}?url=${encodeURIComponent(item.link)}`} className="relative aspect-video rounded-2xl overflow-hidden border border-white/5">
              <Image 
                src={item.imageUrl} 
                alt={item.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute top-4 left-4">
                <span className="bg-background/80 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary rounded-sm border border-white/10">
                  {item.category}
                </span>
              </div>
            </Link>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <span>{item.date}</span>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><Share2 className="w-3 h-3" /> Share</span>
                </div>
              </div>
              <Link href={`/news/${item.id}?url=${encodeURIComponent(item.link)}`}>
                <h3 className="font-headline text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {item.excerpt}
              </p>
              <Link 
                href={`/news/${item.id}?url=${encodeURIComponent(item.link)}`}
                className="pt-2 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.2em] hover:translate-x-1 transition-transform"
              >
                Read More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {!isLoading && news.length > 0 && (
        <div className="pt-8 text-center">
          <Button variant="outline" size="lg" className="border-white/10 font-headline px-12 h-14 uppercase tracking-widest" asChild>
            <a href="https://rust.facepunch.com/news/" target="_blank" rel="noopener noreferrer">VIEW OFFICIAL ARCHIVE</a>
          </Button>
        </div>
      )}
    </div>
  );
}
