"use client";

import { useCollection, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where, orderBy, doc } from "firebase/firestore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, User, Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RelativeTime } from "@/components/ui/RelativeTime";

export default function SubCategoryPage() {
  const { subCategoryId } = useParams();
  const db = useFirestore();

  const subCategoryRef = useMemoFirebase(() => {
    return subCategoryId ? doc(db, "subCategories", subCategoryId as string) : null;
  }, [db, subCategoryId]);

  const { data: subCategory, isLoading: subLoading } = useDoc(subCategoryRef);

  const topicsQuery = useMemoFirebase(() => {
    return subCategoryId 
      ? query(collection(db, "topics"), where("subCategoryId", "==", subCategoryId), orderBy("lastReplyAt", "desc"))
      : null;
  }, [db, subCategoryId]);

  const { data: topics, isLoading: topicsLoading } = useCollection(topicsQuery);

  if (subLoading || topicsLoading) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <Button variant="ghost" asChild className="text-muted-foreground hover:text-white -ml-4">
        <Link href="/board">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Categories
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
        <div className="space-y-2">
          <Badge className="bg-primary/20 text-primary border-primary/30 uppercase italic font-black">Sub-Category</Badge>
          <h1 className="font-headline text-5xl font-black text-white tracking-tighter uppercase italic">
            {subCategory?.name || "Topics"}
          </h1>
          <p className="text-muted-foreground">{subCategory?.description}</p>
        </div>
        <Button asChild className="rust-gradient font-headline px-8 h-12">
          <Link href={`/board/new?subId=${subCategoryId}`}>
            NEW TOPIC
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {topics?.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-2xl border border-white/5">
            <p className="text-muted-foreground">No discussions here yet. Start the raid!</p>
          </div>
        ) : (
          topics?.map((topic) => (
            <Link key={topic.id} href={`/board/topic/${topic.id}`}>
              <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-all group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer">
                <div className="space-y-3 flex-1">
                  <h3 className="font-headline text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight italic">
                    {topic.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><User className="w-3 h-3 text-primary" /> {topic.authorName || "Survivor"}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-primary" /> <RelativeTime date={topic.createdAt} /></span>
                    <span className="flex items-center gap-1.5"><Eye className="w-3 h-3 text-primary" /> {topic.viewCount || 0} Views</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 shrink-0">
                  <div className="text-center">
                    <p className="text-white font-headline font-black text-2xl">{topic.replyCount || 0}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Replies</p>
                  </div>
                  <div className="hidden sm:block text-right border-l border-white/10 pl-8 min-w-[140px]">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Last Reply</p>
                    <div className="text-white text-[10px] font-black uppercase italic">
                      <RelativeTime date={topic.lastReplyAt} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}