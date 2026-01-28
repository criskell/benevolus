'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Image, Chip, Card, CardBody, RadioGroup, Radio } from '@heroui/react';
import { useState } from 'react';
import { useDonationContext } from '@/contexts/DonationContext';
import { useSuggestedCampaigns } from '@/hooks/useSuggestedCampaigns';
import { formatMoney } from '@/lib/utils/format-money';
import { campaigns } from '@/data/campaigns';
import type { Campaign } from '@/models/campaign';

interface DonationModalProps {
  campaign: Campaign;
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal = ({ campaign, isOpen, onClose }: DonationModalProps) => {
  const { cart, favorites } = useDonationContext();
  const { getRelated } = useSuggestedCampaigns();
  const [amount, setAmount] = useState(10);
  const [totalAmount, setTotalAmount] = useState(50);
  const [criteria, setCriteria] = useState<'equal' | 'mixed'>('equal');
  const [distributionType, setDistributionType] = useState<'category' | 'favorites'>('category');

  const relatedCampaigns = getRelated(campaign.category, campaign.slug);
  const campaignMap = campaigns.campaigns.reduce((acc, c) => {
    acc[c.slug] = c;
    return acc;
  }, {} as Record<string, typeof campaigns.campaigns[0]>);
  const likedSlugs = favorites.favorites.map(f => f.slug);
  const distributionSlugs = distributionType === 'category' ? [campaign.slug, ...relatedCampaigns.slice(0, 2).map(c => c.slug)].filter((s): s is string => !!s) : likedSlugs;
  const distribution = cart.autoSplit(totalAmount * 100, distributionSlugs, criteria);

  const handleDonate = () => {
    cart.addToCart({
      slug: campaign.slug || '',
      title: campaign.title,
      image: campaign.images?.[0] || campaign.image,
      amount: amount * 100,
    });
    onClose();
    setAmount(10);
  };

  const handleQuickDonate = (relatedCampaign: Campaign, quickAmount: number) => {
    cart.addToCart({
      slug: relatedCampaign.slug || '',
      title: relatedCampaign.title,
      image: relatedCampaign.images?.[0] || relatedCampaign.image,
      amount: quickAmount,
    });
  };

  const handleAutoDistribute = () => {
    cart.clearCart();
    distribution.forEach(item => {
      const camp = campaignMap[item.slug];
      if (camp) {
        cart.addToCart({
          slug: item.slug,
          title: camp.title,
          image: camp.image,
          amount: item.amount,
        });
      }
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader>
          <h3 className="text-lg font-semibold">Fazer Doação</h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Image
                src={campaign.images?.[0] || campaign.image}
                alt={campaign.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h4 className="font-semibold">{campaign.title}</h4>
                <Chip size="sm" variant="flat" className="mt-1">
                  {campaign.category}
                </Chip>
              </div>
            </div>

            <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
              <h4 className="font-semibold text-primary mb-4">💡 Distribuição Inteligente</h4>
              <p className="text-sm text-gray-600 mb-4">
                Doe um valor total e distribua automaticamente entre campanhas da mesma categoria ou suas favoritas!
              </p>

              <RadioGroup value={distributionType} onValueChange={(value) => setDistributionType(value as 'category' | 'favorites')} className="mb-4">
                <Radio value="category">
                  <div>
                    <strong>Campanhas da mesma categoria</strong>
                    <p className="text-sm text-gray-600">Distribua entre campanhas de {campaign.category}</p>
                  </div>
                </Radio>
                <Radio value="favorites" disabled={likedSlugs.length < 2}>
                  <div>
                    <strong>Minhas campanhas favoritas</strong>
                    <p className="text-sm text-gray-600">Distribua entre suas campanhas favoritadas ({likedSlugs.length} selecionadas)</p>
                  </div>
                </Radio>
              </RadioGroup>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Valor Total (R$)
                    </label>
                    <Input
                      type="number"
                      value={totalAmount.toString()}
                      onChange={(e) => setTotalAmount(parseFloat(e.target.value) || 0)}
                      min="1"
                      step="0.01"
                      placeholder="50.00"
                    />
                  </div>

                  <RadioGroup value={criteria} onValueChange={(value) => setCriteria(value as 'equal' | 'mixed')}>
                    <Radio value="equal">
                      <div>
                        <strong>Dividir igualmente</strong>
                        <p className="text-sm text-gray-600">Mesmo valor para todas as campanhas curtidas</p>
                      </div>
                    </Radio>
                    <Radio value="mixed">
                      <div>
                        <strong>Distribuição inteligente</strong>
                        <p className="text-sm text-gray-600">80% para a principal, 20% dividido entre as outras</p>
                      </div>
                    </Radio>
                  </RadioGroup>

                  {distribution.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-2">Prévia da Distribuição</h5>
                      <div className="space-y-2">
                        {distribution.map((item) => {
                          const camp = campaignMap[item.slug];
                          return (
                            <div key={item.slug} className="flex justify-between text-sm bg-white p-2 rounded">
                              <span className="truncate mr-2">{camp?.title}</span>
                              <span className="font-medium text-primary">{formatMoney(item.amount)}</span>
                            </div>
                          );
                        })}
                      </div>
                      <Button
                        color="primary"
                        className="w-full mt-4"
                        onPress={handleAutoDistribute}
                      >
                        Aplicar Distribuição Inteligente
                      </Button>
                    </div>
                  )}
                </div>
              </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-4">Ou doe para esta campanha específica</h4>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Valor da Doação (R$)
                </label>
                <Input
                  type="number"
                  value={amount.toString()}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  min="1"
                  step="0.01"
                  placeholder="10.00"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Valor mínimo: R$ 1,00
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Taxa de serviço:</strong> Apenas 0,5% (muito abaixo dos 6% da Vakinha tradicional)
              </p>
            </div>
          </div>

          {relatedCampaigns.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Você também pode ajudar</h4>
              <div className="space-y-3">
                {relatedCampaigns.map((related) => (
                  <Card key={related.slug}>
                    <CardBody className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <Image
                            src={related.images?.[0] || related.image}
                            alt={related.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h5 className="text-sm font-medium line-clamp-1">{related.title}</h5>
                            <Chip size="sm" variant="flat" className="mt-1">
                              {related.category}
                            </Chip>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="light"
                          onPress={() => handleQuickDonate(related, 500)}
                        >
                          +R$5
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            onPress={handleDonate}
            disabled={amount < 1}
          >
            Adicionar ao Carrinho - {formatMoney(amount * 100)}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};