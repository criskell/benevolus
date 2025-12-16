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

import { link as linkStyles } from '@heroui/theme';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link } from '@heroui/react';
import { UserIcon, MessageCircle, Wallet, CreditCard, LogOut, ChevronDown } from 'lucide-react';
import NextLink from 'next/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { LogoIcon } from '@/components/icons/logo';
import { navbarSearchInput } from './navbar-search-input';

export const Navbar = () => {
  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      classNames={{
        wrapper: 'px-0',
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <LogoIcon />
            <p className="font-bold text-inherit">{siteConfig.name}</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">{navbarSearchInput}</NavbarItem>
        <NavbarItem><Link href="/auth/login">Login</Link></NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button className="flex items-center gap-2 cursor-pointer outline-none">
                <ChevronDown size={16} className="text-primary" />
                <span className="text-primary font-medium">Minha conta</span>
                <UserIcon size={20} className="text-primary" />
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
              <DropdownItem
                key="wallet"
                startContent={<Wallet size={18} />}
              >
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
              >
                Sair
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {navbarSearchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                    ? 'danger'
                    : 'foreground'
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
