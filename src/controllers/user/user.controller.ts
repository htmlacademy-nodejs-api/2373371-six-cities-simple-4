import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Controller } from '../../core/controller/controller.abstract.js';
import { Service } from '../../types/service.js';
import { LoggerInterface } from '../../services/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { UserServiceInterface } from './user-service.interface.js';
import { GenericReq } from '../../types/util.js';
import CreateUserDto from './dto/create-user.dto';
import HttpError from '../../core/errors/http-error.js';
import { ConfigInterface } from '../../services/config/config.types.js';
import { RestSchema } from '../../services/config/rest.schema.js';
import { fillDTO } from '../../helpers/index.js';
import UserRdo from './rdo/user.rdo.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import LoginUserDto from './dto/login-user.dto.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Service.Logger) protected readonly logger: LoggerInterface,
    @inject(Service.Config) private readonly configService: ConfigInterface<RestSchema>,
    @inject(Service.UserService) private readonly userService: UserServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CityController…');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.register, middlewares: [new ValidateDtoMiddleware(CreateUserDto)] });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login, middlewares: [new ValidateDtoMiddleware(LoginUserDto)] });
  }

  public async register ({ body }: GenericReq<CreateUserDto>, res: Response): Promise<void> {
    const userExist = await this.userService.findByEmail(body.email);

    if (userExist) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» already exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login ({ body }: GenericReq<CreateUserDto>, _res: Response): Promise<void> {
    const userExist = await this.userService.findByEmail(body.email);

    if (!userExist) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
}
