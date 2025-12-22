'use client';

import type React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

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

      // Newsletter fades in
      gsap.fromTo(
        newsletterRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.1,
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

  const handleButtonHover = (isEnter: boolean) => {
    if (!buttonRef.current || isSubscribed) return;
    gsap.to(buttonRef.current, {
      scale: isEnter ? 1.05 : 1,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubscribed) return;

    setIsSubmitting(true);
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }

    setTimeout(() => {
      setEmail('');
      setIsSubmitting(false);
      setIsSubscribed(true);

      // Success animation
      if (successRef.current) {
        gsap.fromTo(
          successRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
          }
        );
      }

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 600);
  };

  return (
    <footer ref={footerRef} className="w-full bg-[#FFD101] py-8 text-black md:py-12 lg:py-16">
      <div className="flex flex-row items-center justify-between gap-[33.85px] px-[21.61px] md:justify-center md:gap-[103px] md:px-[83px]">
        <div ref={brandRef} className="flex flex-col gap-[6.51px] opacity-0 md:gap-[25px]">
          <div className="flex items-center gap-1">
            
              <Image src="/F_logo.svg" alt="Fetchit logo" width={100} height={100} className='md:h-[54px] md:w-[54px] h-[14.06px] w-[14.06px]' />
         
            <span className="text-[9.38px] font-medium text-black md:text-[32px]">Fetchit</span>
          </div>
          <p className="font-regular text-[6.51px] text-black md:text-[25px]">
            Everything You Need. Delivered.
          </p>
        </div>

        <div
          ref={newsletterRef}
          className="flex w-[141.41px] flex-col gap-[7.8px] opacity-0 md:w-[543px] md:gap-[30px]"
        >
          <h3 className="text-[5.21px] font-medium text-black md:text-[20px]">
            Join Our Newsletter
          </h3>
          <form
            onSubmit={handleSubscribe}
            className="relative flex gap-[3.91px] sm:flex-row sm:gap-[15px]"
          >
            <input
              type="email"
              placeholder="Enter your mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubscribed}
              className="h-[20.83px] w-[91.15px] rounded-full border-2 border-[#282828] bg-[#FBD93F]/80 px-4 py-2 text-sm text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-yellow-400 focus:outline-none disabled:opacity-50 md:h-20 md:w-[350px]"
            />
            {isSubscribed ? (
              <div
                ref={successRef}
                className="flex h-[20.83px] w-[46.35px] items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-2 text-white md:h-20 md:w-[170px]"
              >
                <Check size={20} className="h-3 w-3 md:h-6 md:w-6" />
                <span className="hidden text-[25px] md:inline">Done!</span>
              </div>
            ) : (
              <Button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => handleButtonHover(true)}
                onMouseLeave={() => handleButtonHover(false)}
                className="h-[20.83px] w-[46.35px] cursor-pointer !rounded-full !bg-black px-6 py-2 text-[6.51px] font-normal text-white transition-colors hover:!bg-gray-800 sm:w-auto md:h-20 md:w-[170px] md:text-[25px]"
              >
                {isSubmitting ? 'Sending...' : 'Subscribe'}
              </Button>
            )}
          </form>
        </div>

        <div
          ref={socialsRef}
          className="flex flex-col justify-start gap-[5.21px] md:justify-end md:gap-5"
        >
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) => handleSocialHover(e, true)}
            onMouseLeave={(e) => handleSocialHover(e, false)}
            className="flex h-[26.04px] w-[26.04px] cursor-pointer items-center justify-center rounded bg-white p-3 text-black opacity-0 hover:bg-gray-100 md:h-[100px] md:w-[100px] md:rounded-2xl"
            aria-label="X (Twitter)"
          >
            <Image src="/socials.svg" alt="Fetchit" width={100} height={100} className='md:h-10 md:w-10 h-[10.42px] w-[10.42px]' />
          </a>
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) => handleSocialHover(e, true)}
            onMouseLeave={(e) => handleSocialHover(e, false)}
            className="flex h-[26.04px] w-[26.04px] cursor-pointer items-center justify-center rounded bg-white p-3 text-black opacity-0 hover:bg-gray-100 md:h-[100px] md:w-[100px] md:rounded-2xl"
            aria-label="WhatsApp"
          >
            <Image src="/socials1.svg" alt="Fetchit" width={100} height={100} className='md:h-10 md:w-10 h-[10.42px] w-[10.42px]' />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) => handleSocialHover(e, true)}
            onMouseLeave={(e) => handleSocialHover(e, false)}
            className="flex h-[26.04px] w-[26.04px] cursor-pointer items-center justify-center rounded bg-white p-3 text-black opacity-0 hover:bg-gray-100 md:h-[100px] md:w-[100px] md:rounded-2xl"
            aria-label="Instagram"
          >
            <Image src="/socials2.svg" alt="Fetchit" width={100} height={100} className='md:h-10 md:w-10 h-[10.42px] w-[10.42px]' />
          </a>
        </div>
      </div>
    </footer>
  );
}

