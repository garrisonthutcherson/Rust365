
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFirestore, useUser } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Shield, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function SeedPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const [isSeeding, setIsSeeding] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const categories = [
    { id: "hub", name: "General Hub", order: 1, description: "The main gathering place for survivors." },
    { id: "tactical", name: "Tactical Room", order: 2, description: "Strategies, base designs, and raiding intel." },
    { id: "support", name: "Support", order: 3, description: "Technical help and community meta." },
  ];

  const subCategories = [
    { id: "general", categoryId: "hub", name: "General Discussion", order: 1, description: "Talk about anything Rust related.", topicCount: 0, postCount: 0 },
    { id: "intro", categoryId: "hub", name: "Introductions", order: 2, description: "New to the island? Say hello here.", topicCount: 0, postCount: 0 },
    { id: "building", categoryId: "tactical", name: "Base Building", order: 1, description: "Show off your honeycombs and circuits.", topicCount: 0, postCount: 0 },
    { id: "pvp", categoryId: "tactical", name: "Raiding & PvP", order: 2, description: "Tips for dominating monument runs and raids.", topicCount: 0, postCount: 0 },
    { id: "bugs", categoryId: "support", name: "Bug Reports", order: 1, description: "Encountered a glitch? Report it here.", topicCount: 0, postCount: 0 },
  ];

  const handleSeed = async () => {
    if (!user) return;
    setIsSeeding(true);

    try {
      // Seed Categories
      for (const cat of categories) {
        await setDoc(doc(db, "categories", cat.id), cat);
      }

      // Seed Sub-Categories
      for (const sub of subCategories) {
        await setDoc(doc(db, "subCategories", sub.id), sub);
      }

      setIsComplete(true);
    } catch (error) {
      console.error("Error seeding board:", error);
    } finally {
      setIsSeeding(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center space-y-6">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto" />
        <h1 className="text-3xl font-headline font-black uppercase italic">Admin <span className="text-primary">Required</span></h1>
        <p className="text-muted-foreground">You must be logged in to initialize the database.</p>
        <Button asChild className="rust-gradient">
          <Link href="/auth/login">LOGIN AS ADMIN</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <Card className="glass-panel border-white/10">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary p-3 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="font-headline text-3xl font-black uppercase italic">Board <span className="text-primary">Initializer</span></CardTitle>
            <CardDescription>Deploy the initial tactical structure for your message board.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isComplete ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                This utility will create the following structure in your Firestore database:
              </p>
              <ul className="text-sm space-y-2 list-disc list-inside text-white/80">
                <li><strong>General Hub</strong> (Discussion, Introductions)</li>
                <li><strong>Tactical Room</strong> (Base Building, Raiding & PvP)</li>
                <li><strong>Support</strong> (Bug Reports)</li>
              </ul>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <h3 className="font-headline text-2xl font-bold text-white">Board Deployed Successfully!</h3>
              <p className="text-muted-foreground">The categories and sub-categories are now live.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!isComplete ? (
            <Button 
              onClick={handleSeed} 
              disabled={isSeeding}
              className="w-full rust-gradient h-16 font-headline text-lg uppercase tracking-widest"
            >
              {isSeeding ? (
                <>
                  <Loader2 className="mr-2 w-6 h-6 animate-spin" />
                  DEPLOYING INTEL...
                </>
              ) : (
                "INITIALIZE BOARD STRUCTURE"
              )}
            </Button>
          ) : (
            <Button asChild className="w-full rust-gradient h-16 font-headline text-lg uppercase tracking-widest">
              <Link href="/board">PROCEED TO MESSAGE BOARD</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
