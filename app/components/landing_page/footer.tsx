'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Brand section slides in from left
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Social icons stagger in from right with bounce
      const socialLinks = socialsRef.current?.children;
      if (socialLinks) {
        gsap.fromTo(
          socialLinks,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.2,
            ease: 'bounce.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSocialHover = (e: React.MouseEvent<HTMLAnchorElement>, isEnter: boolean) => {
    gsap.to(e.currentTarget, {
      y: isEnter ? -5 : 0,
      scale: isEnter ? 1.1 : 1,
      duration: 0.3,
      ease: 'back.out(1.7)',
    });
  };

  return (
    <footer ref={footerRef} className="w-full bg-[#FFD101] py-8 text-black md:py-12 lg:py-16">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-[83px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div ref={brandRef} className="flex flex-col gap-2 opacity-0">
            <div className="flex items-center gap-2">
              <Image
                src="/F_logo.svg"
                alt="Fetchit logo"
                width={100}
                height={100}
                className="md:h-[54px] md:w-[54px] h-8 w-8"
              />
              <span className="text-xl font-medium text-black md:text-[32px]">Fetchit</span>
            </div>
            <p className="text-sm text-black md:text-lg">
              Everything You Need. Delivered.
            </p>
          </div>

          {/* Social Links */}
          <div
            ref={socialsRef}
            className="flex flex-row gap-4 md:gap-5"
          >
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => handleSocialHover(e, true)}
              onMouseLeave={(e) => handleSocialHover(e, false)}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-white p-3 text-black opacity-0 hover:bg-gray-100 md:h-[70px] md:w-[70px]"
              aria-label="X (Twitter)"
            >
              <Image
                src="/socials.svg"
                alt="Twitter"
                width={100}
                height={100}
                className="md:h-8 md:w-8 h-6 w-6"
              />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => handleSocialHover(e, true)}
              onMouseLeave={(e) => handleSocialHover(e, false)}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-white p-3 text-black opacity-0 hover:bg-gray-100 md:h-[70px] md:w-[70px]"
              aria-label="WhatsApp"
            >
              <Image
                src="/socials1.svg"
                alt="WhatsApp"
                width={100}
                height={100}
                className="md:h-8 md:w-8 h-6 w-6"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => handleSocialHover(e, true)}
              onMouseLeave={(e) => handleSocialHover(e, false)}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-white p-3 text-black opacity-0 hover:bg-gray-100 md:h-[70px] md:w-[70px]"
              aria-label="Instagram"
            >
              <Image
                src="/socials2.svg"
                alt="Instagram"
                width={100}
                height={100}
                className="md:h-8 md:w-8 h-6 w-6"
              />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-black/20 text-center">
          <p className="text-sm text-black/70">
            &copy; {new Date().getFullYear()} Fetchit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
