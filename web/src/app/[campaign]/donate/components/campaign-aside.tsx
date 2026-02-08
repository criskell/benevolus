import { Card, Progress, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import placeholder from '@/assets/images/placeholder1.jpg';

export function CampaignAside() {
  return (
    <aside className="w-full lg:w-[380px] xl:w-[420px]">
      <div className="lg:sticky lg:top-24 space-y-6">
        {/* Campaign Summary Card */}
        <Card className="p-6 border border-default-200 overflow-hidden relative" shadow="none">
          {/* Decorative background */}
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl -z-10" />
          
          <div className="flex items-center gap-2 mb-4">
            <Icon icon="solar:bookmark-bold" width={20} className="text-primary" />
            <h3 className="text-lg font-bold text-foreground">Resumo da campanha</h3>
          </div>

          {/* Campaign Image */}
          <div className="relative mb-4 rounded-2xl overflow-hidden border border-default-200">
            <img 
              src={placeholder.src} 
              alt="Campanha"
              className="w-full aspect-video object-cover"
            />
            {/* Verified Badge Overlay */}
            <div className="absolute top-3 right-3">
              <Chip
                size="sm"
                variant="flat"
                className="bg-emerald-500/90 backdrop-blur-md text-white font-semibold shadow-lg"
                startContent={<Icon icon="solar:shield-check-bold" width={14} />}
              >
                Verificada
              </Chip>
            </div>
          </div>

          {/* Campaign Title */}
          <h4 className="font-bold text-foreground leading-snug mb-4">
            Campanha para Fulana, mãe solo que cria sozinha seus gêmeos prematuros
          </h4>

          {/* Progress Info */}
          <div className="space-y-3 mb-4">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-sm text-default-600 mb-1">Arrecadado</p>
                <p className="text-2xl font-black bg-gradient-to-br from-primary to-primary-600 bg-clip-text text-transparent">
                  R$ 6.934,51
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-default-600 mb-1">Meta</p>
                <p className="text-lg font-bold text-foreground">
                  R$ 50.000,00
                </p>
              </div>
            </div>

            <Progress 
              value={14} 
              size="md"
              classNames={{
                indicator: "bg-gradient-to-r from-primary to-primary-600",
              }}
            />

            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-default-600">14% concluído</span>
              <span className="text-primary">86% restante</span>
            </div>
          </div>

          {/* Campaign Stats */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-default-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon icon="solar:users-group-rounded-bold" width={20} className="text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">567</p>
                <p className="text-xs text-default-600">Doadores</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Icon icon="solar:clock-circle-bold" width={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">23</p>
                <p className="text-xs text-default-600">Dias restantes</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Trust Badge Card */}
        <Card className="p-6 border border-default-200" shadow="none">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 flex-shrink-0">
              <Icon icon="solar:shield-star-bold" width={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">
                Proteção ao doador
              </h3>
              <p className="text-xs text-default-600 leading-relaxed">
                Suas doações estão protegidas. Monitoramos todas as campanhas e garantimos transparência total no uso dos recursos.
              </p>
            </div>
          </div>
        </Card>

        {/* Help Card */}
        <Card className="p-6 border border-default-200" shadow="none">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-default-100 flex items-center justify-center flex-shrink-0">
              <Icon icon="solar:question-circle-bold" width={24} className="text-default-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">
                Precisa de ajuda?
              </h3>
              <p className="text-xs text-default-600 leading-relaxed mb-3">
                Entre em contato com nossa equipe de suporte.
              </p>
              <a 
                href="#" 
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                Falar com suporte
                <Icon icon="solar:arrow-right-linear" width={16} />
              </a>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  );
}
