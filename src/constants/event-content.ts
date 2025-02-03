import { Heart, Star, Award } from "lucide-react";
import type { EventDetails } from "@/features/events/types/event.types";

export const EVENT_DETAILS: EventDetails = {
  id: "valentines-2024",
  name: "valentines_fashion_show",
  subtype: "main_show",
  title: "Fashionistas Valentine's Event",
  start_time: "2024-02-14T18:00:00Z",
  end_time: "2024-02-14T22:00:00Z",
  description: "Join us for an exclusive celebration of fashion, creativity, and empowerment",
  venue: "Grand Ballroom",
  capacity: 500,
  registration_deadline: "2024-02-13T23:59:59Z",
  venue_features: {
    amenities: ["Stage", "Lighting", "Sound System"],
    accessibility: ["Wheelchair Access", "Elevator"]
  },
  event_highlights: [
    {
      icon: "heart",
      title: "Exclusive Experience",
      description: "Immerse yourself in a world of luxury and style",
    },
    {
      icon: "star",
      title: "Top Designers",
      description: "Showcase of the most innovative fashion creators",
    },
    {
      icon: "award",
      title: "Empowerment",
      description: "Celebrating creativity and individual expression",
    },
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};