/**
 * Kaelin's Market — Motion Specification
 * Single source of truth. Used by GSAP, Framer Motion, and CSS.
 * All transitions are bidirectional. once: true is BANNED.
 */

export const motion = {
  ease: {
    out: [0.22, 1, 0.36, 1] as const,
    inOut: [0.83, 0, 0.17, 1] as const,
    soft: [0.4, 0, 0.2, 1] as const,
  },
  duration: {
    micro: 0.2,
    fast: 0.4,
    standard: 0.7,
    cinematic: 1.2,
    epic: 1.6,
    kenburns: 18,
  },
  stagger: {
    tight: 0.05,
    std: 0.08,
    hero: 0.12,
  },
  lenis: {
    lerp: 0.08,
    smoothWheel: true,
    wheelMultiplier: 1.0,
  },
} as const;

/** GSAP ScrollTrigger default toggleActions — bidirectional. */
export const SCROLL_TOGGLE = 'play none none reverse';
