'use client';
import Error from '@/components/error';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="h-screen border flex flex-col justify-center items-center">
      <Error />
      <Link href="/">Go to Home</Link>
    </div>
  );
}
