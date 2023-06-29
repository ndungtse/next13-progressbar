'use client';
import { Link } from 'next13-progressbar';
import React from 'react';

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
