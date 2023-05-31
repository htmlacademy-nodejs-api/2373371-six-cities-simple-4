import { Service } from '../../types/service.js';
import { LoggerInterface } from '../../services/logger/logger.interface';
import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { OfferServiceInterface } from './offer-service.interface.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Service.Logger) private readonly logger: LoggerInterface,
    @inject(Service.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }
}
