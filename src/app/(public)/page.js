import Hero from "@/components/home/Hero";
import Platforms from "@/components/home/Platforms";
import Services from "@/components/home/Services";
import Products from "@/components/home/Products";
import Tools from "@/components/home/Tools";
import Journal from "@/components/home/Journal";
import CtaTestimonials from "@/components/home/CtaTestimonials";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
export default function Home() {
  return (
    <>
     <OrganizationSchema />
      <Hero />
      <Platforms />
      <Services />
      <Products />
      <Tools />
      <Journal />
      <CtaTestimonials />

    </>
  );
}