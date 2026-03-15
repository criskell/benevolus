'use client';

import { useId, useState } from 'react';
import { Button, Card, CardBody, Input } from '@heroui/react';
import { EditIcon, XIcon, CheckIcon } from 'lucide-react';
import { PatternFormat } from 'react-number-format';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useGetProfile } from '@/lib/http/generated/hooks/useGetProfile';
import { useUpdateProfile } from '@/lib/http/generated/hooks/useUpdateProfile';
import { useQueryClient } from '@tanstack/react-query';
import { getProfileQueryKey } from '@/lib/http/generated/hooks/useGetProfile';

type FormData = {
  name: string;
  taxId: string;
  birthDate: string;
  email: string;
  phone: string;
};

export const ProfilePersonalInfo = () => {
  const { data: profile } = useGetProfile();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const queryClient = useQueryClient();
  const phoneInputId = useId();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<FormData | null>(null);

  const currentData: FormData = {
    name: profile?.name ?? '',
    taxId: profile?.taxId ?? '',
    birthDate: profile?.birthDate ?? '',
    email: profile?.email ?? '',
    phone: profile?.phone ?? '',
  };

  const data = isEditing && form ? form : currentData;

  const handleStartEdit = () => {
    setForm({ ...currentData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!form) return;

    await updateProfile({
      data: {
        name: form.name,
        taxId: form.taxId || undefined,
        birthDate: form.birthDate || undefined,
        email: form.email,
        phone: form.phone || undefined,
      },
    });

    queryClient.invalidateQueries({ queryKey: getProfileQueryKey() });
    setForm(null);
    setIsEditing(false);
  };

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    if (form) setForm({ ...form, [key]: value });
  };

  return (
    <Card className="border border-divider" shadow="none">
      <CardBody className="p-8">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl font-semibold">Minhas Informações</h2>
          {!isEditing ? (
            <Button
              variant="light"
              size="sm"
              radius="full"
              onPress={handleStartEdit}
              startContent={<EditIcon size={18} />}
            >
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="light"
                size="sm"
                radius="full"
                onPress={handleSave}
                className="text-success"
                startContent={<CheckIcon size={18} />}
              >
                Salvar
              </Button>
              <Button
                variant="light"
                size="sm"
                radius="full"
                onPress={handleCancel}
                className="text-danger"
                startContent={<XIcon size={18} />}
              >
                Cancelar
              </Button>
            </div>
          )}
        </div>
        <p className="text-sm text-default-500 mb-6">
          Dados pessoais cadastrados.
        </p>

        <div className="space-y-4">
          <div>
            {isEditing ? (
              <Input
                label="Nome"
                labelPlacement="outside-top"
                value={data.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
            ) : (
              <>
                <label className="text-sm font-medium text-default-600 block mb-1">
                  Nome
                </label>
                <p className="text-default-900">{data.name}</p>
              </>
            )}
          </div>

          <div>
            {isEditing ? (
              <PatternFormat
                format="###.###.###-##"
                mask="_"
                customInput={Input}
                label="CPF"
                labelPlacement="outside-top"
                value={data.taxId}
                onValueChange={(values) => updateField('taxId', values.value)}
              />
            ) : (
              <>
                <label className="text-sm font-medium text-default-600 block mb-1">
                  CPF
                </label>
                <p className="text-default-900">
                  {data.taxId
                    ? data.taxId.replace(
                        /(\d{3})(\d{3})(\d{3})(\d{2})/,
                        '$1.$2.$3-$4'
                      )
                    : '-'}
                </p>
              </>
            )}
          </div>

          <div>
            {isEditing ? (
              <Input
                type="date"
                label="Data de nascimento"
                labelPlacement="outside-top"
                value={data.birthDate}
                onChange={(e) => updateField('birthDate', e.target.value)}
              />
            ) : (
              <>
                <label className="text-sm font-medium text-default-600 block mb-1">
                  Data de nascimento
                </label>
                <p className="text-default-900">{data.birthDate || '-'}</p>
              </>
            )}
          </div>

          <div>
            {isEditing ? (
              <Input
                type="email"
                label="E-mail"
                labelPlacement="outside-top"
                value={data.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
            ) : (
              <>
                <label className="text-sm font-medium text-default-600 block mb-1">
                  E-mail
                </label>
                <p className="text-default-900">{data.email}</p>
              </>
            )}
          </div>

          <div>
            {isEditing ? (
              <div>
                <label
                  className="text-sm font-medium text-default-600 block mb-1"
                  htmlFor={phoneInputId}
                >
                  Telefone
                </label>
                <PhoneInput
                  id={phoneInputId}
                  value={data.phone}
                  onChange={(value) => updateField('phone', value || '')}
                  defaultCountry="BR"
                  international
                  countryCallingCodeEditable={false}
                  inputComponent={Input}
                />
              </div>
            ) : (
              <>
                <label className="text-sm font-medium text-default-600 block mb-1">
                  Telefone
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇧🇷</span>
                  <p className="text-default-900">{data.phone}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
