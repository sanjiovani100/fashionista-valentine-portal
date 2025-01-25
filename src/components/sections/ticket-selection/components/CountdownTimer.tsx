import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date("2024-02-14T20:00:00");
    
    const updateTimer = () => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-8 mb-16">
      <h1 className="text-5xl md:text-[48px] font-playfair text-white mb-6 text-center transition-all">
        Choose Your Perfect Ticket
      </h1>
      <p className="text-xl md:text-2xl text-blush mb-4 text-center font-montserrat">
        Reserve your spot for Medellín's most glamorous night!
      </p>
      <p className="text-lg text-gray-300 mb-8 text-center font-montserrat">
        Join 100+ attendees who've already secured their tickets
      </p>
      <div className="flex gap-6 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex items-center">
            <div className="flex flex-col items-center transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-romantic mb-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/10">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-300 font-montserrat">{unit}</div>
            </div>
            {unit !== 'seconds' && (
              <div className="text-4xl text-gray-500 mx-2">:</div>
            )}
          </div>
        ))}
      </div>
      <p className="text-blush text-lg animate-pulse mt-6 font-montserrat">
        Don't miss out on Medellín's most glamorous event!
      </p>
    </div>
  );
};