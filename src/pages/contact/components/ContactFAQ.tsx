import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { supabase } from '@/integrations/supabase/client';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const ContactFAQ = () => {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const { data, error } = await supabase
          .from('faq_items')
          .select('*')
          .order('order_index');

        if (error) throw error;
        setFaqItems(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const filteredFAQs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/4" />
        <div className="h-10 bg-muted rounded" />
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-muted rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Find quick answers to common questions about our events and services
        </p>
      </div>

      <Input
        type="search"
        placeholder="Search FAQs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md"
      />

      <Accordion type="single" collapsible className="w-full">
        {filteredFAQs.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filteredFAQs.length === 0 && (
        <p className="text-muted-foreground text-center py-4">
          No FAQs found matching your search.
        </p>
      )}
    </section>
  );
};


