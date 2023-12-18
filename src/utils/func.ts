import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
export const showNotification = (type: NotificationType = 'info', message = '', description = '') => {
  notification[type]({
    message,
    description,
  });
};
