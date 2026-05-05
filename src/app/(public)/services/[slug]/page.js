import services from '@/data/services'
import ServiceHero from '@/components/services/single/ServiceHero'
import ServiceStats from '@/components/services/single/ServiceStats'
import ServiceFeatures from '@/components/services/single/ServiceFeatures'
import ServicePricing from '@/components/services/single/ServicePricing'
import ServiceProcess from '@/components/services/single/ServiceProcess'
import ServicePortfolio from '@/components/services/single/ServicePortfolio'
import ServiceTestimonials from '@/components/services/single/ServiceTestimonials'
import ServiceFAQ from '@/components/services/single/ServiceFAQ'

export default function ServicePage ({ params }) {
  const slug = params?.slug

  const service = services.find(s => s.slug === slug)

  const data = service || services[0]

  return (
    <>
      {/* HERO + STATS WRAPPER */}
      <section className='relative hero-gradient overflow-hidden'>
        {/* Glow Effects (GLOBAL) */}
        <div className='hero-glow-purple -top-24 right-[-120px]' />
        <div className='hero-glow-blue top-[200px] left-[-120px]' />

        <ServiceHero data={data} />
        <ServiceStats />
      </section>

      {/* ✅ MERGED SECTION (FIGMA STYLE) */}
      <section className='py-20 bg-[#F8FAFC]'>
        <div className='max-w-[1240px] mx-auto px-6 grid lg:grid-cols-4 gap-12 items-start'>
          {/* LEFT (1/4) */}
          <ServiceFeatures data={data} />

          {/* RIGHT (3/4) */}
          <ServicePricing pricing={data.pricing} />
        </div>
      </section>

      <ServiceProcess process={data.process} />
      <ServicePortfolio />
      <ServiceTestimonials />
      <ServiceFAQ faq={data.faq} />
    </>
  )
}
