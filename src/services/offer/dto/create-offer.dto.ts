import { Conveniences, Coordinates, RentType } from '../../../types/rent-offer.type.js';
import { Cities } from '../../../types/city.type.js';

export default class CreateOfferDto {
  name!: string;
  description!: string;
  date!: string;
  city!: Cities;
  preview!: string;
  images!: string[];
  isPremium!: boolean;
  rating!: number;
  type!: RentType;
  roomsNumber!: number;
  guestsNumber!: number;
  price!: number;
  conveniences?: Conveniences[];
  userId!: string;
  commentsNumber?: number;
  coordinates!: Coordinates;
}
