'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const paths = pathname.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-zinc-500 flex items-center gap-2">
      <Link href="/" className="hover:text-[#0a3d30]">Home</Link>
      {paths.map((path, idx) => {
        const url = `/${paths.slice(0, idx + 1).join('/')}`;
        const isLast = idx === paths.length - 1;
        const displayName = decodeURIComponent(path).replace(/-/g, ' ');

        return (
          <React.Fragment key={path}>
            <span>/</span>
            {isLast ? (
              <span className="capitalize text-zinc-800 font-semibold">{displayName}</span>
            ) : (
              <Link href={url} className="hover:text-[#0a3d30] capitalize">{displayName}</Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
