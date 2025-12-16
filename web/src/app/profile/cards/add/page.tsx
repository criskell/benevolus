'use client';

import { useState } from 'react';
import { Button, Card, CardBody, Input, Select, SelectItem } from '@heroui/react';
import { X, ArrowLeft } from 'lucide-react';
import { PatternFormat } from 'react-number-format';
import NextLink from 'next/link';
import { ProfileSidebar } from '../../components/profile-sidebar';

export default function AddCardPage() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    securityCode: '',
    zipCode: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    complement: '',
  });

  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
  };

  const menuItems = [
    { label: 'Informações pessoais', active: false },
    { label: 'Comunicação', active: false },
    { label: 'Configurações', active: false },
  ];

  const estados = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins',
  ];

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

        <main className="flex-1">
          <Card className="border border-divider" shadow="none">
            <CardBody className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Button
                    variant="light"
                    isIconOnly
                    as={NextLink}
                    href="/profile/cards"
                  >
                    <ArrowLeft size={20} />
                  </Button>
                  <h1 className="text-2xl font-semibold">Novo cartão</h1>
                </div>
                <Button
                  isIconOnly
                  variant="light"
                  radius="full"
                  as={NextLink}
                  href="/profile/cards"
                >
                  <X size={20} />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">Dados do cartão</h2>

                  <div>
                    <PatternFormat
                      format="#### #### #### ####"
                      mask="_"
                      customInput={Input}
                      label="Número do cartão"
                      labelPlacement="outside-top"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onValueChange={(values) => updateField('cardNumber', values.value)}
                    />
                  </div>

                  <div>
                    <Input
                      label="Nome do titular"
                      labelPlacement="outside-top"
                      value={formData.cardholderName}
                      onChange={(e) => updateField('cardholderName', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <PatternFormat
                        format="##/##"
                        mask="_"
                        customInput={Input}
                        label="Data de validade"
                        labelPlacement="outside-top"
                        placeholder="MM/AA"
                        value={formData.expiryDate}
                        onValueChange={(values) => updateField('expiryDate', values.value)}
                      />
                    </div>

                    <div>
                      <Input
                        type="number"
                        label="Código de segurança"
                        labelPlacement="outside-top"
                        placeholder="CVV"
                        maxLength={4}
                        value={formData.securityCode}
                        onChange={(e) => updateField('securityCode', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">
                    Endereço de cobrança
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <PatternFormat
                        format="#####-###"
                        mask="_"
                        customInput={Input}
                        label="CEP"
                        labelPlacement="outside-top"
                        value={formData.zipCode}
                        onValueChange={(values) => updateField('zipCode', values.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-default-600 block mb-1">
                        Estado
                      </label>
                      <Select
                        placeholder="Selecione o estado"
                        selectedKeys={
                          formData.state ? [formData.state] : []
                        }
                        onSelectionChange={(keys) => {
                          const value = Array.from(keys)[0] as string;
                          updateField('state', value || '');
                        }}
                      >
                        {estados.map((estado) => (
                          <SelectItem key={estado} value={estado}>
                            {estado}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-default-600 block mb-1">
                        Cidade
                      </label>
                      <Select
                        placeholder="Selecione a cidade"
                        selectedKeys={formData.city ? [formData.city] : []}
                        onSelectionChange={(keys) => {
                          const value = Array.from(keys)[0] as string;
                          updateField('city', value || '');
                        }}
                      >
                        <SelectItem key="sao-jose-dos-campos" value="sao-jose-dos-campos">
                          São José dos Campos
                        </SelectItem>
                      </Select>
                    </div>

                    <div>
                      <Input
                        label="Bairro"
                        labelPlacement="outside-top"
                        value={formData.neighborhood}
                        onChange={(e) => updateField('neighborhood', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Input
                      label="Rua"
                      labelPlacement="outside-top"
                      value={formData.street}
                      onChange={(e) => updateField('street', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        label="Número"
                        labelPlacement="outside-top"
                        value={formData.number}
                        onChange={(e) => updateField('number', e.target.value)}
                      />
                    </div>

                    <div>
                      <Input
                        label="Complemento"
                        labelPlacement="outside-top"
                        value={formData.complement}
                        onChange={(e) => updateField('complement', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    variant="light"
                    as={NextLink}
                    href="/profile/cards"
                    className="text-default-600"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" color="primary">
                    Salvar
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </main>
      </div>
    </div>
  );
}
