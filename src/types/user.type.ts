export enum UserType {
  Normal = 'обычный',
  Pro = 'pro',
}

export type User = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: UserType;
}
