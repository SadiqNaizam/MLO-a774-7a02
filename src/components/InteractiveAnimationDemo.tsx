import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';

interface InteractiveAnimationDemoProps {
  // Example prop, can be expanded for specific animation demos
  animationType?: 'slide' | 'fade' | 'scale';
}

const boxVariants: Variants = {
  initial: { opacity: 0.5, x: -100, scale: 0.8, rotate: 0 },
  animate: {
    opacity: 1,
    x: 100,
    scale: 1.2,
    rotate: 360,
    transition: { type: 'spring', stiffness: 100, damping: 10, duration: 1 },
  },
  paused: (current) => ({ ...current }), // Keep current state when paused
};

const InteractiveAnimationDemo: React.FC<InteractiveAnimationDemoProps> = ({ animationType = 'slide' }) => {
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // To re-trigger animation on reset

  console.log('InteractiveAnimationDemo loaded, type:', animationType);

  useEffect(() => {
    // Automatically play on mount or when key changes (after reset)
    controls.start("animate");
    setIsPaused(false);
  }, [controls, animationKey]);

  const handlePlay = async () => {
    setIsPaused(false);
    // If animation was previously stopped, restart from initial. Otherwise, continue.
    // For simplicity, we restart the sequence.
    await controls.start("animate");
  };

  const handlePause = async () => {
    setIsPaused(true);
    // Capture current properties and stop
    // Framer Motion's stop() will halt it. For a "true" pause and resume,
    // one might need to get the current values and re-apply them or manage state more intricately.
    // For this demo, stop() is sufficient.
    controls.stop();
  };

  const handleReset = async () => {
    setIsPaused(false);
    await controls.start("initial"); // Go to initial state
    setAnimationKey(prevKey => prevKey + 1); // Change key to re-trigger useEffect and play
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground mb-4">
          Interactive Demo: {animationType.charAt(0).toUpperCase() + animationType.slice(1)} Animation
        </p>
        <div className="h-40 bg-muted rounded-md flex items-center justify-center overflow-hidden p-4 mb-6">
          <motion.div
            key={animationKey} // Re-mounts the motion component on reset
            className="w-20 h-20 bg-primary rounded-lg shadow-xl"
            variants={boxVariants}
            initial="initial"
            animate={controls}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-2 p-4 border-t">
        <Button onClick={handlePlay} disabled={!isPaused && controls.getVariant() === "animate"} aria-label="Play animation">
          <Play className="mr-2 h-4 w-4" /> Play
        </Button>
        <Button onClick={handlePause} disabled={isPaused} variant="outline" aria-label="Pause animation">
          <Pause className="mr-2 h-4 w-4" /> Pause
        </Button>
        <Button onClick={handleReset} variant="outline" aria-label="Reset animation">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InteractiveAnimationDemo;