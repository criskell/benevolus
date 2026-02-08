'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Button,
  Input,
  Image,
  Chip,
  Card,
  CardBody,
  RadioGroup,
  Radio,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@heroui/react';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useSuggestedCampaigns } from '@/hooks/useSuggestedCampaigns';
import { formatMoney } from '@/lib/utils/format-money';
import { campaigns } from '@/data/campaigns';
import type { Campaign } from '@/models/campaign';

const DoarPage = () => {
  const searchParams = useSearchParams();
  const campaignSlug = searchParams.get('campaign');

  const cart = useCart();
  const { favorites } = useFavorites();
  const { getRelated } = useSuggestedCampaigns();

  const likedSlugs = favorites.map((f) => f.slug);

  const [totalAmount, setTotalAmount] = useState(50);
  const [criteria, setCriteria] = useState<'equal' | 'mixed' | 'integral'>(
    'mixed'
  );
  const [distributionType, setDistributionType] = useState<
    'category' | 'favorites'
  >(likedSlugs.length >= 2 ? 'favorites' : 'category');
  const [showDonationSummary, setShowDonationSummary] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedAmount, setEditedAmount] = useState(0);

  const campaign = campaigns.campaigns.find((c) => c.slug === campaignSlug);

  const targetCampaigns = useMemo(() => {
    if (!campaign) return [];
    if (distributionType === 'category') {
      return campaigns.campaigns.filter(
        (c) => c.category === campaign.category
      );
    } else {
      return campaigns.campaigns.filter((c) => likedSlugs.includes(c.slug));
    }
  }, [distributionType, likedSlugs, campaign]);

  const distribution = useMemo(() => {
    if (!campaign) return [];

    if (criteria === 'integral') {
      return [{ slug: campaign.slug, amount: totalAmount * 100 }];
    }

    if (targetCampaigns.length === 0) return [];

    if (criteria === 'equal') {
      const amountPer = Math.floor(
        (totalAmount * 100) / targetCampaigns.length
      );
      return targetCampaigns.map((c) => ({ slug: c.slug, amount: amountPer }));
    } else {
      const mainAmount = Math.floor(totalAmount * 0.8 * 100);
      const remainingAmount = Math.floor(totalAmount * 0.2 * 100);
      const otherCampaigns = targetCampaigns.filter(
        (c) => c.slug !== campaign.slug
      );
      const amountPerOther =
        otherCampaigns.length > 0
          ? Math.floor(remainingAmount / otherCampaigns.length)
          : 0;

      const result = [];
      result.push({ slug: campaign.slug, amount: mainAmount });
      otherCampaigns.forEach((c) =>
        result.push({ slug: c.slug, amount: amountPerOther })
      );
      return result;
    }
  }, [targetCampaigns, criteria, totalAmount, campaign]);

  useEffect(() => {
    handleAutoDistribute();
  }, [criteria, distributionType, totalAmount]);

  if (!campaignSlug) {
    return (
      <div className="container mx-auto px-4 py-8">
        Parâmetro &apos;campaign&apos; não fornecido na URL.
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="container mx-auto px-4 py-8">
        Campanha com slug &apos;{campaignSlug}&apos; não encontrada.
      </div>
    );
  }

  if (!campaign.image) {
    return (
      <div className="container mx-auto px-4 py-8">Campanha sem imagem.</div>
    );
  }

  const relatedCampaigns = getRelated(campaign.category, campaign.slug);

  const campaignMap = campaigns.campaigns.reduce((acc, c) => {
    acc[c.slug] = c;
    return acc;
  }, {} as Record<string, (typeof campaigns.campaigns)[0]>);

  const handleAutoDistribute = useCallback(() => {
    cart.clearCart();
    distribution.forEach((item) => {
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
  }, [distribution, campaignMap, cart]);

  const handleQuickDonate = (
    relatedCampaign: Campaign,
    quickAmount: number
  ) => {
    cart.addToCart({
      slug: relatedCampaign.slug || '',
      title: relatedCampaign.title,
      image: relatedCampaign.image,
      amount: quickAmount,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Image
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
        <Chip size="sm" variant="flat" className="mb-4">
          {campaign.category}
        </Chip>
        <p className="text-gray-600">Ajude esta causa com sua doação!</p>
      </div>

      <Card className="mb-6">
        <CardBody>
          <h3 className="text-lg font-semibold text-primary mb-4">
            💡 Distribuição Inteligente
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Doe um valor total e distribua automaticamente!
          </p>

          <div className="mb-4">
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
            <div className="text-center text-lg font-semibold text-primary mt-2">
              Total a doar: {formatMoney(totalAmount * 100)}
            </div>
          </div>

          <Tabs
            selectedKey={distributionType}
            onSelectionChange={(key) =>
              setDistributionType(key as 'category' | 'favorites')
            }
          >
            <Tab
              key="favorites"
              title="Favoritos"
              isDisabled={likedSlugs.length < 2}
            >
              <p className="text-sm text-gray-600 mb-4">
                Distribua entre suas campanhas favoritadas ({likedSlugs.length}{' '}
                selecionadas)
              </p>
              <RadioGroup
                value={criteria}
                onValueChange={(value) =>
                  setCriteria(value as 'equal' | 'mixed' | 'integral')
                }
                className="mb-4"
              >
                <Radio value="equal">
                  Dividir igualmente - Mesmo valor para todas as campanhas
                </Radio>
                <Radio value="mixed">
                  Distribuição inteligente - 80% para a principal, 20% dividido
                  entre as outras
                </Radio>
                <Radio value="integral">
                  Valor integral - 100% para a campanha principal
                </Radio>
              </RadioGroup>
              {distribution.length > 0 && (
                <div>
                  <h5 className="font-medium mb-2">Prévia da Distribuição</h5>
                  <div className="space-y-2">
                    {distribution.map((item) => {
                      const camp = campaignMap[item.slug];
                      return (
                        <div
                          key={item.slug}
                          className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                        >
                          <span className="truncate mr-2">{camp?.title}</span>
                          <span className="font-medium text-primary">
                            {formatMoney(item.amount)}
                          </span>
                        </div>
                      );
                    })}
                    <div className="flex justify-between font-semibold text-primary bg-gray-100 p-2 rounded mt-2">
                      <span>Total:</span>
                      <span>
                        {formatMoney(
                          distribution.reduce(
                            (sum, item) => sum + item.amount,
                            0
                          )
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Tab>
            <Tab key="category" title="Relacionadas">
              <p className="text-sm text-gray-600 mb-4">
                Distribua entre campanhas de {campaign.category}
              </p>
              <RadioGroup
                value={criteria}
                onValueChange={(value) =>
                  setCriteria(value as 'equal' | 'mixed' | 'integral')
                }
                className="mb-4"
              >
                <Radio value="equal">
                  Dividir igualmente - Mesmo valor para todas as campanhas
                </Radio>
                <Radio value="mixed">
                  Distribuição inteligente - 80% para a principal, 20% dividido
                  entre as outras
                </Radio>
                <Radio value="integral">
                  Valor integral - 100% para a campanha principal
                </Radio>
              </RadioGroup>
              {distribution.length > 0 && (
                <div>
                  <h5 className="font-medium mb-2">Prévia da Distribuição</h5>
                  <div className="space-y-2">
                    {distribution.map((item) => {
                      const camp = campaignMap[item.slug];
                      return (
                        <div
                          key={item.slug}
                          className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                        >
                          <span className="truncate mr-2">{camp?.title}</span>
                          <span className="font-medium text-primary">
                            {formatMoney(item.amount)}
                          </span>
                        </div>
                      );
                    })}
                    <div className="flex justify-between font-semibold text-primary bg-gray-100 p-2 rounded mt-2">
                      <span>Total:</span>
                      <span>
                        {formatMoney(
                          distribution.reduce(
                            (sum, item) => sum + item.amount,
                            0
                          )
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      <Card className="mb-6">
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">Campanhas relacionadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedCampaigns.slice(0, 3).map((related) => (
              <Card
                key={related.slug}
                className="hover:shadow-lg transition-shadow"
              >
                <CardBody className="p-0">
                  <Image
                    src={related.images?.[0] || related.image}
                    alt={related.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h4 className="text-sm font-medium line-clamp-2 mb-2">
                      {related.title}
                    </h4>
                    <Chip size="sm" variant="flat" className="mb-3">
                      {related.category}
                    </Chip>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={() => handleQuickDonate(related, 1000)}
                        className="flex-1"
                      >
                        R$ 10
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={() => handleQuickDonate(related, 2500)}
                        className="flex-1"
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

      <Card className="mb-6">
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">Sua Lista de Doações</h3>
          {cart.cart.length === 0 ? (
            <p className="text-gray-500 text-center">Lista vazia</p>
          ) : (
            <div>
              <div className="max-h-64 overflow-y-auto">
                <Table aria-label="Lista de doações" className="min-w-full">
                  <TableHeader>
                    <TableColumn>Campanha</TableColumn>
                    <TableColumn className="text-right">Valor</TableColumn>
                    <TableColumn className="text-center">Ações</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {cart.cart.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="truncate max-w-xs">
                          {item.title}
                        </TableCell>
                        <TableCell className="text-right">
                          {editingIndex === index ? (
                            <Input
                              type="number"
                              value={editedAmount.toString()}
                              onChange={(e) =>
                                setEditedAmount(parseFloat(e.target.value) || 0)
                              }
                              min="0.01"
                              step="0.01"
                              size="sm"
                              className="w-20"
                            />
                          ) : (
                            formatMoney(item.amount)
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {editingIndex === index ? (
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                color="primary"
                                onPress={() => {
                                  cart.updateQuantity(
                                    index,
                                    editedAmount * 100
                                  );
                                  setEditingIndex(null);
                                }}
                              >
                                Salvar
                              </Button>
                              <Button
                                size="sm"
                                variant="flat"
                                onPress={() => setEditingIndex(null)}
                              >
                                Cancelar
                              </Button>
                            </div>
                          ) : (
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="flat"
                                onPress={() => {
                                  setEditingIndex(index);
                                  setEditedAmount(item.amount / 100);
                                }}
                              >
                                Editar
                              </Button>
                              <Button
                                size="sm"
                                color="danger"
                                variant="flat"
                                onPress={() => cart.removeFromCart(index)}
                              >
                                Remover
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-between font-semibold text-primary bg-gray-100 p-2 rounded mt-2">
                <span>Total:</span>
                <span>
                  {formatMoney(
                    cart.cart.reduce((sum, item) => sum + item.amount, 0)
                  )}
                </span>
              </div>
              <Button
                color="primary"
                className="w-full mt-4"
                onPress={() => setShowDonationSummary(true)}
              >
                Finalizar Doação
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      <Modal
        isOpen={showDonationSummary}
        onClose={() => setShowDonationSummary(false)}
        size="lg"
      >
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-semibold">Resumo da Doação</h3>
          </ModalHeader>
          <ModalBody>
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-2">
                QR Code para pagamento (exemplo)
              </p>
              <div className="w-32 h-32 bg-gray-200 mx-auto flex items-center justify-center rounded">
                <span className="text-xs text-gray-500">
                  QR Code Placeholder
                </span>
              </div>
            </div>
            <h4 className="font-medium mb-2">Doações:</h4>
            <div className="space-y-2">
              {cart.cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                >
                  <span className="truncate mr-2">{item.title}</span>
                  <span className="font-medium">
                    {formatMoney(item.amount)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>
                  {formatMoney(
                    cart.cart.reduce((sum, item) => sum + item.amount, 0)
                  )}
                </span>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DoarPage;
