'use client';

import { Avatar, Badge, Button, Card } from '@heroui/react';
import { HeartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';
import type { CommentResource } from '@/lib/http/generated';

interface CampaignCommentsProps {
  comments: CommentResource[];
}

export const CampaignComments = ({ comments }: CampaignCommentsProps) => {
  const t = useTranslations('campaign.comments');

  return (
    <Card className="p-12 border border-divider" shadow="none">
      <div className="text-lg font-semibold mb-6 flex items-center gap-6">
        {t('title')}
        <Badge content={comments.length}> </Badge>
      </div>

      <div className="space-y-8 flex flex-col">
        {comments.map((comment, idx) => (
          <div className="flex gap-4 font-medium" key={idx}>
            <Avatar
              name={comment.user?.name || 'Anônimo'}
              getInitials={getUserNameInitials}
            />

            <div className="text-sm space-y-2 w-full">
              <p className="font-semibold">{comment.user?.name || 'Anônimo'}</p>

              <p>{comment.content}</p>

              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <HeartIcon className="text-red-500 w-5 h-5" />
                  <span className="text-xs text-default-500">
                    {comment.likes ?? 0}
                  </span>
                </div>

                <Button size="sm" color="primary">
                  {t('reply_button')}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-center text-default-500 py-8">
            Nenhum comentário ainda. Seja o primeiro a comentar!
          </p>
        )}
      </div>
    </Card>
  );
};
