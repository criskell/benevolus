import { atomWithStorage } from 'jotai/utils';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const userAtom = atomWithStorage<User | null>('user', null);
