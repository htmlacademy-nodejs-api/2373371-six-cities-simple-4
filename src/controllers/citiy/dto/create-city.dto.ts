import { Coordinates } from '../../../types/rent-offer.type.js';

export default class CreateCityDto {
  public name!: string;
  public coordinates!: Coordinates;
}
