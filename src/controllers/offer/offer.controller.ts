import { inject, injectable } from 'inversify';
import { Controller } from '../../core/controller/controller.abstract.js';
import { Service } from '../../types/service.js';
import { LoggerInterface } from '../../services/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/index.js';
import OfferRdo from './rdo/offer.rdo.js';
import { GenericReq, UnknownRecord } from '../../types/util.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { ParamsDictionary } from 'express-serve-static-core';
import HttpError from '../../core/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export type FindOfferParams = {
  id: string;
} | ParamsDictionary;

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Service.Logger) protected readonly logger: LoggerInterface,
    @inject(Service.OfferService) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.getAll });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:id', method: HttpMethod.Get, handler: this.findOne });
    this.addRoute({ path: '/:id', method: HttpMethod.Delete, handler: this.delete });
  }

  public async getAll(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({ body }: GenericReq<CreateOfferDto>, res: Response) {
    const offers = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, offers));
  }

  public async findOne({ params }: GenericReq<UnknownRecord, UnknownRecord, FindOfferParams>, res: Response) {
    const offer = await this.offerService.findById(params.id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `No offer found with id «${params.id}»`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async delete({ params }: GenericReq<UnknownRecord, UnknownRecord, FindOfferParams>, res: Response) {
    const offerExist = await this.offerService.exists(params.id);

    if (!offerExist) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `No offer found with id «${params.id}»`,
        'OfferController'
      );
    }

    const result = await this.offerService.deleteById(params.id);

    this.noContent(res, fillDTO(OfferRdo, result));
  }
}
