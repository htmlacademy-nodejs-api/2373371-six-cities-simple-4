import 'reflect-metadata';

import { Container } from 'inversify';
import { Application } from './app/rest.js';
import { Service } from './types/service.js';
import { createRestApplicationContainer } from './app/rest.container.js';
import { createUserContainer } from './controllers/user/user.container.js';
import { createOfferContainer } from './controllers/offer/offer.container.js';
import { createCommentContainer } from './controllers/comment/comment.container.js';
import { createCityContainer } from './controllers/citiy/city.container.js';

(async function bootstrap () {
  const mainContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createCityContainer(),
  );

  const application = mainContainer.get<Application>(Service.RestApplication);

  await application.init();
})();
