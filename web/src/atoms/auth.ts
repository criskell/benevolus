import { atomWithStorage } from 'jotai/utils';

export type User = {
  id: string;
  name: string;
  email: string;
}

export const userAtom = atomWithStorage<User | null>('user', null);
