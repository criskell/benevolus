'use client';

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@heroui/navbar';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
  Button,
} from '@heroui/react';
import {
  UserIcon,
  MessageCircle,
  Wallet,
  CreditCard,
  LogOut,
  ChevronDown,
  Plus,
} from 'lucide-react';
import NextLink from 'next/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { LogoIcon } from '@/components/icons/logo';
import { navbarSearchInput } from './navbar-search-input';
import { useAuth } from '@/hooks/use-auth';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      isBlurred
      height="5rem"
      classNames={{
        wrapper: 'px-6 md:px-8 py-4',
        base: 'bg-background/70 backdrop-blur-md border-b border-divider/50 h-20',
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-3 group"
            href="/"
          >
            <LogoIcon className="text-primary" size={40} />
            <span className="font-bold text-xl">{siteConfig.name}</span>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-6 justify-start ml-4 flex-shrink-0">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  'text-foreground/70 hover:text-primary transition-colors text-base font-medium whitespace-nowrap',
                  'data-[active=true]:text-primary'
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
        <NavbarItem className="hidden lg:flex flex-1 ml-8 min-w-0">
          {navbarSearchInput}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-3 !basis-auto !flex-grow-0">
        <NavbarItem>
          <Button
            as={NextLink}
            href="/campaigns/create"
            color="primary"
            size="lg"
            startContent={<Plus size={20} />}
            className="font-medium"
          >
            Criar campanha
          </Button>
        </NavbarItem>
        {!isAuthenticated ? (
          <NavbarItem>
            <Button
              as={NextLink}
              href="/auth/login"
              variant="light"
              color="primary"
              size="lg"
            >
              Entrar
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="flex items-center gap-2 cursor-pointer outline-none">
                  <ChevronDown size={18} className="text-primary" />
                  <span className="text-primary font-medium text-base">
                    Minha conta
                  </span>
                  <UserIcon size={24} className="text-primary" />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Menu da conta"
                variant="flat"
                className="min-w-[200px]"
              >
                <DropdownItem
                  key="profile"
                  startContent={<UserIcon size={18} />}
                  as={NextLink}
                  href="/profile"
                >
                  Perfil
                </DropdownItem>
                <DropdownItem
                  key="donations"
                  startContent={<MessageCircle size={18} />}
                  as={NextLink}
                  href="/profile/donations"
                >
                  Minhas doações
                </DropdownItem>
                <DropdownItem key="wallet" startContent={<Wallet size={18} />}>
                  Minha carteira
                </DropdownItem>
                <DropdownItem
                  key="cards"
                  startContent={<CreditCard size={18} />}
                  as={NextLink}
                  href="/profile/cards"
                >
                  Cartões
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  startContent={<LogOut size={18} />}
                  className="text-danger"
                  color="danger"
                  onPress={logout}
                >
                  Sair
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {navbarSearchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem>
            <Button
              as={NextLink}
              href="/campaigns/create"
              color="primary"
              fullWidth
              startContent={<Plus size={18} />}
            >
              Criar campanha
            </Button>
          </NavbarMenuItem>
          {!isAuthenticated ? (
            <NavbarMenuItem>
              <Button
                as={NextLink}
                href="/auth/login"
                variant="light"
                color="primary"
                fullWidth
              >
                Entrar
              </Button>
            </NavbarMenuItem>
          ) : (
            <>
              <NavbarMenuItem>
                <Link href="/profile" size="lg" className="w-full">
                  Perfil
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/profile/donations" size="lg" className="w-full">
                  Minhas doações
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/profile/cards" size="lg" className="w-full">
                  Cartões
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <button
                  onClick={logout}
                  className="w-full text-left text-lg text-danger"
                >
                  Sair
                </button>
              </NavbarMenuItem>
            </>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
