import { Shield, CreditCard } from "lucide-react";

export const TrustSignals = () => (
  <div className="mt-16 border-t border-white/10 pt-8">
    <div className="flex flex-col items-center space-y-6">
      <p className="text-romantic font-semibold text-xl font-montserrat">
        Limited Tickets Remaining
      </p>
      <p className="text-gray-300 font-montserrat">
        Only 20 VIP Tickets Left
      </p>
      <div className="flex gap-4 items-center text-gray-400 font-montserrat">
        <Shield className="w-5 h-5" />
        <span>Secure Checkout</span>
        <span>•</span>
        <span>Verified by Stripe</span>
        <CreditCard className="w-5 h-5" />
      </div>
    </div>
  </div>
);