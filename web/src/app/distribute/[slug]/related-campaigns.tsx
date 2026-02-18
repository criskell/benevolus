'use client';

import {
  Button,
  Image,
  Chip,
  Card,
  CardBody,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { Campaign } from '@/models/campaign';

type RelatedCampaignsProps = {
  campaigns: Campaign[];
  onQuickDonate: (campaign: Campaign, amount: number) => void;
};

const RelatedCampaigns = ({ campaigns, onQuickDonate }: RelatedCampaignsProps) => {
  const t = useTranslations('campaigns.distribute');

  if (campaigns.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border border-default-200" shadow="none">
        <CardBody className="p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Icon
              icon="solar:heart-angle-bold"
              width={28}
              className="text-primary"
            />
            {t('related.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaigns.slice(0, 3).map((related) => (
              <Card
                key={related.slug}
                className="border border-default-200 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                shadow="none"
              >
                <CardBody className="p-0">
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={related.images?.[0] || related.image}
                      alt={related.title}
                      className="w-full h-full object-cover"
                      removeWrapper
                    />
                  </div>
                  <div className="p-4">
                    <Chip size="sm" variant="flat" className="mb-2">
                      {related.category}
                    </Chip>
                    <h4 className="text-sm font-bold line-clamp-2 mb-3">
                      {related.title}
                    </h4>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="bordered"
                        onPress={() => onQuickDonate(related, 1000)}
                        className="flex-1 font-semibold"
                      >
                        R$ 10
                      </Button>
                      <Button
                        size="sm"
                        color="primary"
                        onPress={() => onQuickDonate(related, 2500)}
                        className="flex-1 font-semibold"
                      >
                        R$ 25
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default RelatedCampaigns;
