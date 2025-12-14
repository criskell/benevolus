import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { PatternFormat } from 'react-number-format';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  input,
  Input,
  Switch,
} from '@heroui/react';
import { useId, useState } from 'react';
import { PixIcon } from '@/components/icons/pix';

export function DonateForm() {
  const phoneInputId = useId();

  const [phone, setPhone] = useState<any>();
  const [country, setCountry] = useState<any>();

  return (
    <div className="space-y-8 grow">
      <h1 className="text-3xl font-semibold">
        Vamos contribuir com a campanha
      </h1>

      <Card className="p-12 border border-divider" shadow="none">
        <p className="text-sm font-medium mb-1">Valor da contribuição</p>

        <Input
          type="number"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          className="mb-1"
        />

        <div className="flex gap-2 mt-2 font-medium">
          <Button
            variant="bordered"
            className="border-default-100"
            radius="full"
          >
            R$ 10,00
          </Button>
          <Button
            variant="bordered"
            className="border-default-100"
            radius="full"
          >
            R$ 30,00
          </Button>
          <Button
            variant="bordered"
            className="border-default-100"
            radius="full"
          >
            R$ 100,00
          </Button>
          <Button
            variant="bordered"
            className="border-default-100"
            radius="full"
          >
            R$ 200,00
          </Button>
        </div>
      </Card>

      <Card className="p-12 border border-divider space-y-6" shadow="none">
        <p className="text-lg font-semibold">Dados pessoais</p>

        <div className="flex flex-col gap-4">
          <Input label="Nome" labelPlacement="outside-top" />
          <Input label="E-mail" labelPlacement="outside-top" />

          <PatternFormat
            format="###.###.###-##"
            mask="_"
            customInput={Input}
            label="CPF"
            labelPlacement="outside-top"
          />

          <div>
            <label
              className={input({
                labelPlacement: 'outside-top',
              }).label()}
              htmlFor={phoneInputId}
            >
              Telefone
            </label>

            <PhoneInput
              onChange={(phone) => setPhone(phone)}
              value={phone}
              countryCallingCodeEditable={false}
              inputComponent={Input}
              defaultCountry="BR"
              id={phoneInputId}
              international
            />
          </div>

          <Checkbox>
            Sou estrangeiro / Sou brasileiro, mas moro fora do Brasil
          </Checkbox>
        </div>

        <Alert
          hideIcon
          classNames={{
            mainWrapper: 'flex-row justify-between items-center',
          }}
          className="text-sm font-medium"
        >
          Fazer doação anônima?
          <Switch />
        </Alert>
      </Card>

      <Card className="p-12 border border-divider space-y-6" shadow="none">
        <p className="text-lg font-semibold">Pagamento</p>
        <p className="text-sm font-medium text-zinc-700 mb-4">
          Formas de pagamento
        </p>
        <div className="grid grid-cols-4 gap-3">
          <button className="flex flex-col items-center p-4 rounded-lg border-2 transition-colors border-blue-500 bg-blue-50">
            <PixIcon width={24} height={24} />
            <span className="text-sm font-medium text-gray-900">Pix</span>
          </button>
        </div>
      </Card>

      <Card className="p-12 border border-divider space-y-6" shadow="none">
        <div className="flex items-center gap-4 flex-wrap">
          <Button color="primary" className="max-w-40 w-full">
            Contribuir
          </Button>
          <span className="text-neutral-500 font-medium text-sm">
            Ao realizar o pagamento, você concorda com nossos termos e
            condições.
          </span>
        </div>
      </Card>
    </div>
  );
}
