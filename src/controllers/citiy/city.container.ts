import { Container } from 'inversify';
import { Service } from '../../types/service.js';
import { types } from '@typegoose/typegoose';
import { CityEntity, CityModel } from './city.entity.js';
import { CityServiceInterface } from './city-service.interface.js';
import CityService from './city.service.js';
import { ControllerInterface } from '../../core/controller/controller.interface';
import CityController from './city.controller.js';
import ExceptionFilter from '../../core/exception-filter/exception-filter.js';
import { ExceptionFilterInterface } from '../../core/exception-filter/exception-filter.interface.js';

export function createCityContainer() {
  const cityContainer = new Container({ defaultScope: 'Singleton' });

  cityContainer.bind<CityServiceInterface>(Service.CityService)
    .to(CityService);

  cityContainer.bind<types.ModelType<CityEntity>>(Service.CityModel)
    .toConstantValue(CityModel);

  cityContainer.bind<ControllerInterface>(Service.CityController)
    .to(CityController);

  cityContainer.bind<ExceptionFilterInterface>(Service.ExceptionFilter)
    .to(ExceptionFilter);


  return cityContainer;
}
