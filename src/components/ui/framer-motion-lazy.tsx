'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';

export function FramerMotionLazy({ children }: { children: React.ReactNode }) {
    return (
        <LazyMotion features={domAnimation}>
            {children}
        </LazyMotion>
    );
}

export { m };
