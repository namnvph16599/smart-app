export type LoginData = {
  email: string;
  password: string;
};

export type User = {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  sub: string;
  sid: string;
};
export type UserDecode = {
  name: string;
  exp: number;
  user: User;
};

export type GetUserInfo = {
  userId: string;
};

export type Permisson = {
  sub: string;
  roleId: number;
  isDefaultRole: number;
  userName: string;
  roleName: string;
  roleAlias: string;
  assignedStage: number;
  permission: string;
  isAdmin: number;
};
