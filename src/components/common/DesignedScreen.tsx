import type { ReactNode } from 'react';

type DesignedScreenProps = {
  src: string;
  alt: string;
  children?: ReactNode;
};

export default function DesignedScreen({ src, alt, children }: DesignedScreenProps) {
  return (
    <main className="relative flex flex-1 overflow-hidden bg-white">
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      {children}
    </main>
  );
}
