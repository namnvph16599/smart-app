import { Spin } from 'antd';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../routers/app-router';

const Home = memo(() => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(AppRoutes.auth.login);
  }, [navigate]);

  return (
    <div
      className="flex
        justify-center
        items-center
        h-screen">
      <Spin spinning={true}></Spin>
    </div>
  );
});

export default Home;
