
"use client";

import { useState } from "react";
import { useDoc, useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc, serverTimestamp } from "firebase/firestore";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft, Send, User, Calendar, MessageCircle, Shield } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { setDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";

export default function TopicDetailPage() {
  const { topicId } = useParams();
  const { user } = useUser();
  const db = useFirestore();
  const [replyContent, setReplyContent] = useState("");

  const topicRef = useMemoFirebase(() => {
    return topicId ? doc(db, "topics", topicId as string) : null;
  }, [db, topicId]);

  const { data: topic, isLoading: topicLoading } = useDoc(topicRef);

  const postsQuery = useMemoFirebase(() => {
    return topicId ? query(collection(db, "topics", topicId as string, "posts"), orderBy("createdAt", "asc")) : null;
  }, [db, topicId]);

  const { data: posts, isLoading: postsLoading } = useCollection(postsQuery);

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !topic || !replyContent.trim()) return;

    const postsRef = collection(db, "topics", topic.id, "posts");
    const newPostRef = doc(postsRef);
    const now = new Date().toISOString();

    const postData = {
      id: newPostRef.id,
      topicId: topic.id,
      authorId: user.uid,
      authorName: user.email?.split('@')[0] || "Survivor",
      content: replyContent,
      createdAt: now,
    };

    setDocumentNonBlocking(newPostRef, postData, { merge: true });
    
    // Update topic stats
    updateDocumentNonBlocking(topicRef!, {
      replyCount: (topic.replyCount || 0) + 1,
      lastReplyAt: now,
      updatedAt: now,
    });

    setReplyContent("");
  };

  if (topicLoading || postsLoading) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="max-w-xl mx-auto py-40 text-center space-y-6">
        <h1 className="text-4xl font-headline font-black uppercase italic">Topic <span className="text-primary">Not Found</span></h1>
        <p className="text-muted-foreground">This loot room is empty. The topic might have been deleted or moved.</p>
        <Button asChild className="rust-gradient">
          <Link href="/board">RETURN TO HUB</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <Button variant="ghost" asChild className="text-muted-foreground hover:text-white -ml-4">
        <Link href={`/board/sub/${topic.subCategoryId}`}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Discussions
        </Link>
      </Button>

      {/* Main Topic Content */}
      <div className="space-y-6">
        <div className="space-y-4">
          <Badge className="bg-primary/20 text-primary border-primary/30 uppercase italic font-black">Topic Discussion</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-tight">
            {topic.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-black uppercase tracking-widest">
            <span className="flex items-center gap-2 text-white"><User className="w-4 h-4 text-primary" /> {topic.authorName || "Survivor"}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true })}</span>
            <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-primary" /> {topic.replyCount || 0} Replies</span>
          </div>
        </div>

        <Card className="glass-panel border-white/10 bg-card/40">
          <CardContent className="p-8 md:p-12 prose prose-invert max-w-none">
            <p className="text-xl text-white/90 leading-relaxed whitespace-pre-wrap">{topic.content}</p>
          </CardContent>
        </Card>
      </div>

      {/* Replies List */}
      <div className="space-y-6">
        <h3 className="font-headline text-2xl font-black text-white uppercase italic tracking-tighter border-b border-white/5 pb-4">
          Tactical <span className="text-primary">Replies</span>
        </h3>
        
        {posts?.map((post, idx) => (
          <div key={post.id} className="flex gap-4">
            <div className="hidden md:flex flex-col items-center gap-2 shrink-0">
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="h-full w-px bg-gradient-to-b from-white/10 to-transparent" />
            </div>
            
            <Card className="flex-1 glass-panel border-white/5 bg-card/20">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-primary uppercase italic">{post.authorName || "Survivor"}</span>
                    <Badge variant="outline" className="text-[8px] border-white/10 text-muted-foreground uppercase">#{idx + 1}</Badge>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                </div>
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{post.content}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Reply Form */}
      <div className="pt-8 space-y-6">
        {!user ? (
          <div className="glass-panel p-12 text-center rounded-2xl border border-white/5 space-y-4">
            <Shield className="w-12 h-12 text-primary mx-auto opacity-50" />
            <h4 className="font-headline text-2xl font-black text-white uppercase italic">Access Restricted</h4>
            <p className="text-muted-foreground">You must be logged in to join the conversation.</p>
            <Button asChild className="rust-gradient">
              <Link href="/auth/login">LOGIN TO REPLY</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handlePostReply} className="space-y-4">
            <h4 className="font-headline text-xl font-black text-white uppercase italic">Join the <span className="text-primary">Intel</span></h4>
            <Textarea 
              placeholder="Deploy your tactical thoughts here..." 
              className="glass-panel border-white/10 min-h-[150px] text-lg focus:ring-primary"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <Button type="submit" className="rust-gradient font-headline px-12 h-14 uppercase tracking-widest">
                <Send className="mr-2 w-5 h-5" />
                POST REPLY
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
