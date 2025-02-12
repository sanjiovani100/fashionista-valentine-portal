import { Heart, Star, Award, Sun, Umbrella, Leaf, Waves } from "lucide-react";
import type { EventDetails } from "@/features/events/types/event.types";

export const EVENTS_MAP: Record<string, EventDetails> = {
  valentines_fashion_show: {
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
  },
  spring_fling_fashion_show: {
    title: "Spring Fling Fashion Show",
    date: "April 15, 2024",
    description: "Welcome the season of renewal with fresh styles and vibrant fashion",
    features: [
      {
        icon: Sun,
        title: "Spring Collections",
        description: "Experience the latest spring fashion trends",
      },
      {
        icon: Leaf,
        title: "Sustainable Fashion",
        description: "Eco-friendly designs for a better tomorrow",
      },
      {
        icon: Star,
        title: "Rising Stars",
        description: "Featuring emerging designers and fresh talent",
      },
    ],
  },
  summer_splash_fashion_show: {
    title: "Summer Splash Fashion Show",
    date: "July 20, 2024",
    description: "Dive into summer with the hottest swimwear and resort collections",
    features: [
      {
        icon: Waves,
        title: "Beach Vibes",
        description: "The latest in swimwear and resort fashion",
      },
      {
        icon: Sun,
        title: "Summer Style",
        description: "Trendsetting summer looks and accessories",
      },
      {
        icon: Star,
        title: "Celebrity Showcase",
        description: "Special appearances by fashion influencers",
      },
    ],
  },
  fall_fantasy_fashion_show: {
    title: "Fall Fantasy Fashion Show",
    date: "October 10, 2024",
    description: "Experience the magic of autumn through cutting-edge fashion",
    features: [
      {
        icon: Leaf,
        title: "Fall Collections",
        description: "Autumn-inspired designs and seasonal trends",
      },
      {
        icon: Star,
        title: "Designer Showcase",
        description: "Exclusive collections from renowned designers",
      },
      {
        icon: Award,
        title: "Innovation",
        description: "Groundbreaking designs and textile technology",
      },
    ],
  },
  swim_paradise_show: {
    title: "Swim Paradise Show",
    date: "August 5, 2024",
    description: "The ultimate showcase of luxury swimwear and beach fashion",
    features: [
      {
        icon: Waves,
        title: "Luxury Swimwear",
        description: "Premium collections from top designers",
      },
      {
        icon: Star,
        title: "Beach Couture",
        description: "High-fashion beachwear and accessories",
      },
      {
        icon: Award,
        title: "Resort Lifestyle",
        description: "Complete resort wear collections",
      },
    ],
  },
};

export const DEFAULT_EVENT = EVENTS_MAP.valentines_fashion_show;


