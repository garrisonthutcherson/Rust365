"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface RelativeTimeProps {
  date: string | number | Date;
  className?: string;
}

/**
 * A client-side only component to render relative time.
 * Prevents hydration errors by deferring the render of the time string until after the component mounts.
 */
export function RelativeTime({ date, className }: RelativeTimeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className={className}>...</span>;
  }

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return <span className={className}>{formatDistanceToNow(dateObj, { addSuffix: true })}</span>;
  } catch (e) {
    return <span className={className}>Invalid date</span>;
  }
}
