'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const scrollToForm = () => {
    const formSection = document.querySelector('#waitlist-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

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

            {/* CTA */}
            <button
              onClick={scrollToForm}
              className="flex items-center justify-center rounded-full bg-[#6639CA] px-6 py-2 text-sm lg:h-[55px] lg:px-8 lg:text-[22px] text-white hover:bg-[#5530a8] transition-colors"
            >
              Join Waitlist
            </button>
          </nav>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="sm:hidden bg-[#FAF7FF]">
        <nav className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/F_logo.svg" alt="Fetchit logo" width={24} height={24} />
            <span className="font-semibold text-black">Fetchit</span>
          </Link>

          <button
            onClick={scrollToForm}
            className="rounded-full bg-[#6639CA] px-4 py-2 text-sm text-white hover:bg-[#5530a8] transition-colors"
          >
            Join Waitlist
          </button>
        </nav>
      </div>
    </header>
  );
}
