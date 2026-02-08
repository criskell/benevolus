'use client';

import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Card } from '@heroui/react';
import { useTranslations } from 'next-intl';

export function LiveDonationsCounter() {
  const t = useTranslations('home.live_donations');
  const [totalDonations, setTotalDonations] = useState(1274650); // R$ 12.746,50 em centavos
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastDonation, setLastDonation] = useState(0);
  const previousValue = useRef(totalDonations);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate a random donation between R$ 5 and R$ 100
      const randomDonation = Math.floor(Math.random() * 9500) + 500; // 500 to 10000 cents
      setLastDonation(randomDonation);
      setTotalDonations((prev) => prev + randomDonation);
      setIsUpdating(true);
      
      setTimeout(() => setIsUpdating(false), 1500);
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
    const digits = integerPart.split('');

    return (
      <div className="flex items-baseline justify-center flex-wrap">
        <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-default-600 mr-3">R$</span>
        <div className="flex items-baseline">
          {digits.map((digit, index) => (
            <motion.span
              key={`${digit}-${index}`}
              className="inline-block text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter tabular-nums"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={isUpdating && index >= digits.length - 3 ? {
                scale: [1, 1.15, 1],
                rotateY: [0, 10, 0],
              } : {}}
              transition={{ duration: 0.5 }}
            >
              {digit}
            </motion.span>
          ))}
          <span className="text-4xl md:text-5xl lg:text-6xl font-black text-default-400 ml-2">
            ,{decimalPart}
          </span>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full py-16 md:py-20"
    >
      <Card className="relative overflow-hidden border-2 border-primary/10" shadow="none">
        {/* Animated glow on update */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isUpdating 
              ? [
                  'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0) 100%)',
                  'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 60%)',
                  'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0) 100%)',
                ]
              : 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0) 100%)',
          }}
          transition={{ duration: 1.5 }}
        />

        {/* Decorative gradient blobs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 via-teal-400/10 to-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-400/10 via-cyan-400/10 to-emerald-400/10 rounded-full blur-3xl" />
        
        {/* Floating money icons */}
        <motion.div
          className="absolute top-10 left-10 opacity-5"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon icon="solar:dollar-bold" width={80} />
        </motion.div>
        
        <motion.div
          className="absolute top-20 right-16 opacity-5"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon icon="solar:hand-money-bold" width={60} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-16 right-20 opacity-5"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 8, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon icon="solar:wallet-money-bold" width={70} />
        </motion.div>

        <div className="relative px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                animate={{
                  scale: isUpdating ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-cyan-500/15 border-2 border-emerald-500/30 font-bold text-sm mb-6 shadow-lg shadow-emerald-500/10"
              >
                <motion.div
                  animate={{
                    scale: isUpdating ? [1, 1.4, 1] : [1, 1.2, 1],
                    rotate: isUpdating ? [0, 360] : 0,
                  }}
                  transition={{ 
                    duration: isUpdating ? 0.6 : 2,
                    repeat: isUpdating ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <Icon icon="solar:chart-bold" width={24} className="text-emerald-600" />
                  {isUpdating && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-emerald-500"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </motion.div>
                <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent">
                  {t('badge')}
                </span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 tracking-tight">
                {t('title')}
              </h2>
              <p className="text-default-600 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            {/* Main Counter with decorative elements */}
            <div className="relative mb-10">
              {/* Pulse rings on update */}
              {isUpdating && (
                <>
                  <motion.div
                    className="absolute inset-0 border-4 border-emerald-500/30 rounded-3xl"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.05, opacity: 0 }}
                    transition={{ duration: 1 }}
                  />
                  <motion.div
                    className="absolute inset-0 border-4 border-teal-500/30 rounded-3xl"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.08, opacity: 0 }}
                    transition={{ duration: 1, delay: 0.1 }}
                  />
                </>
              )}

              {/* Counter container */}
              <motion.div
                className="relative bg-gradient-to-br from-default-50 via-white to-default-50 border-2 border-default-200 rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl"
                animate={{
                  boxShadow: isUpdating 
                    ? [
                        '0 10px 40px rgba(16, 185, 129, 0.1)',
                        '0 20px 60px rgba(16, 185, 129, 0.3)',
                        '0 10px 40px rgba(16, 185, 129, 0.1)',
                      ]
                    : '0 10px 40px rgba(0, 0, 0, 0.05)',
                }}
                transition={{ duration: 1.5 }}
              >
                <AnimatedNumber value={totalDonations} />
              </motion.div>

              {/* New donation notification */}
              {isUpdating && lastDonation > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-2xl shadow-emerald-500/50 font-bold text-sm flex items-center gap-2 whitespace-nowrap"
                >
                  <Icon icon="solar:add-circle-bold" width={20} />
                  <span>{t('new_donation', { amount: (lastDonation / 100).toFixed(2) })}</span>
                  <Icon icon="solar:star-bold" width={16} />
                </motion.div>
              )}
            </div>

            {/* Live activity indicator */}
            <motion.div 
              className="flex items-center justify-center gap-3 text-sm"
              animate={{
                opacity: isUpdating ? [1, 0.7, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-emerald-500"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-emerald-500"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <span className="font-semibold text-default-700">{t('live_status')}</span>
              </div>
              
              <div className="w-1.5 h-1.5 rounded-full bg-default-300" />
              
              <span className="text-default-600 font-medium">
                {t('last_donation_label')}: {isUpdating ? t('last_donation_now') : t('last_donation_recent')}
              </span>
            </motion.div>

            {/* Impact message */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10 text-center"
            >
              <p className="text-default-600 text-sm md:text-base font-medium max-w-2xl mx-auto">
                {t('join_message')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Animated particles on update */}
        {isUpdating && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: '50%',
                }}
                initial={{ scale: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0.8],
                  y: [-100, -200],
                  opacity: [1, 0.8, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              >
                <Icon 
                  icon={['solar:star-bold', 'solar:heart-bold', 'solar:dollar-bold'][i % 3]} 
                  width={20 + Math.random() * 10} 
                  className="text-emerald-500"
                />
              </motion.div>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
