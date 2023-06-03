import { Container } from 'inversify';
import {types} from '@typegoose/typegoose';

import OfferService from './offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { OfferServiceInterface } from './offer-service.interface';
import { Service } from '../../types/service.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferServiceInterface>(Service.OfferService).to(OfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Service.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
