'use client';

import { Button } from '@heroui/react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useContext } from 'react';
import { VisibilityContext, ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

const CATEGORIES = [
  'Todos',
  'Educação',
  'Emergenciais',
  'Empatia',
  'Esporte',
  'Geração de renda',
  'Moradia',
  'Projetos sociais',
];

export const CategoryNavigation = () => {
  return (
    <div className="border-default-100 bg-default-50 px-2 rounded-full relative py-2 gap-2">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {CATEGORIES.map((category) => (
          <Category category={category} key={category} itemId={category} />
        ))}
      </ScrollMenu>
    </div>
  );
};

const Category = ({
  category,
  itemId: _,
}: {
  category: string;
  itemId: string;
}) => {
  return (
    <Button
      variant="light"
      radius="full"
      className="text-default-500 shrink-0 min-w-0"
    >
      {category}
    </Button>
  );
};

const LeftArrow = () => {
  const visibility = useContext(VisibilityContext);
  const isVisible = visibility.useIsVisible('first', true);

  if (isVisible) {
    return;
  }

  return (
    <Button
      isIconOnly
      className="bg-white mr-2"
      variant="light"
      radius="full"
      onPress={() => visibility.scrollPrev()}
    >
      <ChevronLeftIcon size={20} />
    </Button>
  );
};

const RightArrow = () => {
  const visibility = useContext(VisibilityContext);
  const isVisible = visibility.useIsVisible('last', true);

  if (isVisible) {
    return;
  }

  return (
    <Button
      isIconOnly
      className="bg-white ml-2"
      variant="light"
      radius="full"
      onPress={() => visibility.scrollNext()}
    >
      <ChevronRightIcon size={20} />
    </Button>
  );
};
