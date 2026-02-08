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
  Bell,
} from 'lucide-react';
import NextLink from 'next/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { LogoIcon } from '@/components/icons/logo';
import { NavbarSearchInput } from './navbar-search-input';
import { useAuth } from '@/hooks/use-auth';
import { LanguageSwitcher } from './language-switcher';
import { useTranslations } from 'next-intl';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const t = useTranslations();

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
                {t(item.labelKey)}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
        <NavbarItem className="hidden lg:flex flex-1 ml-8 min-w-0">
          <NavbarSearchInput />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-3 !basis-auto !flex-grow-0">
        <NavbarItem>
          <LanguageSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Button
            as={NextLink}
            href="/campaigns/create"
            color="primary"
            size="lg"
            startContent={<Plus size={20} />}
            className="font-medium"
          >
            {t('navbar.create_campaign')}
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
              {t('navbar.sign_in')}
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="flex items-center gap-2 cursor-pointer outline-none">
                  <ChevronDown size={18} className="text-primary" />
                  <span className="text-primary font-medium text-base">
                    {t('navbar.my_account')}
                  </span>
                  <UserIcon size={24} className="text-primary" />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label={t('navbar.account_menu')}
                variant="flat"
                className="min-w-[200px]"
              >
                <DropdownItem
                  key="profile"
                  startContent={<UserIcon size={18} />}
                  as={NextLink}
                  href="/profile"
                >
                  {t('navbar.profile')}
                </DropdownItem>
                <DropdownItem
                  key="donations"
                  startContent={<MessageCircle size={18} />}
                  as={NextLink}
                  href="/profile/donations"
                >
                  {t('navbar.my_donations')}
                </DropdownItem>
                <DropdownItem key="wallet" startContent={<Wallet size={18} />}>
                  {t('navbar.my_wallet')}
                </DropdownItem>
                <DropdownItem
                  key="cards"
                  startContent={<CreditCard size={18} />}
                  as={NextLink}
                  href="/profile/cards"
                >
                  {t('navbar.cards')}
                </DropdownItem>
                <DropdownItem
                  key="notifications"
                  startContent={<Bell size={18} />}
                  as={NextLink}
                  href="/profile/notifications"
                >
                  {t('navbar.notifications')}
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  startContent={<LogOut size={18} />}
                  className="text-danger"
                  color="danger"
                  onPress={logout}
                >
                  {t('navbar.logout')}
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
        <NavbarSearchInput />
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem className="flex justify-center py-2">
            <LanguageSwitcher />
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button
              as={NextLink}
              href="/campaigns/create"
              color="primary"
              fullWidth
              startContent={<Plus size={18} />}
            >
              {t('navbar.create_campaign')}
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
                {t('navbar.sign_in')}
              </Button>
            </NavbarMenuItem>
          ) : (
            <>
              <NavbarMenuItem>
                <Link href="/profile" size="lg" className="w-full">
                  {t('navbar.profile')}
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/profile/donations" size="lg" className="w-full">
                  {t('navbar.my_donations')}
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/profile/cards" size="lg" className="w-full">
                  {t('navbar.cards')}
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/profile/notifications" size="lg" className="w-full">
                  {t('navbar.notifications')}
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <button
                  onClick={logout}
                  className="w-full text-left text-lg text-danger"
                >
                  {t('navbar.logout')}
                </button>
              </NavbarMenuItem>
            </>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
