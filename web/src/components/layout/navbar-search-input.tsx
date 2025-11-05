import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";

import { SearchIcon } from "@/components/icons/search";

export const navbarSearchInput = (
  <Input
    aria-label="Pesquisar campanhas..."
    classNames={{
      inputWrapper: "bg-default-100",
      input: "text-sm",
    }}
    endContent={
      <Kbd className="hidden lg:inline-block" keys={["command"]}>
        K
      </Kbd>
    }
    labelPlacement="outside"
    placeholder="Pesquisar campanhas..."
    startContent={
      <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
    }
    type="search"
  />
);
