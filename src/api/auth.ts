import { instance } from './instance';

export const getPermissonUser = (sub: string) => {
  return instance.get(`users/permission?sub=${sub}`);
};
