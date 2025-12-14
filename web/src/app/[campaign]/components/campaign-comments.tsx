import { Avatar, Badge, Button, Card } from '@heroui/react';
import { HeartIcon } from 'lucide-react';

import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';

export function CampaignComments() {
  return (
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
  );
}
