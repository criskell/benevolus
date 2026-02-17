"use client";

import { Button } from "@heroui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useContext } from "react";
import { VisibilityContext, ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

type CategoryNavigationProps = {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const CategoryNavigation = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryNavigationProps) => {
  return (
    <div className="border-default-100 bg-default-50 px-2 rounded-full relative py-2 gap-2">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {categories.map((category) => (
          <Category
            category={category}
            key={category}
            itemId={category}
            isSelected={category === selectedCategory}
            onSelect={onCategorySelect}
          />
        ))}
      </ScrollMenu>
    </div>
  );
};

const Category = ({
  category,
  itemId: _,
  isSelected,
  onSelect,
}: {
  category: string;
  itemId: string;
  isSelected: boolean;
  onSelect: (category: string) => void;
}) => {
  return (
    <Button
      variant={isSelected ? "solid" : "light"}
      radius="full"
      className={`text-default-500 shrink-0 min-w-0 ${isSelected ? 'bg-primary text-white' : ''}`}
      onPress={() => onSelect(category)}
    >
      {category}
    </Button>
  );
};

const LeftArrow = () => {
  const visibility = useContext(VisibilityContext);
  const isVisible = visibility.useIsVisible("first", true);

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
  const isVisible = visibility.useIsVisible("last", true);

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
