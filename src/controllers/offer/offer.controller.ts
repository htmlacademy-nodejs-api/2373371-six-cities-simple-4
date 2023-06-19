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
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import * as core from 'express-serve-static-core';
import CommentRdo from '../comment/rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';

type ParamsGetOffer = {
  offerId: string;
}

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Service.Logger) protected readonly logger: LoggerInterface,
    @inject(Service.OfferService) private readonly offerService: OfferServiceInterface,
    @inject(Service.CommentService) private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.getAll });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [
      new PrivateRouteMiddleware(),
      new ValidateObjectIdMiddleware('offerId'),
      new ValidateDtoMiddleware(CreateOfferDto)
    ] });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.findOne,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]});
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]});
    this.addRoute({path: '/:offerId/comments', method: HttpMethod.Get, handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ] });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
  }

  public async getAll(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({ body, user }: GenericReq<CreateOfferDto>, res: Response) {
    const result = await this.offerService.create({ ...body, userId: user.id });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async findOne({ params }: GenericReq<UnknownRecord, UnknownRecord, core.ParamsDictionary | ParamsGetOffer>, res: Response) {
    const offer = await this.offerService.findById(params.offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async delete({ params }: GenericReq<UnknownRecord, UnknownRecord, core.ParamsDictionary | ParamsGetOffer>, res: Response) {
    const result = await this.offerService.deleteById(params.offerId);
    this.noContent(res, fillDTO(OfferRdo, result));
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }


  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }
}
