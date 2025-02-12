export interface TicketOption {
  title: string;
  subtitle: string;
  price: string;
  perks: string[];
  limited?: boolean;
}

export const tickets: TicketOption[] = [
  {
    title: "General Admission",
    subtitle: "Standard access to the Fashionistas Valentine's Event",
    price: "$99",
    perks: [
      "Standard seating",
      "Welcome drink",
      "Event program",
      "Access to general areas",
      "Basic networking opportunities"
    ],
  },
  {
    title: "VIP Experience",
    subtitle: "Premium access with exclusive perks and privileges",
    price: "$249",
    perks: [
      "Front-row seating",
      "Welcome champagne",
      "VIP lounge access",
      "Meet & Greet opportunities",
      "After-party entry"
    ],
    limited: true,
  },
  {
    title: "Sponsor Package",
    subtitle: "Ultimate experience with maximum visibility",
    price: "$499",
    perks: [
      "Premium seating",
      "Unlimited premium drinks",
      "Private suite access",
      "Brand visibility opportunities",
      "Private after-party suite"
    ],
  },
];


