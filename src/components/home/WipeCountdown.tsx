"use client";

import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

/**
 * Calculates the next Rust Force Wipe date (First Thursday of the month at 19:00 UTC).
 */
function getNextWipeDate() {
  const now = new Date();
  let year = now.getUTCFullYear();
  let month = now.getUTCMonth();

  const getFirstThursday = (y: number, m: number) => {
    // Rust force wipes typically happen at 19:00 UTC / 2 PM EST
    const date = new Date(Date.UTC(y, m, 1, 19, 0, 0));
    while (date.getUTCDay() !== 4) { // 4 = Thursday
      date.setUTCDate(date.getUTCDate() + 1);
    }
    return date;
  };

  let wipeDate = getFirstThursday(year, month);

  // If we are already past this month's wipe, find next month's
  if (now >= wipeDate) {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    wipeDate = getFirstThursday(year, month);
  }

  return wipeDate;
}

export function WipeCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const target = getNextWipeDate();

    const updateTimer = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        // Recalculate if we hit zero
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch by rendering a placeholder during SSR
  if (!timeLeft) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase mb-8">
        <ShieldAlert className="w-4 h-4" />
        Calculating Next Wipe...
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase mb-8 animate-pulse">
      <ShieldAlert className="w-4 h-4" />
      Force Wipe in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
}
