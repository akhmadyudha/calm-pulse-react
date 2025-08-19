import { useState, useCallback } from "react";
import { FastingTimer } from "@/components/FastingTimer";
import { FastingPlanSelector, FastingPlan } from "@/components/FastingPlanSelector";
import { FastingStats } from "@/components/FastingStats";

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<FastingPlan>({
    id: '16-8',
    name: '16:8',
    fastingHours: 16,
    eatingHours: 8,
    description: 'Fast for 16 hours, eat in 8-hour window',
    difficulty: 'Beginner'
  });

  const [timerData, setTimerData] = useState({
    timeRemaining: 0,
    isActive: false,
    currentPhase: 'fasting' as 'fasting' | 'eating'
  });

  // Mock data for stats (in a real app, this would come from local storage or a backend)
  const [currentStreak] = useState(3);
  const [totalFasts] = useState(12);

  const handleTimerUpdate = useCallback((timeRemaining: number, isActive: boolean, phase: 'fasting' | 'eating') => {
    setTimerData({ timeRemaining, isActive, currentPhase: phase });
  }, []);

  const handlePlanSelect = useCallback((plan: FastingPlan) => {
    setSelectedPlan(plan);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Intermittent Fasting
            </h1>
            <p className="text-muted-foreground">Simple. Elegant. Effective.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
        {/* Stats Section */}
        <FastingStats
          currentStreak={currentStreak}
          totalFasts={totalFasts}
          timeRemaining={timerData.timeRemaining}
          isActive={timerData.isActive}
          currentPhase={timerData.currentPhase}
        />

        {/* Timer Section */}
        <div className="animate-fade-in">
          <FastingTimer
            fastingHours={selectedPlan.fastingHours}
            eatingHours={selectedPlan.eatingHours}
            onTimerUpdate={handleTimerUpdate}
          />
        </div>

        {/* Plan Selector */}
        <div className="animate-fade-in">
          <FastingPlanSelector
            selectedPlan={selectedPlan}
            onPlanSelect={handlePlanSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
