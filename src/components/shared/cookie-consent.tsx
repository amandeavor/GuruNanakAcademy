'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      // Delay showing the banner
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:bottom-4 md:left-4 md:right-auto md:max-w-md"
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-description"
        >
          <div className="relative rounded-md border border-border bg-card p-5 shadow-soft-lg">
            {/* Close button */}
            <button
              onClick={handleDecline}
              className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground"
              aria-label="Close cookie notice"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="mb-4 flex items-start gap-3 pr-8">
              <div>
                <h3 id="cookie-title" className="text-base font-semibold text-foreground">
                  Cookie Notice
                </h3>
                <p id="cookie-description" className="mt-1 text-sm text-muted-foreground">
                  We use cookies to enhance your experience. By continuing to visit this site you
                  agree to our use of cookies.{' '}
                  <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                    Contact us
                  </Link>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={handleAccept} className="flex-1">
                Accept
              </Button>
              <Button variant="outline" onClick={handleDecline} className="flex-1">
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
