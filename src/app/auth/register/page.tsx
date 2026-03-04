"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth, useUser } from "@/firebase";
import { initiateEmailSignUp, resendVerificationEmail } from "@/firebase/non-blocking-login";
import { Shield, Loader2, Mail, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if user is signed in AND email is verified
    if (user && user.emailVerified) {
      router.push("/");
    }
  }, [user, router]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    initiateEmailSignUp(auth, email, password);
  };

  const handleResend = () => {
    if (user) {
      resendVerificationEmail(user);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // If user exists but is not verified, show the verification info screen
  if (user && !user.emailVerified) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] px-6">
        <Card className="w-full max-w-md glass-panel border-white/10 text-center">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-primary p-3 rounded-xl">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="font-headline text-3xl font-black uppercase tracking-tighter italic">Check Your <span className="text-primary">Inbox</span></CardTitle>
              <CardDescription className="text-base">
                A verification link has been sent to <span className="text-white font-bold">{user.email}</span>. 
                Verify your account to unlock the full Rust365 experience.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              Didn't receive the link? Check your spam folder or try resending.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button asChild className="w-full rust-gradient font-headline uppercase tracking-widest h-12">
              <Link href="/">
                PROCEED TO HUB <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <div className="flex flex-col gap-2">
              <button 
                onClick={handleResend}
                className="text-xs text-primary hover:underline font-bold uppercase tracking-widest"
              >
                RESEND VERIFICATION LINK
              </button>
              <Link href="/auth/login" className="text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-widest">
                SIGN IN WITH DIFFERENT ACCOUNT
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-6">
      <Card className="w-full max-w-md glass-panel border-white/10">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="bg-primary p-3 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="font-headline text-3xl font-black uppercase tracking-tighter italic">Join the <span className="text-primary">Raid</span></CardTitle>
            <CardDescription>Create your Rust365 account to join the community.</CardDescription>
          </div>
        </Header>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                placeholder="SurvivorX" 
                className="glass-panel border-white/10" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                className="glass-panel border-white/10" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                className="glass-panel border-white/10" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full rust-gradient font-headline uppercase tracking-widest h-12">Register</Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-bold">LOGIN</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
