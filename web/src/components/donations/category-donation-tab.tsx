'use client';

import { Button, Input, Card, CardBody, Image, Chip, Select, SelectItem } from '@heroui/react';
import { useState } from 'react';
import { useSuggestedCampaigns } from '@/hooks/useSuggestedCampaigns';
import { useDonationContext } from '@/contexts/DonationContext';
import { formatMoney } from '@/lib/utils/format-money';

const categories = [
  { key: 'Saúde', label: 'Saúde' },
  { key: 'Emergenciais', label: 'Emergenciais' },
  { key: 'Moradia', label: 'Moradia' },
];

export const CategoryDonationTab = () => {
  const { getByCategory } = useSuggestedCampaigns();
  const { cart } = useDonationContext();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [donationAmount, setDonationAmount] = useState(50);
  const [suggestedCampaigns, setSuggestedCampaigns] = useState<any[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const campaigns = getByCategory(category, 5);
    setSuggestedCampaigns(campaigns);
  };

  const handleSuggestDistribution = () => {
    if (!selectedCategory || suggestedCampaigns.length === 0) return;

    const amountPerCampaign = Math.floor((donationAmount * 100) / suggestedCampaigns.length);
    const remainder = (donationAmount * 100) - (amountPerCampaign * suggestedCampaigns.length);

    suggestedCampaigns.forEach((campaign, index) => {
      const amount = index === 0 ? amountPerCampaign + remainder : amountPerCampaign;
      cart.addToCart({
        slug: campaign.slug || '',
        title: campaign.title,
        image: campaign.images[0],
        amount,
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="max-w-md">
        <h3 className="text-xl font-semibold mb-4">Doar por Causa</h3>
        <p className="text-gray-600 mb-4">
          Escolha uma categoria e defina o valor. O sistema sugere campanhas dessa causa para você doar.
        </p>

        <div className="space-y-4">
          <Select
            label="Categoria"
            placeholder="Selecione uma categoria"
            selectedKeys={selectedCategory ? [selectedCategory] : []}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              handleCategoryChange(selected);
            }}
          >
            {categories.map((category) => (
              <SelectItem key={category.key}>
                {category.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            label="Valor da Doação (R$)"
            type="number"
            value={donationAmount.toString()}
            onChange={(e) => setDonationAmount(parseFloat(e.target.value) || 0)}
            min="1"
            step="0.01"
          />

          {suggestedCampaigns.length > 0 && (
            <Button
              color="primary"
              onPress={handleSuggestDistribution}
              className="w-full"
            >
              Distribuir {formatMoney(donationAmount * 100)} entre {suggestedCampaigns.length} campanhas
            </Button>
          )}
        </div>
      </div>

      {suggestedCampaigns.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-4">Campanhas Sugeridas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedCampaigns.map((campaign) => (
              <Card key={campaign.slug} className="hover:shadow-lg transition-shadow">
                <CardBody className="p-0">
                  <div className="relative w-full aspect-video">
                    <Image
                      src={campaign.images[0]}
                      alt={campaign.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <Chip size="sm" variant="flat" className="mb-2">
                      {campaign.category}
                    </Chip>
                    <h5 className="font-semibold text-sm line-clamp-2 mb-2">
                      {campaign.title}
                    </h5>
                    <div className="text-xs text-gray-600">
                      Valor sugerido: {formatMoney(Math.floor((donationAmount * 100) / suggestedCampaigns.length))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};