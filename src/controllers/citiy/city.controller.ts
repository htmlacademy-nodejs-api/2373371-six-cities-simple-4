import { inject, injectable } from 'inversify';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../services/logger/logger.interface.js';
import { Service } from '../../types/service.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Request, Response } from 'express';
import { CityServiceInterface } from './city-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import CityRdo from './rdo/city.rdo';
import { UnknownRecord } from '../../types/util.js';
import CreateCityDto from './dto/create-city.dto.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class CityController extends Controller {
  constructor(
    @inject(Service.Logger) protected readonly logger: LoggerInterface,
    @inject(Service.CityService) private readonly cityService: CityServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CityController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index(_req: Request, res: Response) {
    const cities = await this.cityService.find();
    const responseCities = fillDTO(CityRdo, cities);
    this.ok(res, responseCities);
  }

  public async create({ body }: Request<UnknownRecord, UnknownRecord, CreateCityDto>, res: Response) {
    const cityExist = await this.cityService.findByName(body.name);

    if (cityExist) {
      const errorMessage = `City ${body.name} already exists`;
      this.send(res, StatusCodes.BAD_REQUEST, { error: errorMessage });
      return this.logger.error(errorMessage);
    }

    const result = await this.cityService.create(body);

    console.log(result);
    this.created(res, fillDTO(CityRdo, result));
  }
}
