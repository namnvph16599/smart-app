import { Spin } from 'antd';
import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts';

const Code = memo(() => {
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const authorizationCode = location.search.slice(6);
    if (authorizationCode) {
      axios
        .post(`https://${import.meta.env.VITE_AUTH_DOMAIN}/oauth/token`, {
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
          client_secret: import.meta.env.VITE_AUTH_CLIENT_SECRET,
          code: authorizationCode,
          redirect_uri: `${import.meta.env.VITE_APP_BASE_URL}/authorizationcode`,
        })
        .then((res: any) => {
          if (res?.data) {
            login(res?.data?.id_token, res?.data?.access_token);
          }
        })
        .catch((error: any) => {
          console.log('Login failed', error);
          // showNotification('error', 'Login failed', error?.message);
        });
    }
  }, [location, login]);

  return <Spin spinning={true} className="flex justify-center items-center h-screen"></Spin>;
});

export default Code;
