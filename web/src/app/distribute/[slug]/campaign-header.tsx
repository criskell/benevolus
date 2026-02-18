'use client';

import {
  Image,
  Chip,
  Card,
  CardBody,
  Progress,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { campaigns } from '@/data/campaigns';

type CampaignData = (typeof campaigns.campaigns)[number];

type CampaignHeaderProps = {
  campaign: CampaignData;
};

const CampaignHeader = ({ campaign }: CampaignHeaderProps) => {
  const t = useTranslations('campaigns.distribute');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Card
        className="overflow-hidden border border-default-200"
        shadow="none"
      >
        <CardBody className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative h-64 lg:h-full min-h-[300px]">
              <Image
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover"
                removeWrapper
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <Chip
                  size="lg"
                  variant="flat"
                  className="bg-white/90 backdrop-blur-md font-semibold"
                  startContent={<Icon icon="solar:tag-bold" width={18} />}
                >
                  {campaign.category}
                </Chip>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-lg shadow-primary/25 flex-shrink-0">
                  <Icon
                    icon="solar:heart-bold"
                    width={32}
                    height={32}
                    className="text-white"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-default-600 font-medium mb-1">
                    {t('donate_to')}
                  </p>
                  <h1 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
                    {campaign.title}
                  </h1>
                </div>
              </div>

              <p className="text-default-700 leading-relaxed mb-6">
                {t('subtitle')}
              </p>

              <div className="bg-default-50 border border-default-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-default-700">
                    {t('progress_label')}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {campaign.progressPercent}%
                  </span>
                </div>
                <Progress
                  value={campaign.progressPercent}
                  classNames={{
                    indicator:
                      'bg-gradient-to-r from-primary to-primary-600',
                  }}
                  size="md"
                />
                <div className="flex items-center justify-between mt-2 text-xs text-default-600">
                  <span>
                    R${' '}
                    {campaign.raised.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  <span>
                    {t('goal_prefix')} R${' '}
                    {campaign.goal.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default CampaignHeader;
