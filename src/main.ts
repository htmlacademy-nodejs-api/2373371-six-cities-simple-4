import 'reflect-metadata';

import { Container } from 'inversify';
import { Application } from './app/rest.js';
import { Service } from './types/service.js';
import { createRestApplicationContainer } from './app/rest.container.js';
import { createUserContainer } from './services/user/user.container.js';
import { createOfferContainer } from './services/offer/offer.container.js';

(async function bootstrap () {
  const mainContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
  );

  const application = mainContainer.get<Application>(Service.RestApplication);

  await application.init();
})();
