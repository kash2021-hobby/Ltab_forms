import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code2, FolderSync, Share2, Lock, LogOut, ArrowRight } from "lucide-react";

const cardVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.02, y: -4 },
};

const cards = [
  {
    key: "project",
    label: "New Software Project",
    desc: "Kick off a brand-new build with us",
    icon: Code2,
    color: "text-emerald-600",
    iconBg: "bg-emerald-100",
    url: "https://forms.gle/WtKJPe1t6nCZyuLT7",
  },
  {
    key: "handover",
    label: "Project Handover (Web Development)",
    desc: "Transfer an existing project smoothly",
    icon: FolderSync,
    color: "text-amber-600",
    iconBg: "bg-amber-100",
    url: "https://docs.google.com/forms/d/e/1FAIpQLScUbaFZHMyyfj-bJZHDq2PmZozGBs9Z9btTsrYndr9FpEcmcg/viewform",
  },
  {
    key: "social",
    label: "Social Media Details",
    desc: "Share your social profiles & content plan",
    icon: Share2,
    color: "text-sky-600",
    iconBg: "bg-sky-100",
    url: "https://docs.google.com/forms/d/e/1FAIpQLScPz2GA7_1aNuhRLaUBcNYUsoWOK1hiPapCN14WlTsQQbXa9Q/viewform",
  },
  {
    key: "social_password",
    label: "Social Media Password Tab",
    desc: "Access and manage social media credentials",
    icon: Lock,
    color: "text-purple-600",
    iconBg: "bg-purple-100",
    url: "https://docs.google.com/spreadsheets/d/18JDeMJAA9Fqbb4XBjp9FhKcRusHghem33Ytz9VTVTaU/edit?gid=0#gid=0",
  },
];

export default function Home() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/trpc/auth.logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  const handleCardClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30">
      {/* Header with Logout */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Ltabai</h1>
            <p className="text-sm text-muted-foreground">Project Submission Hub</p>
          </div>
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Welcome to Your Dashboard
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Select a form or resource below to get started with your project submission
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.key}
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={cardVariants}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Card
                  className="h-full p-5 sm:p-6 cursor-pointer group border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                  onClick={() => handleCardClick(card.url)}
                >
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg ${card.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${card.color}`} />
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2 line-clamp-2">
                      {card.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
                      {card.desc}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center text-primary text-xs sm:text-sm font-medium group-hover:gap-2 transition-all gap-1">
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 sm:mt-16 text-center text-sm text-muted-foreground"
        >
          <p>All your project submission tools in one secure place</p>
        </motion.div>
      </div>
    </div>
  );
}
