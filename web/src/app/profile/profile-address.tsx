'use client';

import { useState } from 'react';
import { Button, Card, CardBody, Input } from '@heroui/react';
import { EditIcon, XIcon, CheckIcon } from 'lucide-react';
import { PatternFormat } from 'react-number-format';

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

type ProfileAddressProps = {
  addressData: AddressData;
  onSave: (data: AddressData) => void;
};

export const ProfileAddress = ({
  addressData: initialData,
  onSave,
}: ProfileAddressProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [addressData, setAddressData] = useState(initialData);
  const [backup, setBackup] = useState(initialData);

  const handleStartEdit = () => {
    setBackup({ ...addressData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setAddressData({ ...backup });
    setIsEditing(false);
  };

  const handleSave = () => {
    onSave(addressData);
    setIsEditing(false);
  };

  const renderField = (
    label: string,
    key: keyof AddressData,
    usePattern = false
  ) => {
    if (isEditing) {
      if (usePattern && key === 'zipCode') {
        return (
          <PatternFormat
            format="#####-###"
            mask="_"
            customInput={Input}
            label={label}
            labelPlacement="outside-top"
            value={addressData[key]}
            onValueChange={(values) => {
              setAddressData({ ...addressData, [key]: values.value });
            }}
          />
        );
      }
      return (
        <Input
          label={label}
          labelPlacement="outside-top"
          value={addressData[key]}
          onChange={(e) =>
            setAddressData({ ...addressData, [key]: e.target.value })
          }
        />
      );
    }

    return (
      <>
        <label className="text-sm font-medium text-default-600 block mb-1">
          {label}
        </label>
        <p className="text-default-900">{addressData[key] || '-'}</p>
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
          <div>{renderField('CEP', 'zipCode', true)}</div>
          <div>{renderField('Estado', 'state')}</div>
          <div>{renderField('Cidade', 'city')}</div>
          <div>{renderField('Rua', 'street')}</div>
          <div>{renderField('Número', 'number')}</div>
          <div>{renderField('Bairro', 'neighborhood')}</div>
          <div>{renderField('Complemento', 'complement')}</div>
        </div>
      </CardBody>
    </Card>
  );
};
