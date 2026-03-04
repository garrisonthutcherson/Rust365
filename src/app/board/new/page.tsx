
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase";
import { collection, doc, query, orderBy } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewTopicPage() {
  const searchParams = useSearchParams();
  const subIdParam = searchParams.get("subId");
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedSubId, setSelectedSubId] = useState(subIdParam || "");
  
  const { user } = useUser();
  const db = useFirestore();
  const router = useRouter();

  const subCategoriesQuery = useMemoFirebase(() => {
    return query(collection(db, "subCategories"), orderBy("order", "asc"));
  }, [db]);

  const { data: subCategories, isLoading: subsLoading } = useCollection(subCategoriesQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedSubId) return;

    const topicsRef = collection(db, "topics");
    const newTopicRef = doc(topicsRef);
    const now = new Date().toISOString();

    const topicData = {
      id: newTopicRef.id,
      subCategoryId: selectedSubId,
      title,
      content,
      authorId: user.uid,
      authorName: user.email?.split('@')[0] || "Survivor",
      createdAt: now,
      updatedAt: now,
      lastReplyAt: now,
      replyCount: 0,
      viewCount: 0,
    };

    setDocumentNonBlocking(newTopicRef, topicData, { merge: true });
    router.push(`/board/topic/${newTopicRef.id}`);
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-6">
        <h1 className="text-3xl font-headline font-black uppercase italic">Access <span className="text-primary">Denied</span></h1>
        <p className="text-muted-foreground">You must be logged in to deploy a new discussion.</p>
        <Button asChild className="rust-gradient">
          <Link href="/auth/login">LOGIN TO CONTINUE</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <Button variant="ghost" asChild className="text-muted-foreground hover:text-white -ml-4">
        <Link href="/board">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Board
        </Link>
      </Button>

      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-black uppercase tracking-tighter italic">
            Deploy New <span className="text-primary">Intel</span>
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Target Sub-Category</Label>
              <Select value={selectedSubId} onValueChange={setSelectedSubId} required>
                <SelectTrigger className="glass-panel border-white/10 h-12">
                  <SelectValue placeholder="Select a sub-category" />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  {subCategories?.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id} className="focus:bg-primary/20">
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Discussion Title</Label>
              <Input 
                id="title" 
                placeholder="e.g., Tactical 2x2 Base Design for Solos" 
                className="glass-panel border-white/10 h-12 text-lg" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Intel Content</Label>
              <Textarea 
                id="content" 
                placeholder="Share your tactical insights, guides, or questions..." 
                className="glass-panel border-white/10 min-h-[250px] text-lg" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full rust-gradient font-headline uppercase tracking-widest h-16 text-lg">
              <Send className="mr-2 w-6 h-6" />
              POST DISCUSSION
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
