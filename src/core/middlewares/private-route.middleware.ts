import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http-error.js';
import { MiddlewareInterface } from '../../types/middleware.interface.js';

export class PrivateRouteMiddleware implements MiddlewareInterface {
  public async execute({ user }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
