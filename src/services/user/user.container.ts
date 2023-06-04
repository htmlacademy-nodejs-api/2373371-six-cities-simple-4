import { Container } from 'inversify';
import {UserServiceInterface} from './user-service.interface';
import {Service} from '../../types/service.js';
import UserService from './user.service.js';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './user.entity.js';

export function createUserContainer() {
  const userContainer = new Container({ defaultScope: 'Singleton' });

  userContainer.bind<UserServiceInterface>(Service.UserService).to(UserService);
  userContainer.bind<types.ModelType<UserEntity>>(Service.UserModel).toConstantValue(UserModel);

  return userContainer;
}
