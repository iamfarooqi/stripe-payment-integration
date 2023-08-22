'use client';

import Success from '@/components/success';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="h-screen border flex flex-col justify-center items-center">
      <Success />
      <Link href="/">Go to Home</Link>
    </div>
  );
}
