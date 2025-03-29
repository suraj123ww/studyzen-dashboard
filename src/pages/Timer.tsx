
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  Coffee 
} from 'lucide-react';

const Timer = () => {
  const [timerMode, setTimerMode] = useState("pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [timerSettings, setTimerSettings] = useState({
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  });
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  
  // Handle timer tick
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Timer completed
      setIsRunning(false);
      
      if (timerMode === "pomodoro") {
        setCompletedPomodoros(prev => prev + 1);
        
        // Auto switch to break after pomodoro
        if (completedPomodoros % 4 === 3) {
          // After 4 pomodoros, take a long break
          handleChangeMode("longBreak");
        } else {
          handleChangeMode("shortBreak");
        }
      } else {
        // After break, switch back to pomodoro
        handleChangeMode("pomodoro");
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, timerMode, completedPomodoros]);
  
  const handleChangeMode = (mode: string) => {
    setTimerMode(mode);
    setTimeLeft(timerSettings[mode as keyof typeof timerSettings]);
    setIsRunning(false);
  };
  
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  const resetTimer = () => {
    setTimeLeft(timerSettings[timerMode as keyof typeof timerSettings]);
    setIsRunning(false);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getProgressValue = () => {
    const total = timerSettings[timerMode as keyof typeof timerSettings];
    const elapsed = total - timeLeft;
    return (elapsed / total) * 100;
  };
  
  const handleAdjustTime = (mode: string, value: number[]) => {
    const newSettings = { ...timerSettings };
    newSettings[mode as keyof typeof timerSettings] = value[0] * 60;
    setTimerSettings(newSettings);
    
    if (mode === timerMode) {
      setTimeLeft(value[0] * 60);
    }
  };
  
  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Study Timer</h1>
        <p className="text-muted-foreground">
          Use the Pomodoro Technique to boost your productivity.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <Tabs defaultValue="pomodoro" onValueChange={handleChangeMode} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pomodoro">
                <Clock className="h-4 w-4 mr-2" /> Pomodoro
              </TabsTrigger>
              <TabsTrigger value="shortBreak">
                <Coffee className="h-4 w-4 mr-2" /> Short Break
              </TabsTrigger>
              <TabsTrigger value="longBreak">
                <Coffee className="h-4 w-4 mr-2" /> Long Break
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Card className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="mb-8 text-center">
              <div className="text-7xl font-bold tracking-tighter mb-4">
                {formatTime(timeLeft)}
              </div>
              <p className="text-muted-foreground capitalize">
                {timerMode === "pomodoro" ? "Focus Time" : "Break Time"}
              </p>
            </div>
            
            <Progress value={getProgressValue()} className="w-full mb-8" />
            
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={resetTimer}
                disabled={timeLeft === timerSettings[timerMode as keyof typeof timerSettings]}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button size="lg" onClick={toggleTimer}>
                {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isRunning ? "Pause" : "Start"}
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Timer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pomodoro</span>
                  <span className="text-sm">{timerSettings.pomodoro / 60} min</span>
                </div>
                <Slider
                  min={5}
                  max={60}
                  step={5}
                  value={[timerSettings.pomodoro / 60]}
                  onValueChange={(value) => handleAdjustTime("pomodoro", value)}
                  disabled={isRunning}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Short Break</span>
                  <span className="text-sm">{timerSettings.shortBreak / 60} min</span>
                </div>
                <Slider
                  min={1}
                  max={15}
                  step={1}
                  value={[timerSettings.shortBreak / 60]}
                  onValueChange={(value) => handleAdjustTime("shortBreak", value)}
                  disabled={isRunning}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Long Break</span>
                  <span className="text-sm">{timerSettings.longBreak / 60} min</span>
                </div>
                <Slider
                  min={5}
                  max={30}
                  step={5}
                  value={[timerSettings.longBreak / 60]}
                  onValueChange={(value) => handleAdjustTime("longBreak", value)}
                  disabled={isRunning}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progress Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                  <span>Completed Pomodoros</span>
                </div>
                <span className="font-bold">{completedPomodoros}</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <span>Total Focus Time</span>
                </div>
                <span className="font-bold">{formatTime(completedPomodoros * timerSettings.pomodoro)}</span>
              </div>
              
              <div className="grid grid-cols-8 gap-2 mt-4">
                {[...Array(8)].map((_, index) => (
                  <div 
                    key={index}
                    className={`aspect-square rounded-full ${
                      index < completedPomodoros 
                        ? 'bg-primary' 
                        : 'bg-muted'
                    }`}
                  ></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Timer;
