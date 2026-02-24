import { ContactHero } from './contact-hero';
import { ContactMethods } from './contact-methods';
import { ContactForm } from './contact-form';
import { ContactFaq } from './contact-faq';

const ContactPage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-background via-default-50/30 to-background">
      <ContactHero />
      <ContactMethods />
      <ContactForm />
      <ContactFaq />
    </main>
  );
};

export default ContactPage;
