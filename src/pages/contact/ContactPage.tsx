import { PageLayout } from "@/components/layout/PageLayout";
import { ContactForm } from "./components/ContactForm";
import { ContactInfo } from "./components/ContactInfo";
import { ContactHero } from "./components/ContactHero";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ data
const faqs = [
  {
    question: "What is the Fashionistas Valentine's Event?",
    answer: "The Fashionistas Valentine's Event is an exclusive fashion celebration combining style, romance, and creativity. It features designer showcases, interactive experiences, and networking opportunities for fashion enthusiasts."
  },
  {
    question: "How can I purchase tickets?",
    answer: "Tickets can be purchased through our online ticketing system. Simply select your desired ticket type and follow the checkout process. Group bookings are also available."
  },
  {
    question: "What's included in my ticket?",
    answer: "Your ticket includes access to all main event areas, fashion shows, networking sessions, and complimentary refreshments. VIP tickets include additional perks like exclusive access areas and special meet-and-greet opportunities."
  },
  {
    question: "Is there a dress code?",
    answer: "Yes, we encourage elegant and fashion-forward attire. Specific dress code guidelines will be sent with your ticket confirmation."
  }
];

export default function ContactPage() {
  return (
    <PageLayout>
      <ContactHero />
      
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-fashion-pink/20"
          >
            <h2 className="text-2xl font-bold text-fashion-pink mb-6">Send us a Message</h2>
            <ContactForm />
          </motion.div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-fashion-pink/20"
            >
              <ContactInfo />
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-fashion-pink/20"
            >
              <h2 className="text-2xl font-bold text-fashion-pink mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-200">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 