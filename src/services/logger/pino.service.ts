import { LoggerInterface } from './logger.interface.js';
import { Logger, pino } from 'pino';
import { injectable } from 'inversify';

@injectable()
export class PinoService implements LoggerInterface {
  private readonly logger: Logger;

  constructor() {
    this.logger = pino();
  }

  info(message: string, ...args: unknown[]) {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    this.logger.warn(message, ...args);
  }

  debug(message: string, ...args: unknown[]) {
    this.logger.debug(message, ...args);
  }

  error(message: string, ...args: unknown[]) {
    this.logger.error(message, ...args);
  }
}
