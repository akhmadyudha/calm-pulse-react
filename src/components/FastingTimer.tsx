import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FastingTimerProps {
  fastingHours: number;
  eatingHours: number;
  onTimerUpdate?: (timeRemaining: number, isActive: boolean, phase: 'fasting' | 'eating') => void;
}

export const FastingTimer = ({ fastingHours, eatingHours, onTimerUpdate }: FastingTimerProps) => {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(fastingHours * 3600); // Start with fasting period
  const [currentPhase, setCurrentPhase] = useState<'fasting' | 'eating'>('fasting');
  const [startTime, setStartTime] = useState<number | null>(null);

  const totalCycleTime = (fastingHours + eatingHours) * 3600;
  const fastingTime = fastingHours * 3600;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    if (currentPhase === 'fasting') {
      return ((fastingTime - timeRemaining) / fastingTime) * 100;
    } else {
      const eatingTime = eatingHours * 3600;
      return ((eatingTime - timeRemaining) / eatingTime) * 100;
    }
  };

  const handleStart = () => {
    setIsActive(true);
    setStartTime(Date.now());
  };

  const handlePause = () => {
    setIsActive(false);
    setStartTime(null);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeRemaining(fastingTime);
    setCurrentPhase('fasting');
    setStartTime(null);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Switch phases
            if (currentPhase === 'fasting') {
              setCurrentPhase('eating');
              return eatingHours * 3600;
            } else {
              setCurrentPhase('fasting');
              return fastingTime;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining, currentPhase, fastingTime, eatingHours]);

  useEffect(() => {
    onTimerUpdate?.(timeRemaining, isActive, currentPhase);
  }, [timeRemaining, isActive, currentPhase, onTimerUpdate]);

  const progress = calculateProgress();

  return (
    <Card className="relative overflow-hidden bg-gradient-card border-0 shadow-soft p-8">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <div className={cn(
            "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-smooth",
            currentPhase === 'fasting' 
              ? "bg-primary/10 text-primary border border-primary/20" 
              : "bg-secondary/50 text-secondary-foreground border border-secondary"
          )}>
            {currentPhase === 'fasting' ? '🕐 Fasting Period' : '🍽️ Eating Window'}
          </div>
          
          <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {formatTime(timeRemaining)}
          </div>
        </div>

        {/* Progress Circle */}
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-muted"
              opacity="0.2"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(210 100% 60%)" />
                <stop offset="100%" stopColor="hsl(170 60% 50%)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleReset}
            className="w-12 h-12 rounded-full border-border/50 hover:bg-muted hover:shadow-soft transition-smooth"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={isActive ? handlePause : handleStart}
            size="lg"
            className="h-16 px-8 bg-gradient-primary border-0 text-primary-foreground shadow-glow hover:shadow-glow hover:scale-105 transition-smooth rounded-2xl"
          >
            {isActive ? (
              <>
                <Pause className="w-6 h-6 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-6 h-6 mr-2" />
                Start Fasting
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};