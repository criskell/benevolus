"use client";

import { Badge, Button, Card } from "@heroui/react";
import { BookmarkIcon } from "lucide-react";

import type { Campaign } from "@/models/campaign";
import { formatMoney } from "@/lib/format-money";

export type CampaignCardProps = {
  campaign: Campaign;
};

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const { images, title, category, daysRemaining, currentAmount, progress } =
    campaign;
  const formattedAmount = formatMoney(currentAmount);

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 flex">
        <div className="w-1/2 h-full overflow-hidden">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/2 h-full overflow-hidden">
          <img
            src={images[1]}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <Button
          isIconOnly
          variant="light"
          radius="full"
          className="absolute top-2 left-2 bg-white/90 shadow-sm"
        >
          <BookmarkIcon size={16} />
        </Button>
      </div>

      <div className="p-4 flex flex-col h-full">
        <Badge variant="flat" className="mb-2">
          {category}
        </Badge>
        <h3 className="text-md font-medium mb-3 truncate">{title}</h3>

        <div className="flex justify-between text-xs text-default-500 mb-1 mt-auto">
          <span>{daysRemaining} dias restantes</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full h-1 bg-default-100 rounded-full mb-3">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-xl font-semibold text-primary">
            R$ {formattedAmount}
          </div>
          <div className="text-xs text-default-500">
            Meta de R$ {formattedAmount}
          </div>
        </div>
      </div>
    </Card>
  );
};
