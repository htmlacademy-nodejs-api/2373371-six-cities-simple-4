import { UserType } from '../../../types/user.type.js';

export default class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatar?: string;
  public type!: UserType;
  public password!: string;
}
