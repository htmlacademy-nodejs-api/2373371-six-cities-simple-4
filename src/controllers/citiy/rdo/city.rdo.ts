import { Expose } from 'class-transformer';
import { Coordinates } from '../../../types/rent-offer.type.js';

export default class CityRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public coordinates!: Coordinates;
}
