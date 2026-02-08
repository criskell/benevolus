'use client';

import { useState, useMemo, useEffect, useCallback, use } from 'react';
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
  Progress,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useSuggestedCampaigns } from '@/hooks/useSuggestedCampaigns';
import { formatMoney } from '@/lib/utils/format-money';
import { campaigns } from '@/data/campaigns';
import type { Campaign } from '@/models/campaign';

export default function DistributePage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = use(paramsPromise);
  const campaignSlug = params.slug;

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
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card
          className="p-8 max-w-md text-center border border-default-200"
          shadow="none"
        >
          <Icon
            icon="solar:danger-triangle-bold"
            width={64}
            className="text-warning mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Parâmetro ausente</h2>
          <p className="text-default-600">
            O parâmetro &apos;campaign&apos; não foi fornecido na URL.
          </p>
        </Card>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card
          className="p-8 max-w-md text-center border border-default-200"
          shadow="none"
        >
          <Icon
            icon="solar:box-minimalistic-bold"
            width={64}
            className="text-danger mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Campanha não encontrada</h2>
          <p className="text-default-600">
            Campanha com slug &apos;{campaignSlug}&apos; não foi encontrada.
          </p>
        </Card>
      </div>
    );
  }

  if (!campaign.image) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card
          className="p-8 max-w-md text-center border border-default-200"
          shadow="none"
        >
          <Icon
            icon="solar:gallery-bold"
            width={64}
            className="text-default-400 mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Imagem ausente</h2>
          <p className="text-default-600">Esta campanha não possui imagem.</p>
        </Card>
      </div>
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

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header - Campaign Info */}
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
                {/* Campaign Image */}
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

                {/* Campaign Details */}
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
                        Doe para
                      </p>
                      <h1 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
                        {campaign.title}
                      </h1>
                    </div>
                  </div>

                  <p className="text-default-700 leading-relaxed mb-6">
                    Sua doação fará a diferença! Ajude esta causa e transforme
                    vidas com sua generosidade.
                  </p>

                  {/* Campaign Progress */}
                  <div className="bg-default-50 border border-default-200 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-default-700">
                        Progresso
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
                        Meta: R${' '}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Smart Distribution Card */}
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
                        Distribuição Inteligente
                      </h3>
                      <p className="text-sm text-default-600">
                        Doe um valor e distribua automaticamente
                      </p>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-default-700 mb-3">
                      Valor Total da Doação
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                      {quickAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={
                            totalAmount === amount ? 'solid' : 'bordered'
                          }
                          color={totalAmount === amount ? 'primary' : 'default'}
                          size="lg"
                          className="font-semibold"
                          onPress={() => setTotalAmount(amount)}
                        >
                          R$ {amount}
                        </Button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      value={totalAmount.toString()}
                      onValueChange={(value) =>
                        setTotalAmount(parseFloat(value) || 0)
                      }
                      min="1"
                      step="0.01"
                      placeholder="Outro valor"
                      size="lg"
                      startContent={
                        <span className="text-default-600 font-semibold">
                          R$
                        </span>
                      }
                      classNames={{
                        input: 'text-lg font-semibold',
                      }}
                    />
                    <div className="mt-4 text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                      <p className="text-sm text-default-600 mb-1">
                        Total a doar
                      </p>
                      <p className="text-3xl font-black bg-gradient-to-br from-primary to-primary-600 bg-clip-text text-transparent">
                        {formatMoney(totalAmount * 100)}
                      </p>
                    </div>
                  </div>

                  {/* Distribution Tabs */}
                  <Tabs
                    selectedKey={distributionType}
                    onSelectionChange={(key) =>
                      setDistributionType(key as 'category' | 'favorites')
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
                          <span>Favoritos ({likedSlugs.length})</span>
                        </div>
                      }
                      isDisabled={likedSlugs.length < 2}
                    >
                      <div className="mt-6">
                        <p className="text-sm text-default-600 mb-4">
                          Distribua entre suas campanhas favoritadas
                        </p>
                        <RadioGroup
                          value={criteria}
                          onValueChange={(value) =>
                            setCriteria(value as 'equal' | 'mixed' | 'integral')
                          }
                          classNames={{
                            wrapper: 'gap-3',
                          }}
                        >
                          <Radio
                            value="equal"
                            classNames={{ label: 'text-sm' }}
                          >
                            <div>
                              <p className="font-semibold">
                                Dividir igualmente
                              </p>
                              <p className="text-xs text-default-500">
                                Mesmo valor para todas
                              </p>
                            </div>
                          </Radio>
                          <Radio
                            value="mixed"
                            classNames={{ label: 'text-sm' }}
                          >
                            <div>
                              <p className="font-semibold">
                                Distribuição inteligente
                              </p>
                              <p className="text-xs text-default-500">
                                80% principal, 20% dividido
                              </p>
                            </div>
                          </Radio>
                          <Radio
                            value="integral"
                            classNames={{ label: 'text-sm' }}
                          >
                            <div>
                              <p className="font-semibold">Valor integral</p>
                              <p className="text-xs text-default-500">
                                100% para a campanha principal
                              </p>
                            </div>
                          </Radio>
                        </RadioGroup>

                        {distribution.length > 0 && (
                          <div className="mt-6 p-4 bg-default-50 border border-default-200 rounded-2xl">
                            <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                              <Icon
                                icon="solar:pie-chart-2-bold"
                                width={20}
                                className="text-primary"
                              />
                              Prévia da Distribuição
                            </h5>
                            <div className="space-y-2">
                              {distribution.map((item) => {
                                const camp = campaignMap[item.slug];
                                const percentage = (
                                  (item.amount / (totalAmount * 100)) *
                                  100
                                ).toFixed(0);
                                return (
                                  <div
                                    key={item.slug}
                                    className="flex items-center justify-between p-3 bg-white border border-default-200 rounded-xl"
                                  >
                                    <div className="flex-1 min-w-0 mr-3">
                                      <p className="text-sm font-semibold text-foreground truncate">
                                        {camp?.title}
                                      </p>
                                      <p className="text-xs text-default-500">
                                        {percentage}% do total
                                      </p>
                                    </div>
                                    <span className="text-base font-bold text-primary whitespace-nowrap">
                                      {formatMoney(item.amount)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </Tab>
                    <Tab
                      key="category"
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="solar:folder-bold" width={20} />
                          <span>Relacionadas</span>
                        </div>
                      }
                    >
                      <div className="mt-6">
                        <p className="text-sm text-default-600 mb-4">
                          Distribua entre campanhas de {campaign.category}
                        </p>
                        <RadioGroup
                          value={criteria}
                          onValueChange={(value) =>
                            setCriteria(value as 'equal' | 'mixed' | 'integral')
                          }
                          classNames={{
                            wrapper: 'gap-3',
                          }}
                        >
                          <Radio
                            value="equal"
                            classNames={{ label: 'text-sm' }}
                          >
                            <div>
                              <p className="font-semibold">
                                Dividir igualmente
                              </p>
                              <p className="text-xs text-default-500">
                                Mesmo valor para todas
                              </p>
                            </div>
                          </Radio>
                          <Radio
                            value="mixed"
                            classNames={{ label: 'text-sm' }}
                          >
                            <div>
                              <p className="font-semibold">
                                Distribuição inteligente
                              </p>
                              <p className="text-xs text-default-500">
                                80% principal, 20% dividido
                              </p>
                            </div>
                          </Radio>
                          <Radio
                            value="integral"
                            classNames={{ label: 'text-sm' }}
                          >
                            <div>
                              <p className="font-semibold">Valor integral</p>
                              <p className="text-xs text-default-500">
                                100% para a campanha principal
                              </p>
                            </div>
                          </Radio>
                        </RadioGroup>

                        {distribution.length > 0 && (
                          <div className="mt-6 p-4 bg-default-50 border border-default-200 rounded-2xl">
                            <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                              <Icon
                                icon="solar:pie-chart-2-bold"
                                width={20}
                                className="text-primary"
                              />
                              Prévia da Distribuição
                            </h5>
                            <div className="space-y-2">
                              {distribution.map((item) => {
                                const camp = campaignMap[item.slug];
                                const percentage = (
                                  (item.amount / (totalAmount * 100)) *
                                  100
                                ).toFixed(0);
                                return (
                                  <div
                                    key={item.slug}
                                    className="flex items-center justify-between p-3 bg-white border border-default-200 rounded-xl"
                                  >
                                    <div className="flex-1 min-w-0 mr-3">
                                      <p className="text-sm font-semibold text-foreground truncate">
                                        {camp?.title}
                                      </p>
                                      <p className="text-xs text-default-500">
                                        {percentage}% do total
                                      </p>
                                    </div>
                                    <span className="text-base font-bold text-primary whitespace-nowrap">
                                      {formatMoney(item.amount)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </Tab>
                  </Tabs>
                </CardBody>
              </Card>
            </motion.div>

            {/* Related Campaigns */}
            {relatedCampaigns.length > 0 && (
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
                      Campanhas relacionadas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {relatedCampaigns.slice(0, 3).map((related) => (
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
                                  onPress={() =>
                                    handleQuickDonate(related, 1000)
                                  }
                                  className="flex-1 font-semibold"
                                >
                                  R$ 10
                                </Button>
                                <Button
                                  size="sm"
                                  color="primary"
                                  onPress={() =>
                                    handleQuickDonate(related, 2500)
                                  }
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
            )}
          </div>

          {/* Sidebar - Cart */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border border-default-200" shadow="none">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Icon
                        icon="solar:cart-large-2-bold"
                        width={24}
                        className="text-primary"
                      />
                      Sua Lista de Doações
                    </h3>

                    {cart.cart.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon
                          icon="solar:cart-large-minimalistic-bold"
                          width={64}
                          className="text-default-300 mx-auto mb-3"
                        />
                        <p className="text-default-500 text-sm">
                          Nenhuma doação adicionada ainda
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                          {cart.cart.map((item, index) => (
                            <div
                              key={index}
                              className="p-3 bg-default-50 border border-default-200 rounded-xl"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <p className="text-sm font-semibold text-foreground flex-1 mr-2 line-clamp-2">
                                  {item.title}
                                </p>
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  color="danger"
                                  onPress={() => cart.removeFromCart(index)}
                                >
                                  <Icon
                                    icon="solar:trash-bin-minimalistic-bold"
                                    width={18}
                                  />
                                </Button>
                              </div>
                              {editingIndex === index ? (
                                <div className="flex gap-2">
                                  <Input
                                    type="number"
                                    value={editedAmount.toString()}
                                    onValueChange={(value) =>
                                      setEditedAmount(parseFloat(value) || 0)
                                    }
                                    min="0.01"
                                    step="0.01"
                                    size="sm"
                                    startContent={
                                      <span className="text-xs">R$</span>
                                    }
                                  />
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
                                    ✓
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="flat"
                                    onPress={() => setEditingIndex(null)}
                                  >
                                    ✕
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center justify-between">
                                  <span className="text-base font-black text-primary">
                                    {formatMoney(item.amount)}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="flat"
                                    startContent={
                                      <Icon icon="solar:pen-bold" width={14} />
                                    }
                                    onPress={() => {
                                      setEditingIndex(index);
                                      setEditedAmount(item.amount / 100);
                                    }}
                                  >
                                    Editar
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-default-200 mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-default-700">
                              Total
                            </span>
                            <span className="text-2xl font-black bg-gradient-to-br from-primary to-primary-600 bg-clip-text text-transparent">
                              {formatMoney(
                                cart.cart.reduce(
                                  (sum, item) => sum + item.amount,
                                  0
                                )
                              )}
                            </span>
                          </div>
                        </div>

                        <Button
                          color="primary"
                          size="lg"
                          className="w-full font-bold shadow-lg shadow-primary/30"
                          startContent={
                            <Icon icon="solar:check-circle-bold" width={24} />
                          }
                          onPress={() => setShowDonationSummary(true)}
                        >
                          Finalizar Doação
                        </Button>

                        <div className="mt-4 flex items-center gap-2 text-xs text-default-600 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                          <Icon
                            icon="solar:shield-check-bold"
                            width={18}
                            className="text-emerald-600 flex-shrink-0"
                          />
                          <span className="font-medium">
                            Pagamento 100% seguro
                          </span>
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Summary Modal */}
      <Modal
        isOpen={showDonationSummary}
        onClose={() => setShowDonationSummary(false)}
        size="2xl"
        classNames={{
          backdrop: 'bg-black/50 backdrop-blur-sm',
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 border-b border-default-200">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Icon
                icon="solar:document-text-bold"
                width={28}
                className="text-primary"
              />
              Resumo da Doação
            </h3>
          </ModalHeader>
          <ModalBody className="py-6">
            <div className="text-center mb-6">
              <p className="text-sm text-default-600 mb-3 font-medium">
                QR Code para pagamento
              </p>
              <div className="w-48 h-48 bg-gradient-to-br from-default-100 to-default-200 mx-auto flex items-center justify-center rounded-2xl border-2 border-dashed border-default-300">
                <div className="text-center">
                  <Icon
                    icon="solar:qr-code-bold"
                    width={64}
                    className="text-default-400 mx-auto mb-2"
                  />
                  <span className="text-xs text-default-500 font-medium">
                    QR Code será gerado aqui
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-default-50 border border-default-200 rounded-2xl p-4 mb-4">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Icon
                  icon="solar:list-bold"
                  width={20}
                  className="text-primary"
                />
                Suas doações
              </h4>
              <div className="space-y-2">
                {cart.cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-white border border-default-200 rounded-xl"
                  >
                    <span className="text-sm font-semibold text-foreground truncate mr-3">
                      {item.title}
                    </span>
                    <span className="text-base font-bold text-primary whitespace-nowrap">
                      {formatMoney(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-foreground">
                  Total a pagar:
                </span>
                <span className="text-3xl font-black bg-gradient-to-br from-primary to-primary-600 bg-clip-text text-transparent">
                  {formatMoney(
                    cart.cart.reduce((sum, item) => sum + item.amount, 0)
                  )}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-default-600">
              <Icon
                icon="solar:info-circle-bold"
                width={18}
                className="text-primary"
              />
              <span>
                Após o pagamento, você receberá um comprovante por e-mail
              </span>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
