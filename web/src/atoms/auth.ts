import { atomWithStorage } from 'jotai/utils';

export type User = {
  id: string;
  name: string;
  email: string;
  taxId?: string | null;
  birthDate?: string | null;
  phone?: string | null;
}

export const userAtom = atomWithStorage<User | null>('user', null);
