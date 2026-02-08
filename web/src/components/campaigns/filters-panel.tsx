import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  CheckboxGroup,
  Checkbox,
  Input,
  Button,
  Chip,
} from '@heroui/react';
import { useTranslations } from 'next-intl';
import { SearchIcon } from '../icons/search'; // Assuming search icon exists
import { filters } from '../../data/filters';

type FiltersPanelProps = {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
};

export const FiltersPanel = ({
  selectedCategories,
  setSelectedCategories,
  selectedTags,
  setSelectedTags,
  onApplyFilters,
  onClearFilters,
}: FiltersPanelProps) => {
  const t = useTranslations('campaigns.list.filters');
  const [tagSearch, setTagSearch] = useState('');

  const filteredTags = filters.tags.filter((tag) =>
    tag.toLowerCase().includes(tagSearch.toLowerCase())
  );

  return (
    <div className="p-4 sticky top-[4em]">
      <h2 className="text-lg font-semibold mb-4">{t('title')}</h2>
      <Accordion>
        <AccordionItem
          key="categories"
          aria-label={t('category_title')}
          title={t('category_title')}
        >
          <CheckboxGroup
            value={selectedCategories}
            onValueChange={setSelectedCategories}
          >
            {filters.categories.map((category) => (
              <Checkbox key={category} value={category}>
                {category}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </AccordionItem>
        <AccordionItem key="tags" aria-label={t('tags_title')} title={t('tags_title')}>
          <Input
            placeholder={t('tags_search')}
            startContent={<SearchIcon />}
            value={tagSearch}
            onValueChange={setTagSearch}
            className="mb-4"
          />
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {filteredTags.map((tag) => (
              <Chip
                key={tag}
                variant={selectedTags.includes(tag) ? 'solid' : 'bordered'}
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    setSelectedTags(selectedTags.filter((t) => t !== tag));
                  } else {
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}
                className="cursor-pointer"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
      <div className="mt-4 space-y-2">
        <Button onPress={onClearFilters} variant="light" fullWidth>
          {t('clear_button')}
        </Button>
        <Button onPress={onApplyFilters} color="primary" fullWidth>
          {t('apply_button')}
        </Button>
      </div>
    </div>
  );
};
