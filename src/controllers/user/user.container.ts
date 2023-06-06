import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import {UserServiceInterface} from './user-service.interface.js';
import {Service} from '../../types/service.js';
import UserService from './user.service.js';
import { UserEntity, UserModel } from './user.entity.js';
import { ControllerInterface } from '../../core/controller/controller.interface.js';
import UserController from './user.controller.js';

export function createUserContainer() {
  const userContainer = new Container({ defaultScope: 'Singleton' });

  userContainer.bind<UserServiceInterface>(Service.UserService).to(UserService);
  userContainer.bind<types.ModelType<UserEntity>>(Service.UserModel).toConstantValue(UserModel);
  userContainer.bind<ControllerInterface>(Service.UserController).to(UserController);

  return userContainer;
}
