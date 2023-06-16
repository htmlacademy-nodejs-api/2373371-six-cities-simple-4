import { User, UserType } from '../../types/user.type.js';
import typegoose, { defaultClasses, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';

const { prop } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, default: '' })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ default: '' })
  public avatar?: string;

  @prop({ required: true, type: () => String, enum: UserType })
  public type!: UserType;

  @prop({ required: true })
  public password!: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.name = userData.name;
    this.avatar = userData.avatar;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
