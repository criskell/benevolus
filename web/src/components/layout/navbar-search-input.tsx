import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";

import { SearchIcon } from "@/components/icons/search";

export const navbarSearchInput = (
  <Input
    aria-label="Pesquisar campanhas..."
    classNames={{
      base: "w-full",
      inputWrapper: "bg-default-100 h-12",
      input: "text-base",
    }}
    endContent={
      <Kbd className="hidden lg:inline-block" keys={["command"]}>
        K
      </Kbd>
    }
    labelPlacement="outside"
    placeholder="Pesquisar campanhas..."
    size="lg"
    startContent={
      <SearchIcon className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
    }
    type="search"
  />
);
