'use client';

import { useState } from 'react';
import { Button, Card, CardBody, Input } from '@heroui/react';
import { EditIcon, XIcon, CheckIcon } from 'lucide-react';
import { PatternFormat } from 'react-number-format';
import { useGetProfile } from '@/lib/http/generated/hooks/useGetProfile';
import { useUpdateProfile } from '@/lib/http/generated/hooks/useUpdateProfile';
import { useQueryClient } from '@tanstack/react-query';
import { getProfileQueryKey } from '@/lib/http/generated/hooks/useGetProfile';

type FormData = {
  country: string;
  zipcode: string;
  state: string;
  city: string;
  street: string;
  number: string;
};

export const ProfileAddress = () => {
  const { data: profile } = useGetProfile();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<FormData | null>(null);

  const address = profile?.address;

  const currentData: FormData = {
    country: address?.country ?? '',
    zipcode: address?.zipcode ?? '',
    state: address?.state ?? '',
    city: address?.city ?? '',
    street: address?.street ?? '',
    number: address?.number ?? '',
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
        address: {
          country: form.country || undefined,
          zipcode: form.zipcode || undefined,
          state: form.state || undefined,
          city: form.city || undefined,
          street: form.street || undefined,
          number: form.number || undefined,
        },
      },
    });

    queryClient.invalidateQueries({ queryKey: getProfileQueryKey() });
    setForm(null);
    setIsEditing(false);
  };

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    if (form) setForm({ ...form, [key]: value });
  };

  const renderField = (label: string, key: keyof FormData, usePattern = false) => {
    if (isEditing) {
      if (usePattern && key === 'zipcode') {
        return (
          <PatternFormat
            format="#####-###"
            mask="_"
            customInput={Input}
            label={label}
            labelPlacement="outside-top"
            value={data[key]}
            onValueChange={(values) => updateField(key, values.value)}
          />
        );
      }
      return (
        <Input
          label={label}
          labelPlacement="outside-top"
          value={data[key]}
          onChange={(e) => updateField(key, e.target.value)}
        />
      );
    }

    return (
      <>
        <label className="text-sm font-medium text-default-600 block mb-1">
          {label}
        </label>
        <p className="text-default-900">{data[key] || '-'}</p>
      </>
    );
  };

  return (
    <Card className="border border-divider" shadow="none">
      <CardBody className="p-8">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl font-semibold">Endereço</h2>
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
          Sua localização atual cadastrada.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>{renderField('País', 'country')}</div>
          <div>{renderField('CEP', 'zipcode', true)}</div>
          <div>{renderField('Estado', 'state')}</div>
          <div>{renderField('Cidade', 'city')}</div>
          <div>{renderField('Rua', 'street')}</div>
          <div>{renderField('Número', 'number')}</div>
        </div>
      </CardBody>
    </Card>
  );
};
