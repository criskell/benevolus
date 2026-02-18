'use client';

import { Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

export const CampaignStory = () => {
  const t = useTranslations('campaign.story');
  
  return (
    <Card className="p-6 md:p-8 border border-default-200" shadow="none">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
        <Icon icon="solar:document-text-bold" width={28} className="text-primary" />
        {t('title')}
      </h2>

      <div className="prose prose-default max-w-none">
        <div className="space-y-4 text-default-700 leading-relaxed">
          <p className="text-base md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
            iaculis vitae metus quis dapibus. Fusce nec faucibus sem, vel
            condimentum nulla. Duis tincidunt sed tellus ac lobortis. Curabitur
            eget dolor non tellus dictum dapibus. Fusce porttitor tellus nec
            aliquet malesuada. Morbi vitae cursus enim. Vestibulum placerat dolor
            sit amet dui ullamcorper viverra. Praesent aliquet ut nibh id
            placerat. Donec a sapien in sem volutpat gravida. Aenean ac faucibus
            nunc. Fusce finibus neque libero, eget convallis libero porttitor a.
          </p>

          <p className="text-base md:text-lg">
            Vestibulum non pellentesque erat, nec viverra odio. Nunc neque libero,
            vulputate at vestibulum pulvinar, auctor in arcu. Maecenas aliquam,
            diam ac blandit maximus, elit eros consectetur massa, et finibus urna
            nibh sed leo. Aliquam pulvinar feugiat venenatis. Nulla malesuada
            ligula vel leo dictum lacinia. Duis condimentum, mi varius blandit
            sodales, enim nisi mollis diam, eget finibus lacus odio accumsan sem.
            Nam tincidunt facilisis sapien ut mollis. Nam non gravida sapien, sit
            amet tincidunt sapien. Morbi eget velit ut lacus egestas auctor.
            Mauris in augue in ex tincidunt aliquet. Vestibulum ornare in eros ac
            finibus. Suspendisse eget risus sed libero placerat sollicitudin.
            Mauris vitae aliquet leo. Ut eu nibh lectus.
          </p>

          <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-xl my-6">
            <p className="text-sm md:text-base font-medium text-foreground italic">
              "Esta campanha é crucial para ajudar minha família neste momento difícil. 
              Cada contribuição faz uma diferença enorme em nossas vidas."
            </p>
          </div>

          <p className="text-base md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
            iaculis vitae metus quis dapibus. Fusce nec faucibus sem, vel
            condimentum nulla.
          </p>
        </div>
      </div>
    </Card>
  );
}
