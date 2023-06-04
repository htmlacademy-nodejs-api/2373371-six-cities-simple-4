import { Container } from 'inversify';
import { Service } from '../../types/service.js';
import { types } from '@typegoose/typegoose';
import { CityEntity, CityModel } from './city.entity.js';
import { CityServiceInterface } from './city-service.interface.js';
import CityService from './city.service.js';

export function createCityContainer() {
  const cityContainer = new Container();

  cityContainer.bind<CityServiceInterface>(Service.CityService)
    .to(CityService)
    .inSingletonScope();

  cityContainer.bind<types.ModelType<CityEntity>>(Service.CityModel)
    .toConstantValue(CityModel);

  return cityContainer;
}
