import { formatMoney } from '@/lib/utils/format-money';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';
import { Avatar, Badge, Button, Card } from '@heroui/react';

export function CampaignDonors() {
  return (
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
  );
}
