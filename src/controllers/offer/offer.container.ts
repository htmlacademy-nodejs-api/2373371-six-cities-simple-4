import { Container } from 'inversify';
import {types} from '@typegoose/typegoose';

import OfferService from './offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { Service } from '../../types/service.js';
import { ControllerInterface } from '../../core/controller/controller.interface.js';
import OfferController from './offer.controller.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferServiceInterface>(Service.OfferService).to(OfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Service.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<ControllerInterface>(Service.OfferController).to(OfferController);

  return offerContainer;
}
