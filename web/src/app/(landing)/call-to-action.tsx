'use client';

import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "framer-motion";

export const CallToAction = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="relative rounded-3xl overflow-hidden border border-default-200 bg-gradient-to-br from-default-50 to-default-100/50 py-20 md:py-24 px-8 md:px-12">
          {/* Formas decorativas sutis */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: 'oklch(0.75 0.15 250)' }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-8 blur-3xl"
            style={{ background: 'oklch(0.7 0.12 200)' }}
          />

        <div className="relative">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge/tag */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Icon icon="solar:star-outline" width={18} height={18} />
            <span className="text-sm font-semibold">Comece agora</span>
          </motion.div>

          {/* Título principal */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Conte sua história
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-default-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Receba contribuição da nossa comunidade e transforme vidas
          </motion.p>

          {/* Botões */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button
              as={Link}
              href="/campaigns/create"
              size="lg"
              color="primary"
              className="text-base font-semibold px-8 h-12 min-w-[200px]"
              startContent={<Icon icon="solar:add-circle-outline" width={22} height={22} />}
            >
              Crie sua campanha
            </Button>
            <Button
              as={Link}
              href="/campaigns"
              size="lg"
              variant="bordered"
              className="text-base font-semibold px-8 h-12 min-w-[200px] border-default-300 hover:border-primary"
              endContent={<Icon icon="solar:arrow-right-outline" width={20} height={20} />}
            >
              Ver campanhas
            </Button>
          </motion.div>

          {/* Texto de apoio/trust */}
          <motion.p
            className="mt-10 text-sm text-default-500 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Icon icon="solar:shield-check-outline" width={18} height={18} className="text-primary" />
            Zero taxas para doadores • Processo transparente • Seguro e confiável
          </motion.p>
        </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
};
