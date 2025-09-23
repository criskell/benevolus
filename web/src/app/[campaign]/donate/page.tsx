'use client';

import {
  Alert,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Input,
  Switch,
} from '@heroui/react';

import placeholder from '@/assets/images/placeholder1.jpg';

export default function CampaignDonatePage() {
  return (
    <div className="max-w-[1280px] mx-auto w-full my-10">
      <Breadcrumbs>
        <BreadcrumbItem>Campanha</BreadcrumbItem>
        <BreadcrumbItem>Doar</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex gap-12 mt-8">
        <div className="space-y-8 grow">
          <h1 className="text-3xl font-semibold">
            Vamos contribuir com a campanha
          </h1>

          <Card className="p-12 border border-divider" shadow="none">
            <p className="text-sm font-medium mb-1">Valor da contribuição</p>

            <Input
              type="number"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              className="mb-1"
            />

            <div className="flex gap-2 mt-2 font-medium">
              <Button
                variant="bordered"
                className="border-default-100"
                radius="full"
              >
                R$ 10,00
              </Button>
              <Button
                variant="bordered"
                className="border-default-100"
                radius="full"
              >
                R$ 30,00
              </Button>
              <Button
                variant="bordered"
                className="border-default-100"
                radius="full"
              >
                R$ 100,00
              </Button>
              <Button
                variant="bordered"
                className="border-default-100"
                radius="full"
              >
                R$ 200,00
              </Button>
            </div>
          </Card>

          <Card className="p-12 border border-divider space-y-6" shadow="none">
            <p className="text-lg font-semibold">Dados pessoais</p>

            <div className="flex flex-col gap-4">
              <Input label="Nome" labelPlacement="outside-top" />
              <Input label="E-mail" labelPlacement="outside-top" />
              <Input label="CPF" labelPlacement="outside-top" />
              <Input label="Telefone" labelPlacement="outside-top" />
            </div>

            <Alert
              hideIcon
              classNames={{
                mainWrapper: 'flex-row justify-between items-center',
              }}
              className="text-sm font-medium"
            >
              Fazer doação anônima?
              <Switch />
            </Alert>
          </Card>
        </div>

        <aside className="max-w-md w-full">
          <Card className="p-12 border border-divider space-y-6" shadow="none">
            <p className="text-lg font-semibold">Campanha</p>

            <img src={placeholder.src} className="rounded-xl" />

            <p className="text-zinc-500 font-medium">
              Campanha para Fulana, mãe solo que cria sozinha seus gêmeos
              prematuros
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
