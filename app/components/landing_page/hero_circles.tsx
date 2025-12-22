'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export default function HeroCircles() {
  const RADIUS = 30;
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Path drawing animation
      pathRefs.current.forEach((path, index) => {
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            delay: index * 0.3,
            ease: 'power2.inOut',
          });
        }
      });

      // Circles entrance animation with stagger
      gsap.fromTo(
        circleRefs.current,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.5,
          ease: 'back.out(1.7)',
        }
      );

      // Motion path configuration for each circle
      // Maps circles to paths: path 0 (black), path 1 (yellow), path 2 (purple)
      const motionConfig = [
        { pathIndex: 0, duration: 20, startAt: 0.05, direction: 1 },
        { pathIndex: 1, duration: 25, startAt: 0.1, direction: -1 },
        { pathIndex: 2, duration: 22, startAt: 0.85, direction: 1 },
        { pathIndex: 1, duration: 28, startAt: 0.6, direction: -1 },
        { pathIndex: 2, duration: 24, startAt: 0.4, direction: 1 },
        { pathIndex: 0, duration: 26, startAt: 0.5, direction: -1 },
        { pathIndex: 0, duration: 23, startAt: 0.25, direction: 1 },
      ];

      circleRefs.current.forEach((circle, index) => {
        if (circle && pathRefs.current[motionConfig[index].pathIndex]) {
          const config = motionConfig[index];
          const path = pathRefs.current[config.pathIndex];

          gsap.to(circle, {
            motionPath: {
              path: path!,
              align: path!,
              alignOrigin: [0.5, 0.5],
              start: config.startAt,
              end: config.startAt + config.direction,
            },
            duration: config.duration,
            repeat: -1,
            ease: 'none',
            delay: 1.5,
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const setPathRef = (index: number) => (el: SVGPathElement | null) => {
    pathRefs.current[index] = el;
  };

  const setCircleRef = (index: number) => (el: SVGCircleElement | null) => {
    circleRefs.current[index] = el;
  };

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[700px] aspect-[596/449]">
      <svg
        viewBox="0 0 596 449"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }} 
      >
        {/* BACKGROUND PATHS */}
        <path
          ref={setPathRef(0)}
          d="M285.037 1.77649C337.281 1.77649 390.176 21.9039 427.2 55.6056C464.216 89.2989 485.352 136.537 474.174 190.807C462.968 245.215 441.775 292.526 410.345 326.229C378.925 359.92 337.258 380.03 285.037 380.03C180.585 380.03 95.9104 295.355 95.9104 190.903C95.9105 86.4515 180.585 1.77659 285.037 1.77649Z"
          stroke="#010101"
          strokeWidth="0.95893"
        />
        <path
          ref={setPathRef(1)}
          d="M421.812 61.1778C469.821 81.7058 504.903 113.088 524.345 150.584C543.784 188.075 547.606 231.712 533.043 276.797C504.045 366.575 414.217 428.133 318.362 387.147C270.332 366.61 232.262 336.688 211.331 299.93C190.411 263.192 186.586 219.58 207.115 171.569C227.672 123.49 257.398 85.6451 293.941 64.9462C330.465 44.258 373.847 40.6691 421.812 61.1778Z"
          stroke="#FFD101"
          strokeWidth="0.95893"
        />
        <path
          ref={setPathRef(2)}
          d="M166.738 41.4335C224.254 36.0829 277.253 40.1011 318.813 57.9023C360.346 75.6927 390.472 107.254 402.283 157.067C414.281 207.672 398.723 255.933 367.288 293.571C335.849 331.214 288.54 358.212 237.096 366.257C185.346 374.351 131.069 362.765 89.1608 336.082C47.2582 309.403 17.746 267.649 15.4419 215.392C13.4564 170.361 22.5995 129.549 46.5488 98.6669C70.4905 67.795 109.282 46.7785 166.738 41.4335Z"
          stroke="#6639CA"
          strokeWidth="0.95893"
        />

        {/* CIRCULAR IMAGE ELEMENTS */}
        <circle ref={setCircleRef(0)} cx={140 + RADIUS} cy={20 + RADIUS} r={RADIUS} fill="url(#pattern0)" />
        <circle ref={setCircleRef(1)} cx={422 + RADIUS} cy={45 + RADIUS} r={RADIUS} fill="url(#pattern1)" />
        <circle ref={setCircleRef(2)} cx={244 + RADIUS} cy={322 + RADIUS} r={RADIUS} fill="url(#pattern2)" />
        <circle ref={setCircleRef(3)} cx={490 + RADIUS} cy={297 + RADIUS} r={RADIUS} fill="url(#pattern3)" />
        <circle ref={setCircleRef(4)} cx={0 + RADIUS} cy={247 + RADIUS} r={RADIUS} fill="url(#pattern4)" />
        <circle ref={setCircleRef(5)} cx={186 + RADIUS} cy={157 + RADIUS} r={RADIUS} fill="url(#pattern5)" />
        <circle ref={setCircleRef(6)} cx={293 + RADIUS} cy={37 + RADIUS} r={RADIUS} fill="url(#pattern6)" />

        {/* DEFINITIONS FOR PATTERNS */}
        <defs>
          <pattern id="pattern0" patternUnits="objectBoundingBox" width={1} height={1}>
            <image
              href="/Rectangle 1.svg"
              width={2 * RADIUS}
              height={2 * RADIUS}
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
          <pattern id="pattern1" patternUnits="objectBoundingBox" width={1} height={1}>
            <image
              href="/Rectangle 2.svg"
              width={2 * RADIUS}
              height={2 * RADIUS}
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
          <pattern id="pattern2" patternUnits="objectBoundingBox" width={1} height={1}>
            <image
              href="/Rectangle 3.svg"
              width={2 * RADIUS}
              height={2 * RADIUS}
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
          <pattern id="pattern3" patternUnits="objectBoundingBox" width={1} height={1}>
            <image
              href="/Rectangle 4.svg"
              width={2 * RADIUS}
              height={2 * RADIUS}
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
          <pattern id="pattern4" patternUnits="objectBoundingBox" width={1} height={1}>
            <image
              href="/Rectangle 5.svg"
              width={2 * RADIUS}
              height={2 * RADIUS}
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
          <pattern id="pattern5" patternUnits="objectBoundingBox" width={1} height={1}>
            <image
              href="/Rectangle 6.svg"
              width={2 * RADIUS}
              height={2 * RADIUS}
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
          <pattern id="pattern6" patternUnits="objectBoundingBox" width={1} height={1}>
            <image
              href="/Rectangle 7.svg"
              width={2 * RADIUS}
              height={2 * RADIUS}
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>
      </svg>
    </div>
  );
}
