import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFAQ from "@/components/contact/ContactFAQ";

export default function ContactPage() {
  return (
    <>

      {/* HERO */}
      <ContactHero />

      {/* FORM + INFO */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div>
            <ContactInfo />
          </div>

        </div>
      </section>

      {/* FAQ */}
      <ContactFAQ />

    </>
  );
}