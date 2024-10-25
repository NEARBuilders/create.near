import { ModeToggle } from "@/components/ui/mode-toggle";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  component: HomePage,
});

interface FloatingCardProps {
  title: string;
  subtitle?: string;
  delay: number;
  href: string;
}

const FloatingCard: React.FC<FloatingCardProps> = ({
  title,
  subtitle,
  delay,
  href,
}) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [0, -20, 0],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: 6,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="transform-gpu"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div
          className="w-64 h-64 rounded-xl 
                      bg-white dark:bg-gray-800
                      shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                      dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]
                      hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
                      dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]
                      transition-all duration-300 ease-in-out
                      flex flex-col items-center justify-center gap-2
                      border border-gray-200 dark:border-gray-700
                      cursor-pointer
                      hover:scale-105"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      </a>
    </motion.div>
  );
};

export default function HomePage() {
  const cards = [
    {
      title: "Agent",
      delay: 0,
      href: "https://x.com/surge_code/status/1847288792085893165",
    },
    {
      title: "App",
      delay: 1,
      href: "https://x.com/elliot_braem/status/1847693228943847693",
    },
    {
      title: "Thing",
      subtitle: "coming soon...",
      delay: 2,
      href: "https://everything.dev",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900
                    flex flex-col items-center justify-center gap-16 p-8
                    transition-colors duration-200"
    >
      <ModeToggle />
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white text-center mb-8">
        create something
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {cards.map((card) => (
          <FloatingCard
            key={card.title}
            title={card.title}
            subtitle={card.subtitle}
            delay={card.delay}
            href={card.href}
          />
        ))}
      </div>
    </div>
  );
}
