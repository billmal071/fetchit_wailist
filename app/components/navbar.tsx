'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ================= DESKTOP + TABLET ================= */}
      <div className="hidden sm:block px-4 sm:px-8 lg:px-[102px] pt-6 sm:pt-8 lg:pt-[50px]">
        <div className="mx-auto max-w-screen-2xl rounded-full bg-[#FAF7FF]/95 backdrop-blur px-6 sm:px-8 lg:px-[51px] py-3 sm:py-4 lg:py-[25.5px]">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/F_logo.svg"
                alt="Fetchit logo"
                width={48}
                height={48}
                className="lg:h-[51.84px] lg:w-[51.84px]"
              />
              <span className="text-lg sm:text-xl lg:text-[32px] font-medium text-black">
                Fetchit
              </span>
            </Link>

            {/* Links */}
            <div className="hidden md:flex gap-6 lg:gap-[30px] text-base lg:text-[22px]">
              <Link href="#about">About</Link>
              <Link href="#how-it-works">How it works</Link>
              <Link href="#testimonials">Testimonials</Link>
              <Link href="#faqs">FAQs</Link>
            </div>

            {/* Auth */}
            <div className="flex items-center gap-4 lg:gap-8">
              <Link href="/login" className="text-[#6639CA] text-sm lg:text-[22px]">
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center rounded-full bg-[#6639CA] px-4 py-2 text-sm lg:h-[55px] lg:w-[137px] lg:text-[22px] text-white"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="sm:hidden bg-[#FAF7FF] ">
        <nav className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/F_logo.svg" alt="Fetchit logo" width={24} height={24} />
            <span className="font-semibold text-black">Fetchit</span>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="text-black"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {open && (
          <div className="bg-[#FAF7FF]">
            <div className="flex flex-col gap-4 px-4 py-6 text-bllack">
              <Link href="#about" onClick={() => setOpen(false)}>About</Link>
              <Link href="#how-it-works" onClick={() => setOpen(false)}>How it works</Link>
              <Link href="#testimonials" onClick={() => setOpen(false)}>Testimonials</Link>
              <Link href="#faqs" onClick={() => setOpen(false)}>FAQs</Link>

              <div className="pt-4 flex flex-col gap-3">
                <Link href="/login" className="text-purple-400">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-purple-600 py-2 text-center text-white"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
