'use client';
import React from 'react';
import Link from 'next/link';
// import { useRouter } from '../../../dist';
import { useRouter } from 'next13-progressbar';

const NavBar = () => {
  const router = useRouter();
  return (
    <div className="navbar">
      <Link href={'/'}>Home</Link>
      <Link href={'/about'}>About</Link>
      <Link href={'/contact'}>Contact</Link>
      <button onClick={() => router.push('/button-link#34')}>ButtonLink</button>
      <Link href={'#'}>HashLink</Link>
      <Link href={'/contact/#44'}>HashLink1</Link>
      <button onClick={() => router.replace('/about')}>Replace</button>
    </div>
  );
};

export default NavBar;
