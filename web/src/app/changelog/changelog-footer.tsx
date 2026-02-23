'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';

const ChangelogFooter = () => {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <Card className="mt-16 border-2 border-blue-300/50 overflow-hidden relative bg-gradient-to-br from-blue-50/40 via-blue-100/30 to-blue-50/40 backdrop-blur-sm shadow-none">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.08),rgba(255,255,255,0))]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full blur-3xl" />

        <CardBody className="p-12 text-center relative z-10">
          <div className="inline-flex rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-1 mb-6">
            <div className="rounded-full bg-background p-4">
              <Icon icon="solar:bell-bing-bold-duotone" className="text-blue-600 size-10 animate-bounce" />
            </div>
          </div>
          <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
            {t('changelog.footer.title')}
          </h3>
          <p className="text-default-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            {t('changelog.footer.description')}
          </p>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export { ChangelogFooter };
