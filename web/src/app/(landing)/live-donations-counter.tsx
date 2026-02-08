'use client';

import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Card } from '@heroui/react';

export function LiveDonationsCounter() {
  const [totalDonations, setTotalDonations] = useState(1274650); // R$ 12.746,50 em centavos
  const [isUpdating, setIsUpdating] = useState(false);
  const previousValue = useRef(totalDonations);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate a random donation between R$ 5 and R$ 100
      const randomDonation = Math.floor(Math.random() * 9500) + 500; // 500 to 10000 cents
      setTotalDonations((prev) => prev + randomDonation);
      setIsUpdating(true);
      
      setTimeout(() => setIsUpdating(false), 1000);
    }, 8000); // New donation every 8 seconds

    return () => clearInterval(interval);
  }, []);

  // Format number with animated digits
  const AnimatedNumber = ({ value }: { value: number }) => {
    const motionValue = useMotionValue(previousValue.current);
    const rounded = useTransform(motionValue, (latest) => Math.round(latest));
    const [displayValue, setDisplayValue] = useState(previousValue.current);

    useEffect(() => {
      previousValue.current = value;
      const controls = animate(motionValue, value, {
        duration: 1.5,
        ease: "easeOut",
      });

      return controls.stop;
    }, [value, motionValue]);

    useEffect(() => {
      const unsubscribe = rounded.on('change', (latest) => {
        setDisplayValue(latest);
      });

      return unsubscribe;
    }, [rounded]);

    const formattedValue = (displayValue / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const [integerPart, decimalPart] = formattedValue.split(',');

    return (
      <div className="flex items-baseline justify-center">
        <span className="text-2xl md:text-3xl font-medium text-default-600 mr-2">R$</span>
        <span className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter tabular-nums bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
          {integerPart}
        </span>
        <span className="text-3xl md:text-4xl lg:text-5xl font-black text-default-400 ml-1">
          ,{decimalPart}
        </span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full py-12 md:py-16"
    >
      <Card className="relative overflow-hidden border border-default-200" shadow="none">
        {/* Animated background on update */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5"
          animate={{
            opacity: isUpdating ? [0, 0.5, 0] : 0,
          }}
          transition={{ duration: 1 }}
        />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-500/5 to-transparent rounded-full blur-3xl" />

        <div className="relative p-8 md:p-12 lg:p-16">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                animate={{
                  scale: isUpdating ? [1, 1.05, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold text-sm mb-4"
              >
                <motion.div
                  animate={{
                    scale: isUpdating ? [1, 1.3, 1] : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon icon="solar:dollar-minimalistic-bold" width={20} />
                </motion.div>
                <span className="relative">
                  Atualizando em tempo real
                  {isUpdating && (
                    <motion.span
                      className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-emerald-500"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [1, 1, 0],
                      }}
                      transition={{ duration: 1 }}
                    />
                  )}
                </span>
              </motion.div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Total arrecadado na plataforma
              </h2>
              <p className="text-default-600 text-base md:text-lg max-w-2xl mx-auto">
                Cada centavo representa uma história de solidariedade e esperança
              </p>
            </div>

            {/* Counter Display */}
            <div className="mb-8">
              <AnimatedNumber value={totalDonations} />
            </div>

            {/* Live activity indicator */}
            <motion.div 
              className="flex items-center justify-center gap-2 mt-8 text-sm text-default-600"
              animate={{
                opacity: isUpdating ? [1, 0.6, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="font-medium">Sistema em tempo real - Última atualização: agora</span>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
