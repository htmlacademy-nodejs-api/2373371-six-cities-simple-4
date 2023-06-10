import express, { Express } from 'express';
import { inject, injectable } from 'inversify';

import { LoggerInterface } from '../services/logger/logger.interface.js';
import { Service } from '../types/service.js';
import { ConfigInterface } from '../services/config/config.types.js';
import { RestSchema } from '../services/config/rest.schema.js';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface.js';
import { getMongoURI } from '../helpers/index.js';
import { ControllerInterface } from '../core/controller/controller.interface.js';
import { ExceptionFilterInterface } from '../core/exception-filter/exception-filter.interface';

@injectable()
export class Application {
  private readonly expressApp: Express;

  constructor(
    @inject(Service.Logger) private readonly logger: LoggerInterface,
    @inject(Service.Config) private readonly config: ConfigInterface<RestSchema>,
    @inject(Service.DatabaseClient) private readonly databaseClient: DatabaseClientInterface,
    @inject(Service.CityController) private readonly cityController: ControllerInterface,
    @inject(Service.UserController) private readonly userController: ControllerInterface,
    @inject(Service.OfferController) private readonly offerController: ControllerInterface,
    @inject(Service.CommentController) private readonly commentController: ControllerInterface,
    @inject(Service.ExceptionFilter) private readonly exceptionFilter: ExceptionFilterInterface,
  ) {
    this.expressApp = express();
  }

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

  private _initServer () {
    this.logger.info('Trying to init server...');

    const port = this.config.get('PORT');

    this.expressApp.listen(port);

    this.logger.info(`Server started on http://localhost:${port}`);
  }

  private async _initRoutes() {
    this.logger.info('Controller initialization…');
    this.expressApp.use('/cities', this.cityController.router);
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/offers', this.offerController.router);
    this.expressApp.use('/comments', this.commentController.router);
    this.logger.info('Controller initialization completed');
  }

  private async _initMiddleware() {
    this.logger.info('Global middleware initialization…');
    this.expressApp.use(express.json());
    this.logger.info('Global middleware initialization completed');
  }


  private async _initExceptionFilters() {
    this.logger.info('Exception filters initialization');
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    this.logger.info('Exception filters completed');
  }


  public async init () {
    await this._initDb();
    await this._initMiddleware();
    await this._initRoutes();
    await this._initExceptionFilters();
    await this._initServer();
  }
}
