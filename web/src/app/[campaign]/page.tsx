'use client';

import { Card, CardBody } from '@heroui/card';
import { Chip, Button, Progress, Avatar, Badge } from '@heroui/react';
import {
  HeartIcon,
  MessageCircleIcon,
  ShieldIcon,
  StarIcon,
  UsersIcon,
  ZapIcon,
} from 'lucide-react';

import { createDonation } from '@/lib/http/generated';
import { formatMoney } from '@/lib/utils/format-money';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';
import placeholderImage1 from '@/assets/images/placeholder1.jpg';

export default function CampaignPage() {
  return (
    <div className="flex-1 my-16 max-w-[1280px] mx-auto flex gap-16 justify-between relative">
      <main className="w-full space-y-8">
        <Card
          className="p-12 border border-divider flex flex-row gap-4"
          shadow="none"
        >
          <Avatar
            name="Fulana"
            getInitials={getUserNameInitials}
            color="primary"
            size="lg"
            className="flex-shrink-0"
          />

          <div>
            <div>
              <h2 className="text-2xl font-semibold max-w-3xl">
                Campanha para Fulana, mãe solo que cria sozinha seus gêmeos
                prematuros
              </h2>
            </div>

            <div>
              <img
                src={placeholderImage1.src}
                alt="Imagem"
                className="rounded-lg h-80 mt-4"
              />
            </div>

            <div className="mt-4">
              <div className="flex gap-4 items-center text-zinc-500 text-sm">
                <span className="inline-flex items-center gap-2">
                  <HeartIcon size={20} />
                  1.234 curtidas
                </span>

                <span className="inline-flex items-center gap-2">
                  <UsersIcon size={20} />
                  567 doadores
                </span>

                <span className="inline-flex items-center gap-2">
                  <MessageCircleIcon size={20} />
                  89 comentários
                </span>
              </div>

              <div className="flex gap-2 items-center mt-4">
                <Chip color="success" size="sm">
                  Campanha verificada
                </Chip>
                <Chip color="primary" size="sm">
                  Documentos verificados
                </Chip>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-12 border border-divider" shadow="none">
          <p className="text-lg font-semibold mb-6">Imagens</p>

          <div className="flex gap-2 overflow-x-auto">
            {Array.from({ length: 10 }, (_, index) => (
              <img
                src={placeholderImage1.src}
                alt="Imagem"
                className="rounded-lg w-80 object-cover mt-4"
                key={index}
              />
            ))}
          </div>
        </Card>

        <Card className="p-12 border border-divider" shadow="none">
          <p className="text-lg font-semibold mb-6">História</p>

          <div className="space-y-3 text-zinc-500 font-medium">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque iaculis vitae metus quis dapibus. Fusce nec faucibus
              sem, vel condimentum nulla. Duis tincidunt sed tellus ac lobortis.
              Curabitur eget dolor non tellus dictum dapibus. Fusce porttitor
              tellus nec aliquet malesuada. Morbi vitae cursus enim. Vestibulum
              placerat dolor sit amet dui ullamcorper viverra. Praesent aliquet
              ut nibh id placerat. Donec a sapien in sem volutpat gravida.
              Aenean ac faucibus nunc. Fusce finibus neque libero, eget
              convallis libero porttitor a.
            </p>

            <p>
              Vestibulum non pellentesque erat, nec viverra odio. Nunc neque
              libero, vulputate at vestibulum pulvinar, auctor in arcu. Maecenas
              aliquam, diam ac blandit maximus, elit eros consectetur massa, et
              finibus urna nibh sed leo. Aliquam pulvinar feugiat venenatis.
              Nulla malesuada ligula vel leo dictum lacinia. Duis condimentum,
              mi varius blandit sodales, enim nisi mollis diam, eget finibus
              lacus odio accumsan sem. Nam tincidunt facilisis sapien ut mollis.
              Nam non gravida sapien, sit amet tincidunt sapien. Morbi eget
              velit ut lacus egestas auctor. Mauris in augue in ex tincidunt
              aliquet. Vestibulum ornare in eros ac finibus. Suspendisse eget
              risus sed libero placerat sollicitudin. Mauris vitae aliquet leo.
              Ut eu nibh lectus.
            </p>
          </div>
        </Card>

        <Card className="p-12 border border-divider" shadow="none">
          <div className="text-lg font-semibold mb-6 flex items-center gap-4">
            Atualizações
            <Badge content="0"> </Badge>
          </div>

          <p className="text-center text-zinc-500">
            Por enquanto não temos atualizações desta campanha. <br /> Fique de
            olho, atualizações serão sempre divulgadas.
          </p>
        </Card>

        <Card className="p-12 border border-divider" shadow="none">
          <div className="text-lg font-semibold mb-6 flex items-center gap-6">
            Doadores
            <Badge content="427"> </Badge>
          </div>

          <div className="space-y-4 flex flex-col">
            {[
              {
                donor: {
                  name: 'Anônimo',
                },
                createdAt: 'há cerca de 1 hora',
                value: 1000,
              },
              {
                donor: {
                  name: 'Anônimo',
                },
                value: 5000,
                createdAt: 'há cerca de 1 hora',
              },
              {
                donor: {
                  name: 'Fulana',
                },
                value: 500,
                createdAt: 'há cerca de 2 horas',
              },
              {
                donor: {
                  name: 'Ciclano',
                },
                value: 600,
                createdAt: 'há cerca de 2 horas',
              },
              {
                donor: {
                  name: 'Silvano',
                },
                value: 700,
                createdAt: 'há cerca de 3 horas',
              },
            ].map((donation, idx) => (
              <div className="flex gap-4 font-medium items-center" key={idx}>
                <Avatar
                  name={donation.donor.name}
                  getInitials={getUserNameInitials}
                />

                <div className="text-sm space-y-1 text-zinc-700">
                  <p className="font-bold">{donation.donor.name}</p>
                  <p>{donation.createdAt}</p>
                </div>

                <p className="ml-auto text-green-500">
                  R$ {formatMoney(donation.value)}
                </p>
              </div>
            ))}

            <Button variant="flat">Ver mais</Button>
          </div>
        </Card>

        <Card className="p-12 border border-divider" shadow="none">
          <div className="text-lg font-semibold mb-6 flex items-center gap-6">
            Comentários
            <Badge content="2"> </Badge>
          </div>

          <div className="space-y-8 flex flex-col">
            {[
              {
                author: {
                  name: 'Anônimo',
                },
                body: 'Força na luta sempre!',
              },
              {
                author: {
                  name: 'Fulano',
                },
                body: 'Força fulana!',
              },
            ].map((message, idx) => (
              <div className="flex gap-4 font-medium" key={idx}>
                <Avatar
                  name={message.author.name}
                  getInitials={getUserNameInitials}
                />

                <div className="text-sm space-y-2 w-full">
                  <p className="font-semibold">{message.author.name}</p>

                  <p>{message.body}</p>

                  <div className="flex justify-between">
                    <HeartIcon className="text-red-500" />

                    <Button size="sm" color="primary">
                      Responder
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      <aside className="max-w-md w-full sticky top-[80px] h-full space-y-6">
        <Card className="p-12 border border-divider" shadow="none">
          <CardBody className="p-6 font-medium">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold mb-1">R$ 6.934,51</p>
              <p className="text-sm">de R$ 50.000,00</p>

              <Progress value={14} className="mt-3" />

              <p className="text-xs mt-2">14% concluído</p>
            </div>

            <Button className="w-full" color="primary">
              Doar
            </Button>

            <div className="flex items-center gap-2 text-xs text-zinc-600 mt-4">
              <ShieldIcon size={20} />
              <span>Pagamento protegido pela plataforma</span>
            </div>
          </CardBody>
        </Card>

        <Card className="p-12 border border-divider" shadow="none">
          <div className="space-y-4">
            <div className="flex text-sm font-medium gap-3">
              <div className="size-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 shrink-0">
                <ShieldIcon size={24} className="text-white" />
              </div>

              <div>
                <p className="mb-1">Relacionamento</p>
                <p className="text-zinc-700 text-xs">
                  Verificamos a identidade e documentos. É um relacionamento
                  transparente para que você possa confiar.
                </p>
              </div>
            </div>

            <div className="flex text-sm font-medium gap-3">
              <div className="size-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 shrink-0">
                <ZapIcon size={24} className="text-white" />
              </div>

              <div>
                <p className="mb-1">Transparência</p>
                <p className="text-zinc-700 text-xs">
                  Temos registros das ações através de documentos. Fazemos
                  acompanhamento contínuo. Relatórios de transparência.
                </p>
              </div>
            </div>

            <div className="flex text-sm font-medium gap-3">
              <div className="size-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 shrink-0">
                <StarIcon size={24} className="text-white" />
              </div>

              <div>
                <p className="mb-1">Segurança</p>
                <p className="text-zinc-700 text-xs">
                  Nosso site utiliza protocolos seguros, criptografia de dados e
                  certificados de verificação para proteger sua segurança.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </aside>
    </div>
  );
}
