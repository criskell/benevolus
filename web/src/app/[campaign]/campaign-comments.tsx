'use client';

import { useState } from 'react';
import { Avatar, Badge, Button, Card } from '@heroui/react';
import { HeartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';
import { useToggleCommentReaction } from '@/lib/http/generated';
import type { CommentResource } from '@/lib/http/generated';

interface CampaignCommentsProps {
  comments: CommentResource[];
}

export const CampaignComments = ({ comments }: CampaignCommentsProps) => {
  const t = useTranslations('campaign.comments');
  const [localComments, setLocalComments] = useState(comments);
  const { mutate: toggleReaction } = useToggleCommentReaction();

  const handleToggleReaction = (commentId: number) => {
    setLocalComments((prev) =>
      prev.map((c) => {
        if (c.id !== commentId) return c;
        const wasReacted = c.userHasReacted;
        return {
          ...c,
          userHasReacted: !wasReacted,
          likes: (c.likes ?? 0) + (wasReacted ? -1 : 1),
        };
      }),
    );

    toggleReaction(
      { comment: commentId },
      {
        onError: () => {
          setLocalComments((prev) =>
            prev.map((c) => {
              if (c.id !== commentId) return c;
              const wasReacted = c.userHasReacted;
              return {
                ...c,
                userHasReacted: !wasReacted,
                likes: (c.likes ?? 0) + (wasReacted ? -1 : 1),
              };
            }),
          );
        },
      },
    );
  };

  return (
    <Card className="p-12 border border-divider" shadow="none">
      <div className="text-lg font-semibold mb-6 flex items-center gap-6">
        {t('title')}
        <Badge content={localComments.length}> </Badge>
      </div>

      <div className="space-y-8 flex flex-col">
        {localComments.map((comment, idx) => (
          <div className="flex gap-4 font-medium" key={idx}>
            <Avatar
              name={comment.user?.name || 'Anônimo'}
              getInitials={getUserNameInitials}
            />

            <div className="text-sm space-y-2 w-full">
              <p className="font-semibold">{comment.user?.name || 'Anônimo'}</p>

              <p>{comment.content}</p>

              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => handleToggleReaction(comment.id!)}
                    aria-label={t('like_button')}
                  >
                    <HeartIcon
                      className={`w-5 h-5 ${
                        comment.userHasReacted
                          ? 'fill-red-500 text-red-500'
                          : 'text-red-500'
                      }`}
                    />
                  </Button>
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

        {localComments.length === 0 && (
          <p className="text-center text-default-500 py-8">
            {t('empty_message')}
          </p>
        )}
      </div>
    </Card>
  );
};
