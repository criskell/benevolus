import { Button, Card, Progress } from '@heroui/react';
import { Icon } from '@iconify/react';

export function CampaignSidebar() {
  return (
    <div className="space-y-6">
      {/* Main Donation Card */}
      <Card className="p-6 border border-default-200 overflow-hidden relative" shadow="none">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-10" />
        
        <div className="space-y-6">
          {/* Amount Section */}
          <div className="text-center">
            <p className="text-sm text-default-600 mb-2 font-medium">Arrecadado</p>
            <p className="text-4xl font-black bg-gradient-to-br from-primary to-primary-600 bg-clip-text text-transparent mb-1">
              R$ 6.934,51
            </p>
            <p className="text-sm text-default-600 font-medium">
              de <span className="text-foreground font-semibold">R$ 50.000,00</span>
            </p>
          </div>

          {/* Progress Bar */}
          <div>
            <Progress 
              value={14} 
              size="md"
              classNames={{
                indicator: "bg-gradient-to-r from-primary to-primary-600",
                track: "bg-default-200"
              }}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-default-600 font-medium">14% concluído</span>
              <span className="text-xs font-bold text-primary">86% restante</span>
            </div>
          </div>

          {/* Campaign Stats */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-default-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">567</p>
              <p className="text-xs text-default-600 font-medium mt-1">Doadores</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">23</p>
              <p className="text-xs text-default-600 font-medium mt-1">Dias restantes</p>
            </div>
          </div>

          {/* Donate Button */}
          <Button 
            className="w-full font-bold text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300" 
            color="primary"
            size="lg"
            startContent={<Icon icon="solar:heart-bold" width={24} />}
          >
            Fazer doação
          </Button>

          {/* Security Badge */}
          <div className="flex items-center gap-2 text-xs text-default-600 bg-default-50 p-3 rounded-xl">
            <Icon icon="solar:shield-check-bold" width={20} className="text-primary flex-shrink-0" />
            <span className="font-medium">Pagamento 100% seguro e protegido</span>
          </div>
        </div>
      </Card>

      {/* Trust Indicators */}
      <Card className="p-6 border border-default-200" shadow="none">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Icon icon="solar:shield-star-bold" width={24} className="text-primary" />
          Por que confiar
        </h3>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
              <Icon icon="solar:shield-check-bold" width={24} className="text-white" />
            </div>

            <div>
              <p className="font-semibold text-sm mb-1">Identidade verificada</p>
              <p className="text-xs text-default-600 leading-relaxed">
                Validamos a identidade e documentos do criador da campanha para garantir transparência.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Icon icon="solar:chart-2-bold" width={24} className="text-white" />
            </div>

            <div>
              <p className="font-semibold text-sm mb-1">Transparência total</p>
              <p className="text-xs text-default-600 leading-relaxed">
                Acompanhamento contínuo com relatórios e atualizações sobre o uso dos recursos.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Icon icon="solar:lock-keyhole-bold" width={24} className="text-white" />
            </div>

            <div>
              <p className="font-semibold text-sm mb-1">Pagamento seguro</p>
              <p className="text-xs text-default-600 leading-relaxed">
                Criptografia de dados, protocolos seguros e certificados de verificação.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Share Card */}
      <Card className="p-6 border border-default-200" shadow="none">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Icon icon="solar:share-bold" width={24} className="text-primary" />
          Compartilhar
        </h3>
        <p className="text-sm text-default-600 mb-4">Ajude divulgando esta campanha</p>
        
        <div className="flex gap-2">
          <Button 
            isIconOnly 
            variant="flat" 
            className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 transition-colors"
            size="lg"
          >
            <Icon icon="ri:facebook-fill" width={24} />
          </Button>
          <Button 
            isIconOnly 
            variant="flat" 
            className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 transition-colors"
            size="lg"
          >
            <Icon icon="ri:twitter-x-fill" width={24} />
          </Button>
          <Button 
            isIconOnly 
            variant="flat" 
            className="bg-green-500/10 hover:bg-green-500/20 text-green-600 transition-colors"
            size="lg"
          >
            <Icon icon="ri:whatsapp-fill" width={24} />
          </Button>
          <Button 
            isIconOnly 
            variant="flat" 
            className="bg-default-100 hover:bg-default-200 text-default-600 transition-colors"
            size="lg"
          >
            <Icon icon="solar:link-bold" width={24} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
