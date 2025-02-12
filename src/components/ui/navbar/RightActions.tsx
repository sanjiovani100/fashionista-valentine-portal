import * as React from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export const RightActions = () => {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:flex items-center gap-3">
      <LanguageSwitcher />
      <Button 
        className="bg-gradient-to-r from-fashion-pink to-deep-purple hover:brightness-110 active:brightness-90 transition-all duration-300 font-inter font-bold"
        size="sm"
      >
        {t('navigation.getTickets')}
      </Button>
    </div>
  );
};


