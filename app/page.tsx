import { Hero } from '@/components/sections/Hero';
import { SocialProofStrip } from '@/components/sections/SocialProofStrip';
import { WeeklyAdEmbed } from '@/components/sections/WeeklyAdEmbed';
import { DepartmentsGrid } from '@/components/sections/DepartmentsGrid';
import { SignatureDishes } from '@/components/sections/SignatureDishes';
import { HeritageBlock } from '@/components/sections/HeritageBlock';
import { LoyaltyAppCardCTA } from '@/components/sections/LoyaltyAppCardCTA';
import { InstagramFeed } from '@/components/sections/InstagramFeed';
import { TestimonialsMarquee } from '@/components/sections/TestimonialsMarquee';
import { EngagementCTA } from '@/components/sections/EngagementCTA';

/**
 * Home page composition order — per Edit 2.
 * WeeklyAd moved to position 3 (highest-intent conversion path).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <SocialProofStrip />
      <WeeklyAdEmbed />
      <DepartmentsGrid />
      <SignatureDishes />
      <HeritageBlock />
      <LoyaltyAppCardCTA />
      <InstagramFeed />
      <TestimonialsMarquee />
      <EngagementCTA />
    </>
  );
}
