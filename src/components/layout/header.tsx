'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SCHOOL_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/button';

const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function ThemeToggle({
  className,
  mounted,
  theme,
  setTheme,
}: {
  className: string;
  mounted: boolean;
  theme?: string;
  setTheme: (theme: string) => void;
}) {
  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'text-foreground/70 transition-all duration-300 hover:text-foreground',
        className
      )}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
    </Button>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot
  );

  // Handle scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-border bg-background/95 backdrop-blur-md'
          : 'border-b border-border/60 bg-background'
      )}
    >
      <nav className="container-custom" role="navigation" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"
            aria-label={`${SCHOOL_INFO.name} - Home`}
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={42}
              height={42}
              className="h-10 w-10 object-contain"
            />
            <div className="block">
              <span className="block text-sm font-semibold leading-tight">{SCHOOL_INFO.name}</span>
              <span className="block text-xs text-muted-foreground">
                Est. {SCHOOL_INFO.founded}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex xl:items-center xl:gap-0">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                )}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}

            {/* Desktop Theme Toggle */}
            <ThemeToggle
              className="ml-2 h-9 w-9"
              mounted={mounted}
              theme={theme}
              setTheme={setTheme}
            />
          </div>

          {/* Right side - Mobile menu button */}
          <div className="flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <ThemeToggle
              className="h-10 w-10 xl:hidden"
              mounted={mounted}
              theme={theme}
              setTheme={setTheme}
            />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 xl:hidden"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background md:max-h-[calc(100dvh-5rem)] xl:hidden"
          >
            <div className="container-custom py-4">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'rounded-lg px-4 py-3 text-base font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                    )}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* CTA Buttons in Mobile */}
                <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                  <Button asChild size="lg">
                    <Link href="/admission/form" onClick={() => setIsMobileMenuOpen(false)}>
                      Apply for Admission
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="lg">
                    <Link href="/pay-fee" onClick={() => setIsMobileMenuOpen(false)}>
                      Pay Fee
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
