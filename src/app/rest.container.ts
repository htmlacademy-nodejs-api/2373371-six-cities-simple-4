import { Container } from 'inversify';
import { Application } from './rest.js';
import { Service } from '../types/service.js';
import { LoggerInterface } from '../services/logger/logger.interface.js';
import { PinoService } from '../services/logger/pino.service.js';
import { ConfigInterface } from '../services/config/config.types.js';
import { RestSchema } from '../services/config/rest.schema.js';
import ConfigService from '../services/config/config.service.js';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface.js';
import MongoClientService from '../core/database-client/mongo-client.service.js';

export function createRestApplicationContainer () {
  const restApplicationContainer = new Container({ defaultScope: 'Singleton' });

  restApplicationContainer.bind<Application>(Service.RestApplication).to(Application);
  restApplicationContainer.bind<LoggerInterface>(Service.Logger).to(PinoService);
  restApplicationContainer.bind<ConfigInterface<RestSchema>>(Service.Config).to(ConfigService);
  restApplicationContainer.bind<DatabaseClientInterface>(Service.DatabaseClient).to(MongoClientService);

  return restApplicationContainer;
}
