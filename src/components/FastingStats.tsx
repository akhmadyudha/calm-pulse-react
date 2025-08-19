import { Card } from "@/components/ui/card";
import { Clock, Target, Zap } from "lucide-react";

interface FastingStatsProps {
  currentStreak: number;
  totalFasts: number;
  timeRemaining: number;
  isActive: boolean;
  currentPhase: 'fasting' | 'eating';
}

export const FastingStats = ({ 
  currentStreak, 
  totalFasts, 
  timeRemaining, 
  isActive, 
  currentPhase 
}: FastingStatsProps) => {
  const formatTimeRemaining = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const stats = [
    {
      icon: Zap,
      label: "Current Streak",
      value: `${currentStreak}`,
      suffix: currentStreak === 1 ? "day" : "days",
      color: "text-primary"
    },
    {
      icon: Target,
      label: "Total Fasts",
      value: `${totalFasts}`,
      suffix: "completed",
      color: "text-secondary-foreground"
    },
    {
      icon: Clock,
      label: isActive ? `${currentPhase === 'fasting' ? 'Fasting' : 'Eating'} ends in` : "Ready to start",
      value: isActive ? formatTimeRemaining(timeRemaining) : "--",
      suffix: isActive ? "remaining" : "",
      color: currentPhase === 'fasting' ? "text-primary" : "text-secondary-foreground"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Card key={index} className="bg-gradient-card border-0 shadow-soft p-6 text-center">
            <div className="space-y-3">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted/50 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
                {stat.suffix && (
                  <div className="text-xs text-muted-foreground">
                    {stat.suffix}
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};