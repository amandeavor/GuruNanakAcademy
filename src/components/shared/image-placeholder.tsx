import React from 'react';
import { GraduationCap, LucideIcon } from 'lucide-react';

interface PremiumGradientPlaceholderProps {
  className?: string;
  icon?: LucideIcon;
  animate?: boolean;
}

export function PremiumGradientPlaceholder({
  className = '',
  icon: Icon = GraduationCap,
  animate = true,
}: PremiumGradientPlaceholderProps) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-purple-900/20 via-indigo-900/15 to-violet-950/25 border border-purple-500/10 flex items-center justify-center transition-all duration-300 ${className}`}
    >
      {/* Decorative premium radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.12),transparent_50%)]" />

      {/* Elegant background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_75%,transparent_100%)]" />

      {/* Abstract blur circles */}
      <div className={`absolute inset-0 opacity-20 pointer-events-none ${animate ? 'animate-pulse' : ''}`}>
        <div className="absolute top-1/4 left-1/3 w-24 h-24 rounded-full bg-primary/20 blur-[30px]" />
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-indigo-500/20 blur-[40px]" />
      </div>

      {/* Floating Center Icon */}
      <div className="relative z-10 flex flex-col items-center justify-center text-primary/30 dark:text-primary/50">
        <Icon className="h-10 w-10 stroke-[1.25] transition-transform duration-300" aria-hidden="true" />
      </div>
    </div>
  );
}
