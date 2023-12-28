import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants';
import { Permisson, User } from '../types/auth';
import { jwtDecode } from 'jwt-decode';
import { useDiaLog } from '.';

type ContextProps = {
  isLoggedIn: boolean;
  user?: User;
  permisson?: Permisson;
  permissons?: Permisson[] | [];
  logout: () => Promise<void>;
  login: (token: string, id_user: string) => Promise<void> | void;
  loading?: boolean;
  setPermisson?: (newP: Permisson) => void;
};

const AuthContext = createContext<ContextProps>({
  isLoggedIn: false,
  login() {
    throw new Error('not-ready');
  },
  logout() {
    throw new Error('not-ready');
  },
});

export const useAuth = () => useContext(AuthContext);

type Props = PropsWithChildren;

export const AuthProvider = ({ children }: Props) => {
  const { showDialog } = useDiaLog();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>();

  const [loading, setLoading] = useState(false);

  const logout = useCallback(async () => {
    localStorage.clear();
    window.location.href = `https://${import.meta.env.VITE_AUTH_DOMAIN}/v2/logout?returnTo=${
      import.meta.env.VITE_APP_BASE_URL
    }/login&client_id=${import.meta.env.VITE_AUTH_CLIENT_ID}`;
  }, []);

  const handleReLogin = useCallback(
    (content?: string) => {
      setLoading(true);
      showDialog({
        title: '',
        hiddenCancel: true,
        content: content || 'Your account is not validly set up, please contact Sample admin for further assistance.',
        okTextSubmit: 'Login',
        onOk: () => {
          logout();
          setLoading(false);
        },
      });
    },
    [logout, showDialog],
  );

  const handleGetSubHeader = useCallback(
    (accessToken: string, idToken: string) => {
      if (!accessToken || !idToken) {
        setIsLoggedIn(false);
        return;
      }
      const userInfo: User = jwtDecode(idToken);

      if (userInfo?.sub) {
        const expired = checkTokenExp(userInfo);
        if (expired) {
          logout();
          return;
        }

        const sub = userInfo?.sub;
        if (sub) {
          localStorage.setItem(STORAGE_KEYS.sub, sub);
          localStorage.setItem(STORAGE_KEYS.name, userInfo?.name);
          localStorage.setItem(STORAGE_KEYS.mail, userInfo?.email);
          setIsLoggedIn(true);
          setUser(userInfo);
        }
      } else {
        handleReLogin();
      }
    },
    [handleReLogin, logout],
  );

  const login = useCallback(
    (id_token: string, access_token: string) => {
      if (id_token) {
        handleGetSubHeader(id_token, id_token);
        localStorage.setItem(STORAGE_KEYS.accessToken, access_token);
        localStorage.setItem(STORAGE_KEYS.idToken, id_token);
        setIsLoggedIn(true);
      }
    },
    [handleGetSubHeader],
  );

  const checkTokenExp = (userInfo: User) => {
    if (userInfo.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(STORAGE_KEYS.accessToken);
    const idToken = localStorage.getItem(STORAGE_KEYS.idToken);
    if (accessToken && idToken) {
      handleGetSubHeader(accessToken, idToken);
    }
  }, [handleGetSubHeader]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
