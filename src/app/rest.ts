import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../services/logger/logger.interface.js';
import { Service } from '../types/service.js';
import { ConfigInterface } from '../services/config/config.types.js';
import { RestSchema } from '../services/config/rest.schema.js';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface.js';
import { getMongoURI } from '../helpers/index.js';

@injectable()
export class Application {
  constructor(
    @inject(Service.Logger) private readonly logger: LoggerInterface,
    @inject(Service.Config) private readonly config: ConfigInterface<RestSchema>,
    @inject(Service.DatabaseClient) private readonly databaseClient: DatabaseClientInterface,
  ) {}

  private _initDb () {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  public async init () {
    this.logger.info('Application initialization…');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');
  }
}
