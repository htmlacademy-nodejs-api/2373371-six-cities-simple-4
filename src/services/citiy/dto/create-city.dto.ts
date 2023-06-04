import { Coordinates } from '../../../types/rent-offer.type';

export default class CreateCityDto {
  public name!: string;
  public coordinates!: Coordinates;
}
