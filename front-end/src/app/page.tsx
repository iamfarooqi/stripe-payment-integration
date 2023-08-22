'use client';
import CheckoutButton from '@/components/checkOut';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="h-screen border flex justify-center items-center">
      <CheckoutButton />
    </div>
  );
}
