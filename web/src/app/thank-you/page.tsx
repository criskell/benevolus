'use client';

import { Button, Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DonationSuccessPage() {
  const [confetti, setConfetti] = useState<Array<{
    left: string;
    backgroundColor: string;
    duration: number;
    delay: number;
    x: number;
    width: number;
    height: number;
    rotation: number;
  }>>([]);

  useEffect(() => {
    // Ensure page stays at top
    window.scrollTo(0, 0);
    
    // Generate confetti only on client side
    const colors = ['#10b981', '#14b8a6', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444'];
    const newConfetti = [...Array(50)].map(() => {
      const isRectangle = Math.random() > 0.5;
      return {
        left: `${Math.random() * 100}%`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 1,
        x: (Math.random() - 0.5) * 300,
        width: isRectangle ? 8 + Math.random() * 4 : 6 + Math.random() * 4,
        height: isRectangle ? 4 + Math.random() * 2 : 6 + Math.random() * 4,
        rotation: Math.random() * 360,
      };
    });
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Confetti Effect (decorative) - Client side only */}
      {confetti.length > 0 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {confetti.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: particle.left,
                top: -20,
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                backgroundColor: particle.backgroundColor,
                borderRadius: particle.width === particle.height ? '50%' : '2px',
              }}
              animate={{
                y: [0, 1100],
                x: [0, particle.x],
                rotate: [particle.rotation, particle.rotation + 720],
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
      
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon with Animation */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 blur-3xl opacity-30 animate-pulse" />

              {/* Icon container */}
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-500/50">
                <Icon
                  icon="solar:check-circle-bold"
                  width={80}
                  className="text-white"
                />
              </div>
            </motion.div>
          </div>

          {/* Main Card */}
          <Card
            className="p-8 md:p-12 border border-default-200 text-center"
            shadow="none"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Success Message */}
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Doação realizada!
              </h1>

              <p className="text-lg md:text-xl text-default-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Obrigado por fazer a diferença! Sua generosidade está
                transformando vidas e tornando o mundo um lugar melhor.
              </p>

              {/* Donation Details */}
              <div className="bg-default-50 border border-default-200 rounded-2xl p-6 mb-8 max-w-md mx-auto">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-default-600 font-medium">
                      Valor doado
                    </span>
                    <span className="text-2xl font-black text-emerald-600">
                      R$ 100,00
                    </span>
                  </div>
                  <div className="h-px bg-default-200" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-default-600 font-medium">
                      Método de pagamento
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      Pix
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-default-600 font-medium">
                      Data
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {new Date().toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Impact Message */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/25">
                    <Icon
                      icon="solar:hand-heart-bold"
                      width={24}
                      className="text-white"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-foreground mb-2">
                      Você acabou de fazer a diferença!
                    </h3>
                    <p className="text-sm text-default-700 leading-relaxed">
                      Sua doação ajudará diretamente esta família. Em breve,
                      você receberá um e-mail com os detalhes da sua
                      contribuição e atualizações sobre como ela está sendo
                      utilizada.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  as={Link}
                  href="/"
                  color="primary"
                  size="lg"
                  className="font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 w-full sm:w-auto px-8"
                  startContent={<Icon icon="solar:home-2-bold" width={24} />}
                >
                  Voltar ao início
                </Button>

                <Button
                  as={Link}
                  href="/campaigns"
                  variant="bordered"
                  size="lg"
                  className="font-semibold border-2 w-full sm:w-auto px-8"
                  endContent={
                    <Icon icon="solar:arrow-right-linear" width={24} />
                  }
                >
                  Ver outras campanhas
                </Button>
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-default-200">
                <p className="text-sm font-semibold text-default-700 mb-4">
                  Ajude a divulgar esta campanha
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    isIconOnly
                    variant="flat"
                    className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 transition-colors"
                    size="lg"
                  >
                    <Icon icon="ri:facebook-fill" width={24} />
                  </Button>
                  <Button
                    isIconOnly
                    variant="flat"
                    className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 transition-colors"
                    size="lg"
                  >
                    <Icon icon="ri:twitter-x-fill" width={24} />
                  </Button>
                  <Button
                    isIconOnly
                    variant="flat"
                    className="bg-green-500/10 hover:bg-green-500/20 text-green-600 transition-colors"
                    size="lg"
                  >
                    <Icon icon="ri:whatsapp-fill" width={24} />
                  </Button>
                  <Button
                    isIconOnly
                    variant="flat"
                    className="bg-default-100 hover:bg-default-200 text-default-600 transition-colors"
                    size="lg"
                  >
                    <Icon icon="solar:link-bold" width={24} />
                  </Button>
                </div>
              </div>
            </motion.div>
          </Card>

          {/* Additional Info */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-default-600">
              <Icon
                icon="solar:shield-check-bold"
                width={20}
                className="text-primary"
              />
              <span>
                Recibo enviado para o seu e-mail • Transação protegida
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
