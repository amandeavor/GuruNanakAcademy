'use client';
import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function ShareButton({ title }: { title: string }) {
  const [status, setStatus] = useState('');
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setStatus('Link copied.');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setStatus('Copy the page address from your browser to share it.');
    }
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span role="status" className="text-xs text-muted-foreground">
        {status}
      </span>
      <Button variant="outline" size="sm" onClick={share}>
        <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
        Share
      </Button>
    </div>
  );
}
