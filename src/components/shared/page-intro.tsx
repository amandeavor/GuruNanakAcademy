import Link from 'next/link';
import type { ReactNode } from 'react';
export function PageIntro({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="container-custom">
        <nav aria-label="Breadcrumb" className="page-breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{label}</span>
        </nav>
        <div className="page-intro-grid">
          <div>
            <p className="eyebrow">Guru Nanak Academy</p>
            <h1>{title}</h1>
          </div>
          <div>
            <p className="page-intro-description">{description}</p>
            {children && <div className="page-intro-actions">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
