'use client';
import React from 'react';
import Link from 'next/link';

const NavBar = () => {
  return (
    <div className="navbar">
      <Link href={'/'}>Home</Link>
      <Link href={'/about'}>About</Link>
      <Link href={'/contact'}>Contact</Link>
    </div>
  );
};

export default NavBar;
