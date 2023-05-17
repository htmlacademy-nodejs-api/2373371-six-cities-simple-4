import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../services/logger/logger.interface.js';
import { Service } from '../types/service.js';
import { ConfigInterface } from '../services/config/config.types.js';
import { RestSchema } from '../services/config/rest.schema.js';

@injectable()
export class Application {
  constructor(
    @inject(Service.Logger) private readonly logger: LoggerInterface,
    @inject(Service.Config) private readonly config: ConfigInterface<RestSchema>,
  ) {
  }
  init () {
    this.logger.info('init application');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
