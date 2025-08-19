import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FastingPlan {
  id: string;
  name: string;
  fastingHours: number;
  eatingHours: number;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const plans: FastingPlan[] = [
  {
    id: '16-8',
    name: '16:8',
    fastingHours: 16,
    eatingHours: 8,
    description: 'Fast for 16 hours, eat in 8-hour window',
    difficulty: 'Beginner'
  },
  {
    id: '18-6',
    name: '18:6',
    fastingHours: 18,
    eatingHours: 6,
    description: 'Fast for 18 hours, eat in 6-hour window',
    difficulty: 'Intermediate'
  },
  {
    id: '20-4',
    name: '20:4',
    fastingHours: 20,
    eatingHours: 4,
    description: 'Fast for 20 hours, eat in 4-hour window',
    difficulty: 'Advanced'
  }
];

interface FastingPlanSelectorProps {
  selectedPlan: FastingPlan;
  onPlanSelect: (plan: FastingPlan) => void;
}

export const FastingPlanSelector = ({ selectedPlan, onPlanSelect }: FastingPlanSelectorProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-secondary text-secondary-foreground';
      case 'Intermediate':
        return 'bg-accent text-accent-foreground';
      case 'Advanced':
        return 'bg-primary/10 text-primary border border-primary/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Choose Your Plan</h2>
        <p className="text-muted-foreground">Select an intermittent fasting schedule that works for you</p>
      </div>
      
      <div className="grid gap-4">
        {plans.map((plan) => {
          const isSelected = selectedPlan.id === plan.id;
          
          return (
            <Card
              key={plan.id}
              className={cn(
                "relative overflow-hidden transition-smooth cursor-pointer hover:shadow-soft border",
                isSelected 
                  ? "bg-gradient-card border-primary shadow-glow" 
                  : "bg-card border-border hover:border-primary/30"
              )}
              onClick={() => onPlanSelect(plan)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {plan.name}
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      getDifficultyColor(plan.difficulty)
                    )}>
                      {plan.difficulty}
                    </span>
                  </div>
                  
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    </div>
                  )}
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{plan.fastingHours}h</div>
                      <div className="text-muted-foreground">Fasting</div>
                    </div>
                    <div className="text-muted-foreground">•</div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{plan.eatingHours}h</div>
                      <div className="text-muted-foreground">Eating</div>
                    </div>
                  </div>
                  
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "transition-smooth",
                      isSelected 
                        ? "bg-gradient-primary border-0 text-primary-foreground" 
                        : "border-border/50 hover:bg-muted"
                    )}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};