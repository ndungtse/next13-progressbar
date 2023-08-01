'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from '../../../dist';

const NavBar = () => {
  const router = useRouter();
  return (
    <div className="navbar">
      <Link href={'/'}>Home</Link>
      <Link href={'/about'}>About</Link>
      <Link href={'/contact'}>Contact</Link>
      <button onClick={() => router.push('/button-link')}>ButtonLink</button>
    </div>
  );
};

export default NavBar;
