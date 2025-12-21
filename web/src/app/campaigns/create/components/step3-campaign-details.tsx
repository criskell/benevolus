'use client';

import { RadioGroup, Radio, Select, SelectItem } from '@heroui/react';

interface Step3CampaignDetailsProps {
  beneficiaryType: string;
  category: string;
  onBeneficiaryTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const beneficiaryOptions = [
  { value: 'myself', label: 'Eu mesmo(a) preciso do valor' },
  { value: 'pet', label: 'Para meu animal de estimação' },
  { value: 'family', label: 'Para alguém da família' },
  { value: 'friend', label: 'Para um(a) amigo(a) que está precisando' },
  { value: 'company', label: 'Para uma empresa ou instituição' },
];

const categories = [
  'Animais / Pets',
  'Educação',
  'Emergenciais',
  'Empatia',
  'Esporte',
  'Geração de renda',
  'Moradia',
  'Projetos sociais',
  'Recorrente',
  'Saúde',
];

export function Step3CampaignDetails({
  beneficiaryType,
  category,
  onBeneficiaryTypeChange,
  onCategoryChange,
}: Step3CampaignDetailsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Essa vaquinha é para ajudar <span className="text-primary">quem?</span>
        </h2>
        <RadioGroup
          value={beneficiaryType}
          onValueChange={onBeneficiaryTypeChange}
          className="space-y-3"
        >
          {beneficiaryOptions.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              classNames={{
                base: 'max-w-full',
                wrapper: 'border-2 border-primary',
              }}
            >
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Em qual <span className="text-primary">categoria</span> sua vaquinha se enquadra?
        </h2>
        <Select
          label="Selecione uma categoria"
          placeholder="Selecione uma categoria"
          selectedKeys={category ? [category] : []}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            onCategoryChange(selected || '');
          }}
          className="w-full"
          size="lg"
        >
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

