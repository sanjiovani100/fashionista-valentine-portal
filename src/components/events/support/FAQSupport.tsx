import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Grid, GridItem } from '@/components/layout/Grid';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Search,
  HelpCircle,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  Tag,
  Clock,
  CreditCard,
  Users,
  MapPin,
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'tickets' | 'venue' | 'schedule' | 'guidelines';
}

interface ContactInfo {
  email: string;
  phone: string;
  hours: string;
  response_time: string;
}

interface FAQSupportProps {
  faqs: FAQItem[];
  contactInfo: ContactInfo;
}

const CATEGORY_ICONS = {
  general: HelpCircle,
  tickets: CreditCard,
  venue: MapPin,
  schedule: Clock,
  guidelines: FileText,
};

const CATEGORY_LABELS = {
  general: 'General Information',
  tickets: 'Tickets & Pricing',
  venue: 'Venue & Location',
  schedule: 'Schedule & Program',
  guidelines: 'Event Guidelines',
};

export const FAQSupport = ({ faqs, contactInfo }: FAQSupportProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group FAQs by category
  const faqsByCategory = useMemo(() => {
    return faqs.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {} as Record<string, FAQItem[]>);
  }, [faqs]);

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    let filtered = faqs;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        faq =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    return filtered;
  }, [faqs, searchQuery, selectedCategory]);

  return (
    <Section
      variant="alternate"
      spacing="wide"
      className="bg-gradient-to-b from-black/40 to-black/20"
    >
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-fashion-pink font-montserrat">
            FAQ & Support
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter">
            Find answers to common questions and get support for your fashion week experience
          </p>
        </div>

        {/* Search and Categories */}
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 bg-black/20 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={`${
                selectedCategory === null
                  ? 'bg-fashion-pink hover:bg-fashion-pink/90'
                  : 'border-fashion-pink text-fashion-pink hover:bg-fashion-pink hover:text-white'
              }`}
            >
              All Categories
            </Button>
            {Object.keys(faqsByCategory).map((category) => {
              const Icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS];
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category
                      ? 'bg-fashion-pink hover:bg-fashion-pink/90'
                      : 'border-fashion-pink text-fashion-pink hover:bg-fashion-pink hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
                </Button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-black/20 border border-white/10 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-white/5">
                  <div className="flex items-start gap-4 text-left">
                    <HelpCircle className="w-5 h-5 text-fashion-pink shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-white">{faq.question}</p>
                      <Badge
                        variant="outline"
                        className="mt-2 border-fashion-pink/30 text-fashion-pink"
                      >
                        {CATEGORY_LABELS[faq.category as keyof typeof CATEGORY_LABELS]}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="pl-9 text-white/70">
                    <p>{faq.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Empty State */}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 mx-auto text-white/20" />
              <p className="mt-4 text-white/50">
                No matching questions found. Please try a different search term or category.
              </p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-black/20 border-white/10">
            <div className="p-6 md:p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-white">
                Need Additional Support?
              </h3>
              
              <Grid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap={{ desktop: 6 }}>
                {/* Contact Methods */}
                <GridItem>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white">
                      <Mail className="w-5 h-5 text-fashion-pink" />
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="hover:text-fashion-pink transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <Phone className="w-5 h-5 text-fashion-pink" />
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="hover:text-fashion-pink transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <Clock className="w-5 h-5 text-fashion-pink" />
                      <span>{contactInfo.hours}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <MessageCircle className="w-5 h-5 text-fashion-pink" />
                      <span>Average Response Time: {contactInfo.response_time}</span>
                    </div>
                  </div>
                </GridItem>

                {/* Quick Actions */}
                <GridItem>
                  <div className="space-y-4">
                    <Button className="w-full bg-fashion-pink hover:bg-fashion-pink/90">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start Live Chat
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-fashion-pink text-fashion-pink hover:bg-fashion-pink hover:text-white"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Submit Support Ticket
                    </Button>
                  </div>
                </GridItem>
              </Grid>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}; 


