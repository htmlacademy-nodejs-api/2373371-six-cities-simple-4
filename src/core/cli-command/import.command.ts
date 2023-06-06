import { CliCommandInterface } from './cli-command.interface.js';
import { Command } from '../../constants/cli.js';
import TsvReader from '../file-reader/tsv-reader.js';
import { createRentOffer } from '../../helpers/rent-offers.js';
import chalk from 'chalk';
import { getErrorMessage, getMongoURI } from '../../helpers/index.js';
import { OfferServiceInterface } from '../../controllers/offer/offer-service.interface.js';
import { DatabaseClientInterface } from '../database-client/database-client.interface.js';
import { LoggerInterface } from '../../services/logger/logger.interface.js';
import ConsoleLoggerService from '../../services/logger/console.service.js';
import OfferService from '../../controllers/offer/offer.service.js';
import { OfferModel } from '../../controllers/offer/offer.entity.js';
import MongoClientService from '../database-client/mongo-client.service.js';
import { RentOffer } from '../../types/rent-offer.type.js';

const DEFAULT_DB_PORT = '27017';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = Command.Import;
  private readonly offerService!: OfferServiceInterface;
  private readonly databaseService!: DatabaseClientInterface;
  private readonly logger: LoggerInterface;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);

    await this.databaseService.connect(uri);

    const rentReader = new TsvReader(filename);

    rentReader.on('line', this.onLine);
    rentReader.on('end', this.onComplete);

    try {
      await rentReader.read();
    } catch (err) {
      console.log(chalk.red(`Can't read the file: ${getErrorMessage(err)}`));
    }
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createRentOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: RentOffer) {
    await this.offerService.create(offer);
  }

  private onComplete(count: number) {
    console.log(chalk.bgGray(`Import finished. Imported: ${count} rows`));

    this.databaseService.disconnect();
  }
}
