import { ConfigInterface } from './config.types.js';
import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { Service } from '../../types/service.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { configRestSchema, RestSchema } from './rest.schema.js';

@injectable()
export default class ConfigService implements ConfigInterface<RestSchema> {
  private readonly config: RestSchema;

  constructor(@inject(Service.Logger) private readonly logger: LoggerInterface) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.warn });

    this.config = configRestSchema.getProperties();

    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
