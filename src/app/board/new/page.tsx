"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFirestore, useUser } from "@/firebase";
import { collection, doc, serverTimestamp } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function NewTopicPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useUser();
  const db = useFirestore();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const topicsRef = collection(db, "topics");
    const newTopicRef = doc(topicsRef);
    const now = new Date().toISOString();

    const topicData = {
      id: newTopicRef.id,
      title,
      content,
      authorId: user.uid,
      createdAt: now,
      updatedAt: now,
      lastReplyAt: now,
      replyCount: 0,
      viewCount: 0,
    };

    setDocumentNonBlocking(newTopicRef, topicData, { merge: true });
    router.push("/board");
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-6">
        <h1 className="text-3xl font-headline font-black uppercase italic">Access <span className="text-primary">Denied</span></h1>
        <p className="text-muted-foreground">You must be logged in to create a new topic.</p>
        <Button asChild className="rust-gradient">
          <Link href="/auth/login">LOGIN TO CONTINUE</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <Button variant="ghost" asChild className="text-muted-foreground hover:text-white">
        <Link href="/board">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Board
        </Link>
      </Button>

      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-black uppercase tracking-tighter italic">
            Start a <span className="text-primary">Conversation</span>
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Topic Title</Label>
              <Input 
                id="title" 
                placeholder="e.g., How to defend against a 10-man zerg?" 
                className="glass-panel border-white/10 h-12 text-lg" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                placeholder="Share your thoughts, guides, or questions..." 
                className="glass-panel border-white/10 min-h-[200px]" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full rust-gradient font-headline uppercase tracking-widest h-14">
              <Send className="mr-2 w-5 h-5" />
              POST TOPIC
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
