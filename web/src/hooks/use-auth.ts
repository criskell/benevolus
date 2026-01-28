import { useAtom } from 'jotai';
import { userAtom, User } from '@/atoms/auth';

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };
}
