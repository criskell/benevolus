import { useAtom } from 'jotai';
import { useRouter } from 'nextjs-toploader/app';
import { userAtom, User } from '@/atoms/auth';

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    router.push('/');
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };
}
