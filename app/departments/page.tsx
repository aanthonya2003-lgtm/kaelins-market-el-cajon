import type { Metadata } from 'next';
import { DepartmentsPageHero } from '@/components/sections/DepartmentsPageHero';
import { DepartmentIndex } from '@/components/sections/DepartmentIndex';
import { DepartmentDetail } from '@/components/sections/DepartmentDetail';
import { EngagementCTA } from '@/components/sections/EngagementCTA';
import { DEPARTMENT_DETAILS } from '@/lib/department-data';
import { BUSINESS } from '@/lib/business-data';

export const metadata: Metadata = {
  title: 'Departments — Two cultures. One mercado.',
  description:
    "Tortiller\u00eda, carnicer\u00eda, panader\u00eda, hot foods, dulcer\u00eda, produce. Mexican AND Arabic groceries under one roof. The largest butcher in El Cajon. Est. 1958.",
  alternates: {
    canonical: 'https://kaelins-market-el-cajon.vercel.app/departments',
  },
  openGraph: {
    title: "Kaelin's Market · Departments",
    description:
      'Bilingual departments: Mexican carnicer\u00eda, Arabic deli, fresh tortillas, hot food counter, panader\u00eda, dulcer\u00eda.',
    type: 'website',
  },
};

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://kaelins-market-el-cajon.vercel.app/departments',
  name: "Kaelin's Market — Departments",
  url: 'https://kaelins-market-el-cajon.vercel.app/departments',
  isPartOf: { '@id': 'https://kaelins-market-el-cajon.vercel.app/#store' },
  about: DEPARTMENT_DETAILS.map((d) => ({
    '@type': 'GroceryStore',
    name: d.en,
    alternateName: d.es,
    description: d.descShort,
  })),
  mainEntity: {
    '@type': 'GroceryStore',
    '@id': 'https://kaelins-market-el-cajon.vercel.app/#store',
    name: BUSINESS.name,
  },
};

export default function DepartmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <DepartmentsPageHero />
      <DepartmentIndex departments={DEPARTMENT_DETAILS} />
      {DEPARTMENT_DETAILS.map((dept, i) => (
        <DepartmentDetail key={dept.slug} department={dept} index={i} />
      ))}
      <EngagementCTA />
    </>
  );
}
