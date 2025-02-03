import { Heart, Star, Award } from "lucide-react";
import type { EventDetails } from "@/features/events/types/event.types";

export const EVENT_DETAILS: EventDetails = {
  title: "Fashionistas Valentine's Event",
  date: "February 14, 2024",
  description: "Join us for an exclusive celebration of fashion, creativity, and empowerment",
  features: [
    {
      icon: Heart,
      title: "Exclusive Experience",
      description: "Immerse yourself in a world of luxury and style",
    },
    {
      icon: Star,
      title: "Top Designers",
      description: "Showcase of the most innovative fashion creators",
    },
    {
      icon: Award,
      title: "Empowerment",
      description: "Celebrating creativity and individual expression",
    },
  ],
};