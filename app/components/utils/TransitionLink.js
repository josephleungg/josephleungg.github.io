'use client';
import Link from 'next/link'
import React from 'react'
import { useRouter } from "next/navigation"

export default function TransitionLink({children, href,...props }) {
  const router = useRouter();

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleTransition = async (e) => {
    e.preventDefault();

    const body = document.getElementById('content');

    body.classList.add('page-transition');

    await sleep(200);

    router.push(href);

    await sleep(200);

    body.classList.remove('page-transition');
  }

  return (
    <Link 
      onClick={handleTransition}
      href={href}
      {...props}
    >
      {children}
    </Link>
  )
}