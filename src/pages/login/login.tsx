import { memo, useEffect } from 'react';
import { Spin } from 'antd';

const Login = memo(() => {
  useEffect(() => {
    window.location.href = `https://${import.meta.env.VITE_AUTH_DOMAIN}/authorize?client_id=${
      import.meta.env.VITE_AUTH_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_APP_BASE_URL
    }/authorizationcode&response_type=code&scope=openid%20profile%20email`;
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Spin spinning={true}></Spin>
    </div>
  );
});

export default Login;
