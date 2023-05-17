import 'reflect-metadata';

import { Container } from 'inversify';
import { Application } from './app/rest.js';
import { LoggerInterface } from './services/logger/logger.interface.js';
import { PinoService } from './services/logger/pino.service.js';
import { Service } from './types/service.js';
import { ConfigInterface } from './services/config/config.types.js';
import ConfigService from './services/config/config.service.js';
import { RestSchema } from './services/config/rest.schema.js';

(async function bootstrap () {
  const container = new Container({ defaultScope: 'Singleton' });

  container.bind<Application>(Service.RestApplication).to(Application);
  container.bind<LoggerInterface>(Service.Logger).to(PinoService);
  container.bind<ConfigInterface<RestSchema>>(Service.Config).to(ConfigService);

  const application = container.get<Application>(Service.RestApplication);

  application.init();
})();
