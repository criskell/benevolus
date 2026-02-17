'use client';

import { useState } from 'react';
import { ProfileSidebar } from './components/profile-sidebar';
import { ProfilePersonalInfo } from './components/profile-personal-info';
import { ProfileAddress } from './components/profile-address';

type UserData = {
  name: string;
  fullName: string;
  email: string;
  cpf: string;
  birthDate: string;
  phone: string;
  followedCampaigns: number;
  donationsCount: number;
};

type AddressData = {
  country: string;
  zipCode: string;
  state: string;
  city: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
};

const ProfilePage = () => {
  // Dados mockados - serão substituídos por dados reais da API
  const [userData, setUserData] = useState<UserData>({
    name: 'Cristiano',
    fullName: 'Cristiano M Santos',
    email: 'cris.moraes.ds@gmail.com',
    cpf: '00000000000',
    birthDate: '',
    phone: '+5511973591090',
    followedCampaigns: 0,
    donationsCount: 3,
  });

  const [addressData, setAddressData] = useState<AddressData>({
    country: 'Brasil',
    zipCode: '',
    state: '',
    city: '',
    street: '',
    number: '',
    neighborhood: '',
    complement: '',
  });

  const menuItems = [
    { label: 'Informações pessoais', active: true },
    { label: 'Comunicação', active: false },
    { label: 'Configurações', active: false },
  ];

  const handleSavePersonalInfo = (data: {
    fullName: string;
    cpf: string;
    birthDate: string;
    email: string;
    phone: string;
  }) => {
    // Aqui seria feita a chamada à API
    setUserData({ ...userData, ...data });
  };

  const handleSaveAddress = (data: AddressData) => {
    // Aqui seria feita a chamada à API
    setAddressData(data);
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar
          userName={userData.name}
          followedCampaigns={userData.followedCampaigns}
          donationsCount={userData.donationsCount}
          menuItems={menuItems}
        />

        <main className="flex-1 space-y-8">
          <ProfilePersonalInfo
            userData={{
              fullName: userData.fullName,
              cpf: userData.cpf,
              birthDate: userData.birthDate,
              email: userData.email,
              phone: userData.phone,
            }}
            onSave={handleSavePersonalInfo}
          />

          <ProfileAddress
            addressData={addressData}
            onSave={handleSaveAddress}
          />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
