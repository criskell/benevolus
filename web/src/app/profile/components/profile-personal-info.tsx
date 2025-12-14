'use client';

import { useId, useState } from 'react';
import { Button, Card, CardBody, Input } from '@heroui/react';
import { EditIcon, XIcon, CheckIcon } from 'lucide-react';
import { PatternFormat } from 'react-number-format';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

type UserData = {
  fullName: string;
  cpf: string;
  birthDate: string;
  email: string;
  phone: string;
};

type ProfilePersonalInfoProps = {
  userData: UserData;
  onSave: (data: UserData) => void | Promise<void>;
};

export const ProfilePersonalInfo = ({
  userData: initialData,
  onSave,
}: ProfilePersonalInfoProps) => {
  const phoneInputId = useId();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialData);
  const [backup, setBackup] = useState(initialData);

  const handleStartEdit = () => {
    setBackup({ ...userData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUserData({ ...backup });
    setIsEditing(false);
  };

  const handleSave = () => {
    onSave(userData);
    setIsEditing(false);
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
                value={userData.fullName}
                onChange={(e) =>
                  setUserData({ ...userData, fullName: e.target.value })
                }
              />
            ) : (
              <>
                <label className="text-sm font-medium text-default-600 block mb-1">
                  Nome
                </label>
                <p className="text-default-900">{userData.fullName}</p>
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
                value={userData.cpf}
                onValueChange={(values) => {
                  setUserData({ ...userData, cpf: values.value });
                }}
              />
            ) : (
              <>
                <label className="text-sm font-medium text-default-600 block mb-1">
                  CPF
                </label>
                <p className="text-default-900">
                  {userData.cpf
                    ? userData.cpf.replace(
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
                value={userData.birthDate}
                onChange={(e) =>
                  setUserData({ ...userData, birthDate: e.target.value })
                }
              />
            ) : (
              <>
                <label className="text-sm font-medium text-default-600 block mb-1">
                  Data de nascimento
                </label>
                <p className="text-default-900">{userData.birthDate || '-'}</p>
              </>
            )}
          </div>

          <div>
            {isEditing ? (
              <Input
                type="email"
                label="E-mail"
                labelPlacement="outside-top"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            ) : (
              <>
                <label className="text-sm font-medium text-default-600 block mb-1">
                  E-mail
                </label>
                <p className="text-default-900">{userData.email}</p>
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
                  value={userData.phone}
                  onChange={(value) =>
                    setUserData({ ...userData, phone: value || '' })
                  }
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
                  <p className="text-default-900">{userData.phone}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
