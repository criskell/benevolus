'use client';

import {
  Button,
  Input,
  Card,
  CardBody,
  Tabs,
  Tab,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { formatMoney } from '@/lib/utils/format-money';
import { campaigns } from '@/data/campaigns';
import DistributionCriteria from './distribution-criteria';

type CampaignData = (typeof campaigns.campaigns)[number];
type CampaignMap = Record<string, CampaignData>;

type DistributionItem = {
  slug: string;
  amount: number;
};

type DistributionFormProps = {
  campaign: CampaignData;
  totalAmount: number;
  onTotalAmountChange: (value: number) => void;
  criteria: 'equal' | 'mixed' | 'integral';
  onCriteriaChange: (value: 'equal' | 'mixed' | 'integral') => void;
  distributionType: 'category' | 'favorites';
  onDistributionTypeChange: (value: 'category' | 'favorites') => void;
  likedSlugs: string[];
  distribution: DistributionItem[];
  campaignMap: CampaignMap;
};

const quickAmounts = [10, 25, 50, 100, 250, 500];

const DistributionForm = ({
  campaign,
  totalAmount,
  onTotalAmountChange,
  criteria,
  onCriteriaChange,
  distributionType,
  onDistributionTypeChange,
  likedSlugs,
  distribution,
  campaignMap,
}: DistributionFormProps) => {
  const t = useTranslations('campaigns.distribute');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card
        className="border border-default-200 overflow-hidden"
        shadow="none"
      >
        <CardBody className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon
                icon="solar:lightbulb-bolt-bold"
                width={28}
                className="text-primary"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {t('smart_distribution.title')}
              </h3>
              <p className="text-sm text-default-600">
                {t('smart_distribution.subtitle')}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-default-700 mb-3">
              {t('smart_distribution.amount_label')}
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={totalAmount === amount ? 'solid' : 'bordered'}
                  color={totalAmount === amount ? 'primary' : 'default'}
                  size="lg"
                  className="font-semibold"
                  onPress={() => onTotalAmountChange(amount)}
                >
                  R$ {amount}
                </Button>
              ))}
            </div>
            <Input
              type="number"
              value={totalAmount.toString()}
              onValueChange={(value) =>
                onTotalAmountChange(parseFloat(value) || 0)
              }
              min="1"
              step="0.01"
              placeholder={t('smart_distribution.other_amount')}
              size="lg"
              startContent={
                <span className="text-default-600 font-semibold">R$</span>
              }
              classNames={{
                input: 'text-lg font-semibold',
              }}
            />
            <div className="mt-4 text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-sm text-default-600 mb-1">
                {t('smart_distribution.total_to_donate')}
              </p>
              <p className="text-3xl font-black bg-gradient-to-br from-primary to-primary-600 bg-clip-text text-transparent">
                {formatMoney(totalAmount * 100)}
              </p>
            </div>
          </div>

          <Tabs
            selectedKey={distributionType}
            onSelectionChange={(key) =>
              onDistributionTypeChange(key as 'category' | 'favorites')
            }
            classNames={{
              tabList: 'bg-default-100 p-1',
              cursor: 'bg-white shadow-md',
              tab: 'font-semibold',
            }}
            size="lg"
          >
            <Tab
              key="favorites"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:bookmark-bold" width={20} />
                  <span>{t('smart_distribution.tab_favorites', { count: likedSlugs.length })}</span>
                </div>
              }
              isDisabled={likedSlugs.length < 2}
            >
              <DistributionCriteria
                criteria={criteria}
                onCriteriaChange={onCriteriaChange}
                distribution={distribution}
                campaignMap={campaignMap}
                totalAmount={totalAmount}
                description={t('smart_distribution.favorites_description')}
              />
            </Tab>
            <Tab
              key="category"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:folder-bold" width={20} />
                  <span>{t('smart_distribution.tab_related')}</span>
                </div>
              }
            >
              <DistributionCriteria
                criteria={criteria}
                onCriteriaChange={onCriteriaChange}
                distribution={distribution}
                campaignMap={campaignMap}
                totalAmount={totalAmount}
                description={t('smart_distribution.related_description', { category: campaign.category })}
              />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default DistributionForm;
