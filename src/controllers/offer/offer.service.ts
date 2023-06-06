import { Service } from '../../types/service.js';
import { LoggerInterface } from '../../services/logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { DocumentType, mongoose, types } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { SortType } from '../../types/sort-type.enum.js';
import { DEFAULT_OFFER_COUNT } from './offer.constants.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Service.Logger) private readonly logger: LoggerInterface,
    @inject(Service.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    const populated = await result.populate(['userId', 'cityId']);

    this.logger.info(`New offer created: ${dto.name}`);

    return populated;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId', 'cityId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['userId', 'cityId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({ _id: documentId })) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async find(limit?: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .limit(limit ?? DEFAULT_OFFER_COUNT)
      .populate(['userId', 'cityId'])
      .exec();
  }

  public async findDiscussed(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ commentCount: SortType.Down })
      .limit(count)
      .populate(['userId', 'cityId'])
      .exec();
  }

  public updateRating(offerId: string): Promise<DocumentType<OfferEntity>[] | null> {
    console.log(offerId);

    const mongoOfferId = new mongoose.Types.ObjectId(offerId);

    return this.offerModel
      .aggregate([
        // find only offer with _id of ${offerId}
        { $match: { _id: mongoOfferId } },
        // add comments related to this offer to the offer document
        {
          $lookup: {
            from: 'comments',
            pipeline: [
              // select only comments for ${offerId}
              { $match: { offerId: mongoOfferId } },
              { $project: { rating: true } },
            ],
            as: 'comments',
          }
        },
        // set average rating to the rating field.
        {
          $set: {
            rating: {
              $avg: '$comments.rating',
            }
          }
        },
        { $unset: 'comments' },
      ]).exec();
  }
}
