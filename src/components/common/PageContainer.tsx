import type { ReactNode } from 'react';

type PageContainerProps = {
  title: string;
  eyebrow?: string;
  children?: ReactNode;
};

export default function PageContainer({ title, eyebrow, children }: PageContainerProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-app p-4">
      {eyebrow ? <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">{eyebrow}</p> : null}
      <h1 className="text-2xl font-bold text-ink">{title}</h1>
      <div className="mt-4 space-y-4">{children}</div>
    </main>
  );
}
