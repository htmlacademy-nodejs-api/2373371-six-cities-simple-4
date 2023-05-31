import { Container } from 'inversify';
import {UserServiceInterface} from "./user-service.interface.js";
import {Service} from "../../types/service.js";
import UserService from "./user.service.js";

export function createUserContainer() {
  const userContainer = new Container({ defaultScope: 'Singleton' });

  userContainer.bind<UserServiceInterface>(Service.UserService).to(UserService);

  return userContainer;
}
