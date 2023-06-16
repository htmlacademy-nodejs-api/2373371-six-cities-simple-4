import { Expose, Type } from 'class-transformer';
import { Conveniences, Coordinates, RentType } from '../../../types/rent-offer.type.js';
import UserRdo from '../../user/rdo/user.rdo.js';
import CityRdo from '../../citiy/rdo/city.rdo.js';

export default class OfferRdo {
  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public date!: string;

  @Expose()
  public preview!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: RentType;

  @Expose()
  public roomsNumber!: number;

  @Expose()
  public guestsNumber!: number;

  @Expose()
  public price!: number;

  @Expose()
  public conveniences!: Conveniences[];

  @Expose()
  public commentsNumber!: number;

  @Expose()
  public coordinates!: Coordinates;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user!: string;

  @Expose({ name: 'cityId'})
  @Type(() => CityRdo)
  public city!: string;
}
