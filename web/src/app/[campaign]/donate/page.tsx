'use client';

import {
  Alert,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  input,
  Input,
  Switch,
} from '@heroui/react';
import { useId, useState } from 'react';

import placeholder from '@/assets/images/placeholder1.jpg';
import { PixIcon } from '@/components/icons/pix';
import { CampaignAside } from './components/campaign-aside';
import { DonateForm } from './components/donate-form';

export default function CampaignDonatePage() {
  return (
    <div className="max-w-[1280px] mx-auto w-full my-10">
      <Breadcrumbs>
        <BreadcrumbItem>Campanha</BreadcrumbItem>
        <BreadcrumbItem>Doar</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex gap-12 mt-8">
        <DonateForm />
        <CampaignAside />
      </div>
    </div>
  );
}
