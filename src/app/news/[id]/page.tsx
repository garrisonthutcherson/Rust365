"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2, ShieldAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { fetchArticleContent, type FetchArticleContentOutput } from "@/ai/flows/fetch-article-content-flow";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const externalUrl = searchParams.get("url");
  
  const [article, setArticle] = useState<FetchArticleContentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!externalUrl) {
      setError("No source URL provided for this article.");
      setIsLoading(false);
      return;
    }

    async function loadContent() {
      try {
        const data = await fetchArticleContent({ url: externalUrl as string });
        setArticle(data);
      } catch (err) {
        console.error("Failed to load article content:", err);
        setError("Could not extract article intel from the island.");
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [externalUrl]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <Skeleton className="h-8 w-32 bg-white/5" />
        <div className="space-y-6">
          <Skeleton className="h-16 w-3/4 bg-white/5" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24 bg-white/5" />
            <Skeleton className="h-4 w-24 bg-white/5" />
          </div>
          <Skeleton className="h-[50vh] w-full rounded-2xl bg-white/5" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full bg-white/5" />
            <Skeleton className="h-4 w-full bg-white/5" />
            <Skeleton className="h-4 w-5/6 bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-xl mx-auto py-40 text-center space-y-6 px-6">
        <ShieldAlert className="w-16 h-16 text-primary mx-auto opacity-50" />
        <h1 className="text-4xl font-headline font-black uppercase italic text-white">Intel <span className="text-primary">Corrupted</span></h1>
        <p className="text-muted-foreground">{error || "The article content is currently inaccessible."}</p>
        <Button asChild className="rust-gradient">
          <Link href="/news">RETURN TO HUB</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <Button variant="ghost" asChild className="text-muted-foreground hover:text-white -ml-4">
        <Link href="/news">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to News Feed
        </Link>
      </Button>

      <article className="space-y-10">
        <header className="space-y-6">
          <Badge className="bg-primary/20 text-primary border-primary/30 uppercase italic font-black">
            {article.category || "General Update"}
          </Badge>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-black uppercase tracking-widest border-b border-white/5 pb-8">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {article.date}</span>
            {article.author && <span className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /> {article.author}</span>}
            <div className="ml-auto flex gap-4">
              <Share2 className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </header>

        <div className="relative h-[55vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <Image 
            src={article.mainImageUrl} 
            alt={article.title} 
            fill 
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        <div className="glass-panel border-white/5 bg-card/20 rounded-3xl p-8 md:p-12">
          <div className="prose prose-invert max-w-none space-y-6 text-white/80 leading-relaxed text-lg whitespace-pre-wrap">
            {article.content}
          </div>
        </div>

        <footer className="pt-12 border-t border-white/5 flex flex-col items-center gap-6">
          <p className="text-muted-foreground text-sm">Original source available at Facepunch Studios.</p>
          <Button variant="outline" className="border-white/10 font-headline px-8" asChild>
            <a href={externalUrl as string} target="_blank" rel="noopener noreferrer">VIEW ORIGINAL POST</a>
          </Button>
        </footer>
      </article>
    </div>
  );
}
