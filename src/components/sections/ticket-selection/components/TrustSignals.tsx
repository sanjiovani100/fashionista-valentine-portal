import { Shield, CreditCard } from "lucide-react";

export const TrustSignals = () => (
  <div className="mt-16">
    <div className="border border-white/10 rounded-lg px-6 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-4">
        {/* Left section - Ticket Information */}
        <div className="flex flex-col space-y-1 text-center md:text-left">
          <p className="text-romantic font-semibold text-xl font-montserrat">
            Limited Tickets Remaining
          </p>
          <p className="text-gray-300 text-sm font-montserrat">
            Only 20 VIP Tickets Left
          </p>
        </div>

        {/* Right section - Security Information */}
        <div className="flex items-center gap-4 text-gray-400 font-montserrat text-sm whitespace-nowrap">
          <Shield className="w-5 h-5 shrink-0" />
          <span>Secure Checkout</span>
          <span className="select-none">•</span>
          <span>Verified by Stripe</span>
          <CreditCard className="w-5 h-5 shrink-0" />
        </div>
      </div>
    </div>
  </div>
);